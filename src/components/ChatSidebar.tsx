import React, { useState, useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";
import imgAvatar from "figma:asset/6f425ab7a2319fc065c66c69e67abde5cdbaf375.png";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat, Message } from "../context/ChatContext";
import { LinkPreview } from "./LinkPreview";

interface ChatSidebarProps {
  onClose: () => void;
  initialMessage?: string;
}



export function ChatSidebar({ onClose, initialMessage = "" }: ChatSidebarProps) {
  const { messages, sendMessage, isThinking } = useChat();
  const [inputValue, setInputValue] = useState(initialMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If initialMessage is provided and we haven't sent it yet (this is a bit tricky with context)
  // Actually, we should just pre-fill the input if it's passed.
  // The user might have typed something in the main card.

  // However, if the user *sent* the message from the main card (which is not implemented there yet, just typing),
  // then we might want to auto-send. But the UI flow seems to be: type in main card -> click -> open sidebar with text.
  // So pre-filling is correct.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white box-border flex flex-col h-full overflow-hidden relative rounded-[32px] shrink-0 w-[434px] max-w-full"
    >
      <div className="flex flex-col h-full w-full p-[40px] pb-6 gap-[32px]">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[46px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
              <div className="relative rounded-[99px] shrink-0 size-[49px]">
                <img
                  alt="Avatar"
                  className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[99px] size-full"
                  src={imgAvatar}
                />
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-nowrap">
                <div className="main-card-title">
                  <p className="leading-none text-nowrap whitespace-pre">
                    Tính (Aaron)
                  </p>
                </div>
                <div className="flex flex-col font-['SF_UI_Display:Medium',sans-serif] justify-center relative shrink-0 text-[15px] text-zinc-400 tracking-[0.45px]">
                  <p className="leading-[1.5] text-nowrap whitespace-pre">
                    Design + AI
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity text-[#1D1B20]"
            >
              <CloseIcon className="w-full h-full" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto -mr-4 pr-4 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.role === "user" ? (
                <div className="bg-[rgba(228,228,228,0.41)] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] max-w-[85%]">
                  <p className="chat-paragraph">
                    {msg.content}
                  </p>
                </div>
              ) : (
                <div className="bg-transparent relative shrink-0 w-full max-w-[100%]">
                  <div className="chat-paragraph">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => {
                          const isSubstack = props.href?.includes("substack.com");
                          return (
                            <>
                              <a
                                {...props}
                                className="!text-blue-500 !no-underline hover:!text-blue-600 cursor-pointer relative z-10"
                                style={{ color: '#3b82f6', textDecoration: 'none' }}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                              {isSubstack && props.href && (
                                <div className="my-2">
                                  <LinkPreview url={props.href} onLoad={scrollToBottom} />
                                </div>
                              )}
                            </>
                          );
                        },
                        p: ({ node, ...props }) => (
                          <p {...props} className="mb-2 last:mb-0" />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex w-full justify-start">
              <div className="bg-transparent relative shrink-0 w-full max-w-[100%]">
                <div className="chat-paragraph text-zinc-400 italic">
                  Thinking...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white h-[63px] relative rounded-[999px] shrink-0 w-full">
          <div
            aria-hidden="true"
            className="absolute border-2 border-[rgba(198,198,198,0.3)] border-solid inset-[-2px] pointer-events-none rounded-[1001px]"
          />
          <div className="flex flex-row items-center size-full h-full">
            <div className="box-border content-stretch flex h-full items-center justify-between pl-[24px] pr-[8px] py-[8px] relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything..."
                className="chat-paragraph bg-transparent border-none outline-none w-full mr-2 placeholder-[rgba(0,0,0,0.4)]"
              />
              <button
                onClick={handleSend}
                className="code-behavior-wrapper flex relative shrink-0 size-[31px] cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="blur-[1px] filter relative rounded-[9999px] size-[31px] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden rounded-[9999px] bg-blue-400">
                    <img
                      alt="Send"
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWgwM3dyMjNjc216aHl4MDRyZXJiOXU2YjZhMXdubWUzZmRhM2hkZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ztMaIbzFqMD5z2mzIF/giphy.gif"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
