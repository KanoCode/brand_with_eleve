import Footer from "@/components/shared/footer";
import Nav from "@/components/shared/nav";
import ProductNav from "@/components/shared/productsNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className=" sticky inset-x-0 top-0 z-50">
        {/* <Nav /> */}
        <ProductNav />
      </div>
      {children}
      <Footer />
    </div>
  );
}
