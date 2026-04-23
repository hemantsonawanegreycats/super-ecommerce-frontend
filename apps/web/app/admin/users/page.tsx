"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus, 
  Shield, 
  Mail, 
  Ban,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { id: "1", name: "Alex Rivers", email: "alex@example.com", role: "ADMIN", status: "ACTIVE", joined: "Jan 12, 2026", avatar: "https://i.pravatar.cc/150?u=alex" },
  { id: "2", name: "Elena Smith", email: "elena@example.com", role: "VENDOR", status: "ACTIVE", joined: "Feb 05, 2026", avatar: "https://i.pravatar.cc/150?u=elena" },
  { id: "3", name: "Marcus Thorne", email: "marcus@example.com", role: "USER", status: "BANNED", joined: "Mar 10, 2026", avatar: "https://i.pravatar.cc/150?u=marcus" },
  { id: "4", name: "Sarah Vance", email: "sarah@example.com", role: "VENDOR", status: "PENDING", joined: "Apr 01, 2026", avatar: "https://i.pravatar.cc/150?u=sarah" },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Identity Management</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Global user directory and access control</p>
        </div>
        <div className="flex gap-3">
           <Button className="rounded-full font-black italic uppercase h-12 px-8 shadow-xl">
              <UserPlus className="h-4 w-4 mr-2" /> Invite User
           </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background p-6 rounded-[2.5rem] border border-dashed">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email or ID..." 
              className="pl-12 h-12 rounded-full bg-muted/20 border-none font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="rounded-full font-bold italic uppercase h-10 px-6 border-2">
               <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
         </div>
      </div>

      <div className="rounded-[3rem] border bg-background overflow-hidden shadow-2xl shadow-primary/5">
        <Table>
           <TableHeader className="bg-muted/30">
              <TableRow className="border-none hover:bg-transparent">
                 <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest">User</TableHead>
                 <TableHead className="text-[10px] font-black uppercase tracking-widest">Role</TableHead>
                 <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                 <TableHead className="text-[10px] font-black uppercase tracking-widest">Joined</TableHead>
                 <TableHead className="text-right pr-10"></TableHead>
              </TableRow>
           </TableHeader>
           <TableBody>
              {MOCK_USERS.map((user, idx) => (
                <TableRow key={user.id} className="group border-b border-dashed last:border-none hover:bg-muted/5 transition-colors">
                   <TableCell className="py-6 pl-10">
                      <div className="flex items-center gap-4">
                         <Avatar className="h-12 w-12 border-2 border-white shadow-lg group-hover:scale-105 transition-transform">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                         </Avatar>
                         <div className="flex flex-col">
                            <span className="font-black italic text-sm uppercase tracking-tight">{user.name}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{user.email}</span>
                         </div>
                      </div>
                   </TableCell>
                   <TableCell>
                      <Badge variant="outline" className="font-black italic text-[8px] uppercase tracking-widest px-3 border-2">
                         {user.role}
                      </Badge>
                   </TableCell>
                   <TableCell>
                      <div className="flex items-center gap-2">
                         <div className={cn(
                            "h-2 w-2 rounded-full",
                            user.status === "ACTIVE" ? "bg-emerald-500" : user.status === "PENDING" ? "bg-amber-500" : "bg-destructive"
                         )} />
                         <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{user.status}</span>
                      </div>
                   </TableCell>
                   <TableCell className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {user.joined}
                   </TableCell>
                   <TableCell className="text-right pr-10">
                      <DropdownMenu>
                         <DropdownMenuTrigger 
                           render={
                             <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                                <MoreHorizontal className="h-4 w-4" />
                             </Button>
                           }
                         />
                         <DropdownMenuContent align="end" className="rounded-2xl w-48 p-2">
                            <DropdownMenuItem className="rounded-xl font-bold italic gap-2 py-3 px-4"><Shield className="h-4 w-4" /> Edit Role</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold italic gap-2 py-3 px-4"><Mail className="h-4 w-4" /> Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold italic gap-2 py-3 px-4 text-destructive"><Ban className="h-4 w-4" /> Ban User</DropdownMenuItem>
                         </DropdownMenuContent>
                      </DropdownMenu>
                   </TableCell>
                </TableRow>
              ))}
           </TableBody>
        </Table>
      </div>
    </div>
  );
}
