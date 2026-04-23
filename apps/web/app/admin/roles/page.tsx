"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Plus, 
  Lock, 
  Eye, 
  Edit3, 
  Trash2, 
  UserCircle2,
  Key,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { motion } from "framer-motion";

const MOCK_ROLES = [
  { id: "1", name: "Super Admin", description: "Full access to all platform features and infrastructure", users: 3, permissions: ["*"] },
  { id: "2", name: "Vendor Manager", description: "Manage store onboarding, verification, and performance", users: 12, permissions: ["stores.read", "stores.write", "users.view"] },
  { id: "3", name: "Support Tier 1", description: "Handle tickets, basic user inquiries, and order tracking", users: 45, permissions: ["orders.read", "users.read"] },
  { id: "4", name: "Compliance Officer", description: "Audit platform activity and manage legal documentation", users: 5, permissions: ["analytics.read", "compliance.*"] },
];

export default function AdminRolesPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Access Control</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">RBAC infrastructure and permission matrix</p>
        </div>
        <div className="flex gap-3">
           <Button className="rounded-full font-black italic uppercase h-12 px-8 shadow-xl">
              <Plus className="h-4 w-4 mr-2" /> New Role
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[3rem] border bg-background overflow-hidden shadow-2xl shadow-primary/5">
              <Table>
                 <TableHeader className="bg-muted/30">
                    <TableRow className="border-none hover:bg-transparent">
                       <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest">Role Name</TableHead>
                       <TableHead className="text-[10px] font-black uppercase tracking-widest">Users</TableHead>
                       <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                       <TableHead className="text-right pr-10"></TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {MOCK_ROLES.map((role) => (
                      <TableRow key={role.id} className="group border-b border-dashed last:border-none hover:bg-muted/5 transition-colors">
                         <TableCell className="py-6 pl-10">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                  <ShieldCheck className="h-5 w-5" />
                               </div>
                               <div className="flex flex-col">
                                  <span className="font-black italic text-sm uppercase tracking-tight">{role.name}</span>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase truncate max-w-[200px]">{role.description}</span>
                               </div>
                            </div>
                         </TableCell>
                         <TableCell>
                            <div className="flex items-center gap-2">
                               <UserCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                               <span className="text-[10px] font-black uppercase tracking-widest">{role.users}</span>
                            </div>
                         </TableCell>
                         <TableCell>
                            <Badge variant="outline" className="font-black italic text-[8px] uppercase tracking-widest px-3 border-2 text-emerald-600 border-emerald-500/20 bg-emerald-500/5">
                               ACTIVE
                            </Badge>
                         </TableCell>
                         <TableCell className="text-right pr-10">
                            <div className="flex items-center justify-end gap-2">
                               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-primary"><Edit3 className="h-3.5 w-3.5" /></Button>
                               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                         </TableCell>
                      </TableRow>
                    ))}
                 </TableBody>
              </Table>
            </div>
         </div>

         <div className="space-y-8">
            <div className="p-10 rounded-[3rem] bg-zinc-900 text-white space-y-8 shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">Security Audit</h3>
                  <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center">
                     <Lock className="h-5 w-5" />
                  </div>
               </div>
               <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Last System Audit</p>
                     <p className="text-sm font-bold uppercase italic text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> 0 Errors found
                     </p>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="space-y-4">
                     <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight opacity-70">
                        <span>API Access Keys</span>
                        <span>12 Active</span>
                     </div>
                     <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight opacity-70">
                        <span>Root Credentials</span>
                        <span className="text-emerald-400">Secured</span>
                     </div>
                  </div>
                  <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full font-black italic uppercase h-12 shadow-xl shadow-white/5">
                     GENERATE AUDIT
                  </Button>
               </div>
               {/* Decorative Element */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/10 blur-[120px] rounded-full" />
            </div>

            <div className="p-10 rounded-[3rem] border-4 border-dashed border-primary/20 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary">
                     <Key className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-black italic uppercase tracking-tight">Granular Control</h4>
               </div>
               <p className="text-[11px] font-medium text-muted-foreground leading-relaxed uppercase tracking-tight">
                  Permissions can be scoped at the resource level. Use the role editor to refine exact CRUD capabilities for each administrative tier.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
