"use client";
import { logo1 } from "@/asserts/img";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Search from "./Search1";
import { event } from "@/lib/ga";

import CartSideBar from "./cartSideBar";
import { useEffect, useState } from "react";
import AllCategoriesDropdown from "./allCategoriesDropdown";
import { MdMenu } from "react-icons/md";
// import { useProductStore } from "@/app/store/productsStore";

function handleClick() {
  // @ts-ignore
  window.Calendly.initPopupWidget({
    url: "https://calendly.com/sales-markethub-zm/30-minute-consultation",
  });

  return false;
}

const Nav = () => {
  // dialog code starts

  // const [isMdScreen, setIsMdScreen] = useState(false);

  // // Function to detect screen size
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMdScreen(window.innerWidth >= 768); // Tailwind's md breakpoint is 768px
  //   };

  //   // Add event listener to check the screen size
  //   window.addEventListener("resize", handleResize);
  //   // Call the handler right away to set the state on initial load
  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <>
      <div className="flex border items-center mx-auto justify-between px-10 py-10">
        <div className="lg:hidden border">
          <MdMenu className="w-12 h-12 text-[#5a493b] text-2xl" />
        </div>
        <img
          src="https://ext.same-assets.com/3082109262/2665675448.png"
          alt="amrod logo"
          className="h-6 px-6"
        />
        {/* Search */}
        <div className="hidden md:flex items-center w-full max-w-4xl mx-4 rounded-full border border-[#d6c9b6] overflow-hidden bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search by product name, code or keyword"
            className="  flex-grow px-4 py-2 text-sm focus:outline-none text-black"
          />
          <div className="lg:flex hidden items-center px-4 border-l border-[#5a493b] text-[#22201e] cursor-pointer hover:text-[#5c5346]">
            {/* <span className="mr-1 text-sm">All Categories</span> */}

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
          <button className="bg-[#5a493b]  hover:bg-[#cbbcab] text-white p-2 px-4">
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

        <button className="bg-[#5a493b] block md:hidden hover:bg-[#cbbcab] text-white p-2 px-4">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Nav;
