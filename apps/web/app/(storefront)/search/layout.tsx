export const revalidate = 300; // Revalidate every 300 seconds

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
