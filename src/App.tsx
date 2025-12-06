import React, { useState } from "react";
import { MainCard } from "./components/MainCard";
import { ChatSidebar } from "./components/ChatSidebar";
import { AnimatePresence, motion } from "motion/react";
import { useChat } from "./context/ChatContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChat();

  const handleFloatingSubmit = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
    setIsSidebarOpen(true);
  };

  return (
    <div className="bg-[#eef0eb] w-full h-screen overflow-hidden flex p-[16px] gap-[16px]">
      <MainCard
        isSidebarOpen={isSidebarOpen}
        onOpenSidebar={handleFloatingSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <AnimatePresence>
        {isSidebarOpen && (
          <ChatSidebar
            onClose={() => setIsSidebarOpen(false)}
            initialMessage={inputValue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
