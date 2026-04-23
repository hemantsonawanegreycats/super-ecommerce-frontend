"use client";

import { Bell, Menu, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavItems } from "./AdminSidebar";

export function AdminTopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-4 flex-1">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="h-16 border-b px-6 flex flex-row items-center justify-between space-y-0">
              <SheetTitle className="text-lg font-bold tracking-tight">Super-E Admin</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex max-w-sm flex-1 items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search stores, orders, users... (⌘K)" 
            className="h-9 w-full bg-muted/50 focus-visible:bg-background border-none shadow-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <User className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
