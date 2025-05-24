"use client";
import { logo1 } from "@/asserts/img";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductsNavSuspenseProps } from "@/lib/apiTypes";

import Search from "./Search1";

import AllCategoriesDropdown from "./allCategoriesDropdown";

import SideBar from "./sidebar";
import CartSideBar from "./cartSideBar";
import { useState, useEffect } from "react";
import { useProductStore } from "@/app/store/productsStore";

const Nav = ({ categoriesFetched }: ProductsNavSuspenseProps) => {
  const [isSmScreen, setIsSmScreen] = useState(false);

  // Function to detect screen size

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setIsSmScreen(true); // Tailwind's md breakpoint is 768px
      }
    };

    // Add event listener to check the screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmScreen]);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setIsSmScreen(true); // Tailwind's md breakpoint is 768px
    }

    return () => {
      // window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`flex border items-center mx-auto justify-between px-10 py-10 bg-[#fefaf6] ${
          isSmScreen ? "fixed top-0 z-40 w-full" : ""
        }`}
      >
        <div className="lg:hidden border">
          <SideBar categories={categoriesFetched}></SideBar>
        </div>
        <img
          src="https://ext.same-assets.com/3082109262/2665675448.png"
          alt="amrod logo"
          className="h-6 px-6"
        />
        {/* Search */}
        <div className="hidden md:grid grid-cols-12 items-center w-full max-w-4xl mx-4 rounded-full border border-[#d6c9b6] overflow-hidden bg-white shadow-sm">
          {/* <input
            type="text"
            placeholder="Search by product name, code or keyword"
            className="  flex-grow px-4 py-2 text-sm focus:outline-none text-black"
          /> */}
          <div className="col-span-9">
            <Search />
          </div>
          <div className="lg:flex hidden col-span-2 items-center px-4 border-l border-[#5a493b] text-[#22201e] cursor-pointer hover:text-[#5c5346]">
            <AllCategoriesDropdown />
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <button className="bg-[#5a493b] col-span-1  hover:bg-[#cbbcab] text-white p-2 px-4">
            <svg
              className="w-4 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="block">
          <CartSideBar />
        </div>

        <div
          className={`block  bg-[#5a493b] my-4 ${
            isSmScreen
              ? "absolute top-28 border border-[#5a493b] inset-x-0 z-50"
              : ""
          } md:hidden`}
        >
          <Search />
        </div>
      </div>
    </>
  );
};

export default Nav;
