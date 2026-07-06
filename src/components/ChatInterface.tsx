"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Send, Phone, Video, Mic, Image, Paperclip, MoreVertical, CheckCheck } from "lucide-react";

export default function ChatInterface() {
  const { chatMessages, sendChatMessage, activeBooking } = useApp();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const technician = activeBooking?.technician || {
    name: "Aarav Sharma",
    photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop",
    phone: "+91 98765 43210",
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText("");
  };

  const quickReplies = [
    "I am at home.",
    "Please call me when you reach the gate.",
    "The lift is working, please come to the 4th floor.",
    "My intercom is down, please call my number."
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-[500px] w-full bg-card rounded-cards border border-border overflow-hidden font-sans">
      {/* Chat Header */}
      <div className="bg-brand-navy dark:bg-brand-black px-4 py-3 flex items-center justify-between text-white border-b border-border/30">
        <div className="flex items-center gap-3">
          <img
            src={technician.photo}
            alt={technician.name}
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
          <div>
            <span className="font-bold text-sm block">{technician.name}</span>
            <span className="text-[10px] text-brand-sky flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-pulse"></span>
              Online • HardwareFix Expert
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <a href={`tel:${technician.phone}`} className="hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
          </a>
          <button className="hover:text-white transition-colors cursor-not-allowed opacity-55">
            <Video className="w-4.5 h-4.5" />
          </button>
          <button className="hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow p-4 overflow-y-auto bg-brand-navy/5 dark:bg-brand-black/25 flex flex-col gap-3">
        {chatMessages.length === 0 ? (
          <div className="my-auto flex flex-col items-center justify-center text-center p-6">
            <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray">
              Conversation Started
            </span>
            <p className="text-[11px] text-brand-dark dark:text-brand-gray mt-1 max-w-[200px]">
              Chat is encrypted and monitored for safety and insurance.
            </p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isMe = msg.sender === "customer";
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[75%] ${
                  isMe ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`px-3.5 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-brand-blue text-white rounded-tr-none shadow-sm"
                      : "bg-card text-text border border-border/50 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.isVoice ? (
                    <div className="flex items-center gap-2 py-1">
                      <Mic className="w-4 h-4 shrink-0 text-brand-emerald" />
                      <div className="h-1.5 w-24 bg-white/20 dark:bg-brand-navy/20 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 w-2/3 bg-brand-emerald rounded-full"></div>
                      </div>
                      <span className="text-[10px] opacity-80">{msg.duration}</span>
                    </div>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-brand-dark dark:text-brand-gray mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-brand-emerald" />}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Panel */}
      {activeBooking && activeBooking.status !== "completed" && (
        <div className="px-3 py-2 border-t border-border flex gap-2 overflow-x-auto whitespace-nowrap bg-card">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => sendChatMessage(reply)}
              className="px-3 py-1 bg-brand-navy/5 dark:bg-brand-navy/30 hover:bg-brand-blue/15 text-[11px] rounded-full border border-border transition-colors duration-150 font-medium text-brand-dark dark:text-brand-gray"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Message Input Form */}
      <form
        onSubmit={handleSend}
        className="px-4 py-3 border-t border-border bg-card flex items-center gap-3"
      >
        <div className="flex items-center gap-2 text-brand-dark dark:text-brand-gray">
          <button type="button" className="p-1 hover:text-brand-blue transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <button type="button" className="p-1 hover:text-brand-blue transition-colors">
            <Image className="w-4 h-4" />
          </button>
        </div>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            activeBooking?.status === "completed"
              ? "This booking is completed"
              : "Type a message..."
          }
          disabled={activeBooking?.status === "completed"}
          className="flex-grow h-10 px-4 rounded-buttons border border-border dark:bg-brand-navy/20 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
        />

        {inputText.trim() ? (
          <button
            type="submit"
            className="p-2.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white shadow-sm transition-all duration-150"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => sendChatMessage("Simulated voice note", true)}
            disabled={activeBooking?.status === "completed"}
            className="p-2.5 rounded-full bg-brand-navy/5 dark:bg-brand-navy/35 hover:bg-brand-blue/15 text-brand-dark dark:text-brand-gray transition-all duration-150"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
}
