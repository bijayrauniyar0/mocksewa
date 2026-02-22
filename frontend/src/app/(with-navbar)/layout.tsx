import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/common/Navbar"), {
  ssr: true,
});

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="relative">{children}</main>
    </>
  );
}
