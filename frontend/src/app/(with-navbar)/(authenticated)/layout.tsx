import ProtectedRoute from "@/components/common/ProtectedRoute";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <main className="relative">{children}</main>
    </ProtectedRoute>
  );
}
