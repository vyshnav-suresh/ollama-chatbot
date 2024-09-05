// src/app/page.tsx
"use client";

import { useChat } from "ai/react";
import { useState } from "react";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    handleSubmit: originalHandleSubmit,
  } = useChat();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const res: any = await originalHandleSubmit(event);
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div
          key={message.id}
          className="whitespace-pre-wrap"
          style={{ color: message.role === "user" ? "black" : "green" }}
        >
          {" "}
          <strong>{`${message.role}: `}</strong>
          {message.content}
          <br />
          <br />
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />

        <div>
          {isLoading && (
            <div className="flex justify-center my-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
