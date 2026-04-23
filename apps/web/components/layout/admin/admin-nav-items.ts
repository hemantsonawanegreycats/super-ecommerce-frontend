import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  Settings,
  ShieldCheck,
  Megaphone,
  Flag,
  Search,
} from "lucide-react";

export const adminNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Stores",
    href: "/admin/stores",
    icon: Store,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Marketing",
    href: "/admin/analytics",
    icon: Megaphone,
  },
  {
    title: "Permissions",
    href: "/admin/roles",
    icon: ShieldCheck,
  },
  {
    title: "Feature Flags",
    href: "/admin/flags",
    icon: Flag,
  },
  {
    title: "Search Analytics",
    href: "/admin/search-analytics",
    icon: Search,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];
