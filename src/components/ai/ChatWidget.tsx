"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  activeTopic?: string;
}

export function ChatWidget({ activeTopic = "General Tech" }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Hello! I'm your AI Copilot. Ask me anything about **${activeTopic}** or computing in general!`,
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateMockResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    // Custom responses based on topics/keywords
    if (text.includes("react") || text.includes("hook") || text.includes("state")) {
      return "React manages component updates using the Virtual DOM. For state management, standard hooks like `useState` register a state cell inside React's internal fiber nodes, triggering a re-render when the setter is called. Always remember: Hooks must run unconditionally at the top level!";
    }
    if (text.includes("tcp") || text.includes("ip") || text.includes("network") || text.includes("packet")) {
      return "The TCP/IP model operates over four primary layers. TCP creates a connection via a 3-Way Handshake (SYN, SYN-ACK, ACK) and guarantees packets arrive intact and in order using Sequence Numbers and sliding windows, while IP routes them across subnets.";
    }
    if (text.includes("database") || text.includes("sql") || text.includes("index")) {
      return "Databases optimize speed using B-Tree indexes, which allow lookups in O(log N) time rather than scanning the entire table. Relational databases support ACID transactions to ensure database consistency even during sudden crashes.";
    }
    if (text.includes("complexity") || text.includes("big o") || text.includes("sort")) {
      return "Algorithms are analyzed using Big O notation. For example, Quick Sort runs in O(N log N) on average but can degrade to O(N^2) in worst cases. Binary Search requires a sorted array and operates in O(log N) by dividing the search space in half.";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return `Hey there! Glad to assist you on **${activeTopic}**. Ask me any technical question, code debugging problem, or exam prep query!`;
    }
    
    return `That's a great question about **${activeTopic}**! In modern software architecture, we handle that by decoupling configurations, implementing clean interfaces, writing modular handlers, and validating inputs to avoid buffer or state overflow issues. What specific implementation details are you working on?`;
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text: inputVal,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = generateMockResponse(userMsg.text);
      const botMsg: Message = {
        sender: "bot",
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open AI Assistant"
        >
          <Sparkles size={24} className="animate-pulse" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] border border-border bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2">
              <Bot size={20} className="text-blue-100" />
              <div>
                <h4 className="text-sm font-bold leading-tight">Tech World AI Copilot</h4>
                <p className="text-[10px] text-blue-100/80">Context: {activeTopic}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 text-white/90"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/20"
          >
            {messages.map((msg, idx) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={idx}
                  className={`flex ${isBot ? "justify-start" : "justify-end"} items-start space-x-2`}
                >
                  {isBot && (
                    <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      <Bot size={14} />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isBot
                        ? "bg-card border border-border text-foreground"
                        : "bg-blue-600 text-white rounded-tr-none"
                    }`}
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-1" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                  {!isBot && (
                    <div className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start items-start space-x-2">
                <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs flex-shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-card border border-border rounded-2xl px-3.5 py-2.5 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-border bg-card flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask a technical question..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-muted/50 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputVal.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
