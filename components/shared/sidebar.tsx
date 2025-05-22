"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import Search from "./Search1";

import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useGetCategories from "@/app/service/useGetCategories";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdMenu } from "react-icons/md";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { logo1 } from "@/asserts/img";
// import ProductNav from "@/app/(shop)/shop/components/productsNav";
import Link from "next/link";

function SideBar({ categories }: any) {
  // const { isLoading, data } = useGetCategories();

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <MdMenu className="w-12 h-12 text-[#5a493b] text-2xl" />
      </SheetTrigger>
      <SheetContent className="filters-side-bar overflow-y-auto" side={"left"}>
        <Navbar2 categories={categories} setOpen={setSheetOpen}></Navbar2>
        <SheetFooter>
          <Accordion type="single" collapsible>
            <AccordionItem value="0">
              <AccordionTrigger>
                <div>
                  <button type="button" className="flex gap-2 text-black">
                    <span className="flex items-center gap-2">Quick Links</span>
                  </button>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="flow-root">
                  <Link
                    className="text-white bg-[#5a493b] border-none  group flex items-center px-2 py-2 font-medium rounded-md my-1"
                    title="Home"
                    href="/"
                  >
                    <div>
                      <div className=" mr-3 flex-shrink-0 h-4 w-4">
                        <IoIosHome />
                      </div>
                    </div>
                    Home
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    className="text-white bg-[#5a493b] hover:bg-[#30465C] group flex items-center px-2 py-2 font-medium rounded-md"
                    title="Home"
                    href="/contact"
                  >
                    <div>
                      <div className=" mr-3 flex-shrink-0 h-4 w-4">
                        <IoIosMail />
                      </div>
                    </div>
                    Contact us
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default SideBar;

const Navbar2 = (props: any) => {
  // const { isLoading, data } = useGetCategories();
  // const router = useRouter();
  // const [inputText, setInputText] = useState<string>("");
  // const searchParams = useSearchParams();

  // const keyDownHandler = (e: any) => {
  //   if (e.key === "Enter" || e.keyCode === 13) {
  //     e.preventDefault();
  //     const params = new URLSearchParams(searchParams as any);

  //     if (inputText) {
  //       params.set("keyword", inputText);
  //     } else {
  //       params.delete("keyword");
  //     }
  //     // replace(`${pathName}?${params.toString()}`);
  //     props.setOpen(false);
  //     router.push(`/shop/search?keyword=${inputText}`);
  //   }
  // };

  // const handleSearchInputChange = (e: any) => {
  //   let searchString = e.target.value.trim();
  //   if (searchString.length > 0) {
  //     setInputText(e.target.value);
  //     console.log(e.target.value);
  //   }
  // };

  return (
    <nav>
      {/* <div className="">
        <Image className="w-32 mx-auto h-auto" src={logo1} alt="store-logo" />
      </div> */}

      <Accordion type="single" collapsible>
        {props.categories?.map(
          ({ categoryName, categoryCode, children, categoryPath }: any) => {
            return (
              <AccordionItem value={categoryCode}>
                <AccordionTrigger>
                  <Link
                    onClick={() => props.setOpen(false)}
                    href={{
                      pathname: "/shop/category/" + categoryPath,
                      query: { keywords: categoryName },
                    }}
                  >
                    <button type="button" className="flex gap-2 text-black">
                      <span className="flex items-center gap-2">
                        {categoryName}
                      </span>
                    </button>
                  </Link>
                </AccordionTrigger>

                <AccordionContent>
                  {children.map((childCategory: any) => (
                    <div className="" key={childCategory.categoryCode}>
                      <div className="flow-root">
                        <a
                          onClick={() => {
                            props.setOpen(false);
                          }}
                          className="text-white my-1 border-none bg-[#5a493b]  group flex items-center px-4 py-2 font-medium rounded-md"
                          href={`/shop/category/${childCategory.categoryPath}?keywords=${childCategory.categoryName}`}
                        >
                          {childCategory.categoryName}
                        </a>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          }
        )}
      </Accordion>
    </nav>
  );
};
