import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

const ELEVENLABS_API_KEY = "sk_8a64797e6198a73b106b8105058a056273fc5e3c46375eb0";
const AGENT_ID = "agent_2601kb4swbxefkrs5px70k48m7w0";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "text" | "markdown";
}

interface ChatContextType {
    messages: Message[];
    sendMessage: (content: string) => void;
    isConnected: boolean;
    isThinking: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    const responseBuffer = useRef("");
    const isDelaying = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pendingMessage = useRef<string | null>(null);
    const isConnecting = useRef(false);
    const socketRef = useRef<WebSocket | null>(null);

    const addAgentMessage = (text: string) => {
        setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.role === "assistant") {
                return [
                    ...prev.slice(0, -1),
                    { ...lastMsg, content: lastMsg.content + text }
                ];
            }
            return [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: text,
                },
            ];
        });
    };

    const sendToSocket = (text: string, ws: WebSocket) => {
        const payload = {
            text: text,
            type: "user_message"
        };
        console.log("Sending payload:", payload);
        ws.send(JSON.stringify(payload));

        setIsThinking(true);
        isDelaying.current = true;
        responseBuffer.current = "";

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            isDelaying.current = false;
            if (responseBuffer.current) {
                setIsThinking(false);
                addAgentMessage(responseBuffer.current);
                responseBuffer.current = "";
            }
        }, 2000);
    };

    const connect = async () => {
        if (isConnecting.current) return;
        isConnecting.current = true;

        try {
            if (socketRef.current) {
                socketRef.current.close();
            }

            const response = await fetch(
                `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
                {
                    headers: {
                        "xi-api-key": ELEVENLABS_API_KEY,
                    },
                }
            );

            if (!response.ok) {
                console.error("Failed to get signed URL");
                isConnecting.current = false;
                return;
            }

            const data = await response.json();
            const ws = new WebSocket(data.signed_url);

            ws.onopen = () => {
                console.log("Connected to ElevenLabs");
                setIsConnected(true);
                isConnecting.current = false;

                if (pendingMessage.current) {
                    sendToSocket(pendingMessage.current, ws);
                    pendingMessage.current = null;
                }
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log("Received message:", message);

                if (message.type === "agent_response") {
                    const text = message.agent_response_event?.agent_response;
                    if (text) {
                        if (isDelaying.current) {
                            responseBuffer.current += text;
                        } else {
                            setIsThinking(false);
                            addAgentMessage(text);
                        }
                    }
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
                isConnecting.current = false;
            };

            ws.onclose = () => {
                console.log("Disconnected from ElevenLabs");
                setIsConnected(false);
                isConnecting.current = false;
            };

            setSocket(ws);
            socketRef.current = ws;
        } catch (error) {
            console.error("Error connecting to ElevenLabs:", error);
            isConnecting.current = false;
        }
    };

    useEffect(() => {
        connect();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const sendMessage = (content: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content,
        };

        setMessages((prev) => [...prev, userMsg]);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            sendToSocket(content, socketRef.current);
        } else {
            console.log("Socket not connected, attempting to reconnect...");
            pendingMessage.current = content;
            connect();
        }
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage, isConnected, isThinking }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
