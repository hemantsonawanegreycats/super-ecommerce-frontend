export const revalidate = 120; // Revalidate every 120 seconds

export default function StayDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
