"use client";

import { useState } from "react";
import { 
  Search, 
  Send, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Smile, 
  Paperclip,
  Check,
  CheckCheck,
  ChevronLeft,
  Inbox
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_THREADS, useChat, Thread, Message } from "@/features/messaging/chat-service";

export default function InboxPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(MOCK_THREADS[0].id);
  const selectedThread = MOCK_THREADS.find(t => t.id === selectedThreadId);
  const { messages, isTyping, sendMessage } = useChat(selectedThreadId);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  return (
    <div className="container mx-auto max-w-7xl h-[calc(100vh-120px)] flex flex-col bg-background border rounded-[3rem] overflow-hidden shadow-2xl">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Threads */}
        <div className="w-full md:w-[400px] border-r flex flex-col bg-muted/5">
           <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black italic tracking-tighter uppercase">Messages</h1>
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                 </Button>
              </div>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input 
                   placeholder="Search conversations..." 
                   className="pl-12 h-12 rounded-full bg-background border-none shadow-sm font-medium"
                 />
              </div>
           </div>

           <div className="flex-1 overflow-y-auto scrollbar-hide">
              {MOCK_THREADS.map(thread => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={cn(
                    "w-full p-6 flex gap-4 text-left transition-all relative border-l-4",
                    selectedThreadId === thread.id 
                      ? "bg-background border-primary shadow-sm" 
                      : "border-transparent hover:bg-background/50"
                  )}
                >
                   <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                      <AvatarImage src={thread.avatar} />
                      <AvatarFallback>{thread.title[0]}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase tracking-widest text-primary">{thread.type}</span>
                         <span className="text-[10px] font-bold text-muted-foreground">{thread.timestamp}</span>
                      </div>
                      <h3 className="font-black italic text-sm uppercase truncate tracking-tight">{thread.title}</h3>
                      <p className={cn(
                        "text-xs truncate font-medium",
                        thread.unreadCount > 0 ? "text-foreground font-bold" : "text-muted-foreground"
                      )}>{thread.lastMessage}</p>
                   </div>
                   {thread.unreadCount > 0 && (
                     <div className="absolute top-1/2 -translate-y-1/2 right-6 h-5 w-5 rounded-full bg-primary text-[10px] font-black text-primary-foreground flex items-center justify-center shadow-lg">
                        {thread.unreadCount}
                     </div>
                   )}
                </button>
              ))}
           </div>
        </div>

        {/* Main: Chat View */}
        <div className="flex-1 flex flex-col bg-background">
           <AnimatePresence mode="wait">
              {selectedThread ? (
                <motion.div 
                  key={selectedThread.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                   {/* Chat Header */}
                   <div className="px-8 py-6 border-b flex items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
                      <div className="flex items-center gap-4">
                         <Avatar className="h-12 w-12 border-2 border-primary/10">
                            <AvatarImage src={selectedThread.avatar} />
                            <AvatarFallback>{selectedThread.title[0]}</AvatarFallback>
                         </Avatar>
                         <div>
                            <h2 className="font-black italic text-lg uppercase tracking-tight leading-none">{selectedThread.title}</h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{selectedThread.subtitle}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Phone className="h-4 w-4" /></Button>
                         <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Video className="h-4 w-4" /></Button>
                         <Separator orientation="vertical" className="h-8 mx-2" />
                         <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
                      </div>
                   </div>

                   {/* Messages Area */}
                   <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-[0.03]">
                      {messages.map((msg, i) => (
                        <div key={msg.id} className={cn(
                          "flex flex-col max-w-[80%] space-y-1",
                          msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                        )}>
                           <div className={cn(
                             "px-6 py-4 rounded-[2rem] text-sm font-medium shadow-sm leading-relaxed",
                             msg.sender === "user" 
                               ? "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20" 
                               : "bg-muted/50 text-foreground rounded-tl-none border"
                           )}>
                              {msg.text}
                           </div>
                           <div className="flex items-center gap-2 px-2">
                              <span className="text-[8px] font-black uppercase text-muted-foreground/60">{msg.timestamp}</span>
                              {msg.sender === "user" && (
                                <StatusIcon status={msg.status} />
                              )}
                           </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex flex-col items-start space-y-1 max-w-[80%]">
                           <div className="bg-muted/50 px-6 py-4 rounded-[2rem] rounded-tl-none border flex gap-1">
                              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                           </div>
                        </div>
                      )}
                   </div>

                   {/* Input Area */}
                   <div className="p-8 bg-background">
                      <div className="relative flex items-center gap-4 bg-muted/20 p-2 rounded-[2.5rem] border focus-within:border-primary/30 transition-all">
                         <div className="flex gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary"><Smile className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary"><Paperclip className="h-5 w-5" /></Button>
                         </div>
                         <Input 
                           value={inputText}
                           onChange={(e) => setInputText(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && handleSend()}
                           placeholder="Type a message..." 
                           className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 font-medium italic"
                         />
                         <Button 
                           onClick={handleSend}
                           className="h-12 w-12 rounded-full shadow-xl shadow-primary/20 shrink-0"
                         >
                            <Send className="h-5 w-5" />
                         </Button>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                   <div className="h-24 w-24 rounded-[2rem] bg-muted flex items-center justify-center border-4 border-dashed border-primary/20">
                      <Inbox className="h-10 w-10 text-muted-foreground/40" />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black italic uppercase tracking-tighter">Your Inbox</h2>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest max-w-xs">Select a conversation to start messaging your host or support team.</p>
                   </div>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: Message["status"] }) {
  if (status === "sent") return <Check className="h-3 w-3 text-muted-foreground/40" />;
  if (status === "delivered") return <CheckCheck className="h-3 w-3 text-muted-foreground/60" />;
  return <CheckCheck className="h-3 w-3 text-primary" />;
}
