import Footer from "@/components/shared/footer";
import Nav from "@/components/shared/nav";
import ProductNav from "@/components/shared/productsNav";
import SideBar from "@/components/shared/sidebar";
import { MdMenu } from "react-icons/md";
import { getCategories } from "@/components/shared/productsNav";
import Link from "next/link";
import AllCategoriesDropdown from "@/components/shared/allCategoriesDropdown";
import Dropdown from "@/components/shared/DropDown";
import ProductsNavSuspense from "@/components/shared/CategoriesRenderer";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  return (
    <div className="bg-[#fefaf6] min-h-screen w-full text-[#5c5346]">
      {/* Header/Nav */}
      <header className="border-b border-[#e0d6cd] bg-[#fcf8f3]">
        <Nav categoriesFetched={categories} />

        {/* Navbar */}
        <nav className=" hidden lg:block  top-0 z-30 bg-[#5a493b] text-white font-semibold text-sm shadow-sm">
          <ProductsNavSuspense categoriesFetched={categories} />
        </nav>
      </header>

      <div>{children}</div>

      <footer className="bg-[#fcf8f3] text-[#7a6f64] py-6 text-center text-sm border-t  border-[#e0d6cd]">
        <div className="max-w-full mx-auto px-10 flex sm:flex-row flex-wrap justify-between items-start sm:items-center gap-8">
          <div className="flex flex-col items-start mb-4 md:mb-0">
            <img
              src="https://ext.same-assets.com/3082109262/2665675448.png"
              alt="Amrod company logo"
              className="h-8 mb-2"
            />
            <div className="text-[#919ea7] mb-1">Connect with us:</div>
            <a
              href="https://www.linkedin.com/company/amrod/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1"
              aria-label="Amrod LinkedIn"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                alt="LinkedIn logo"
                className="w-5 h-5 text-[#424b55] grayscale hover:grayscale-0 hover:opacity-80"
              />
            </a>
          </div>

          <div className="flex flex-col text-[15px] gap-2 text-[#424b55] min-w-[130px]">
            <div className="font-bold mb-1">QUICK LINKS</div>
            <Link href="/page/about" aria-label="About Us">
              About Us
            </Link>

            <Link href="/contact-us" aria-label="Contact Us">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col text-[15px] gap-2 text-[#424b55] min-w-[160px]">
            <div className="font-bold mb-1">TERMS & CONDITIONS</div>
            <Link href="/terms-and-conditions" aria-label="Terms & Conditions">
              Terms & Conditions
            </Link>
          </div>
          <div className="flex flex-col text-[15px] gap-2 text-[#424b55] min-w-[110px]">
            <div className="font-bold mb-1">POLICIES</div>
            <Link href="/policies/cookie" aria-label="Cookie Policy">
              Cookie Policy
            </Link>
            <Link href="/policies/privacy" aria-label="Privacy Policy">
              Privacy Policy
            </Link>
            <Link href="/policies/popa" aria-label="POPA Policy">
              POPA Policy
            </Link>
            <Link href="/policies/requests" aria-label="POPIA Requests">
              POPIA Requests
            </Link>
          </div>
        </div>

        <div className="w-full text-center text-xs text-[#c0c6c7] pt-2">
          © {new Date().getFullYear()} Eleve. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
