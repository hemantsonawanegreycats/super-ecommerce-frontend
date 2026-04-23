"use client";

import { useState, useEffect, useCallback } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export interface Thread {
  id: string;
  title: string;
  subtitle: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  type: "ORDER" | "BOOKING" | "INQUIRY";
  status: "ACTIVE" | "ARCHIVED";
}

export const MOCK_THREADS: Thread[] = [
  {
    id: "th_1",
    title: "Minimalist Desert Pavilion",
    subtitle: "Booking #BK-77291 • Sarah (Host)",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    lastMessage: "Looking forward to hosting you next week!",
    timestamp: "10:42 AM",
    unreadCount: 1,
    type: "BOOKING",
    status: "ACTIVE"
  },
  {
    id: "th_2",
    title: "The Cloud-Weight Blanket",
    subtitle: "Order #ORD-998877 • Support",
    avatar: "https://i.pravatar.cc/150?u=support",
    lastMessage: "Your order has been shipped and is on its way.",
    timestamp: "Yesterday",
    unreadCount: 0,
    type: "ORDER",
    status: "ACTIVE"
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "th_1": [
    { id: "m1", text: "Hello Sarah, I had a question about the check-in time.", sender: "user", timestamp: "10:30 AM", status: "read" },
    { id: "m2", text: "Hi! Standard check-in is at 3 PM, but I can have it ready by 1 PM for you.", sender: "other", timestamp: "10:35 AM", status: "read" },
    { id: "m3", text: "That would be perfect, thank you so much!", sender: "user", timestamp: "10:40 AM", status: "read" },
    { id: "m4", text: "Looking forward to hosting you next week!", sender: "other", timestamp: "10:42 AM", status: "read" },
  ]
};

export function useChat(threadId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (threadId && MOCK_MESSAGES[threadId]) {
      setMessages(MOCK_MESSAGES[threadId]);
    } else {
      setMessages([]);
    }
  }, [threadId]);

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Mock response after 2 seconds
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: Math.random().toString(36).substr(2, 9),
          text: "I'll look into that and get back to you shortly!",
          sender: "other",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "delivered"
        };
        setMessages(prev => [...prev, response]);
      }, 3000);
    }, 1000);
  }, []);

  return { messages, isTyping, sendMessage };
}
