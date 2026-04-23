import { VendorShell } from "@/components/layout/vendor/VendorShell";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VendorShell>{children}</VendorShell>;
}
