import Nav from "@/components/shared/nav";
import ProductNav from "@/components/shared/productsNav";
import { Footer } from "react-day-picker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className=" sticky inset-x-0 top-0 z-50">

      </div>
      {children}
      {/* <Footer /> */}
    </div>
  );
}
