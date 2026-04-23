import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  BarChart,
  Settings,
  Paintbrush,
  FolderOpen,
  LayoutTemplate,
  FileText,
  FileSignature,
  Filter,
  FlaskConical,
} from "lucide-react";

export const vendorNavItems = [
  {
    title: "Dashboard",
    href: "/vendor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/vendor/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/vendor/orders",
    icon: ShoppingCart,
  },
  {
    title: "Messages",
    href: "/vendor/messages",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/vendor/analytics",
    icon: BarChart,
  },
  {
    title: "Store Settings",
    href: "/vendor/store/settings",
    icon: Settings,
  },
  {
    title: "Page Builder",
    href: "/vendor/store/builder",
    icon: LayoutTemplate,
  },
  {
    title: "Theme Design",
    href: "/vendor/store/customize",
    icon: Paintbrush,
  },
  {
    title: "Blog",
    href: "/vendor/blog",
    icon: FileSignature,
  },
  {
    title: "Static Pages",
    href: "/vendor/pages",
    icon: FileText,
  },
  {
    title: "File Manager",
    href: "/vendor/files",
    icon: FolderOpen,
  },
  {
    title: "Funnel Analytics",
    href: "/vendor/analytics/funnel",
    icon: Filter,
  },
  {
    title: "A/B Testing",
    href: "/vendor/experiments/new",
    icon: FlaskConical,
  },
];
