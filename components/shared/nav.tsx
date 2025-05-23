"use client";
import { logo1 } from "@/asserts/img";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductsNavSuspenseProps } from "@/lib/apiTypes";

import Search from "./Search1";

import AllCategoriesDropdown from "./allCategoriesDropdown";
import { MdMenu } from "react-icons/md";
import SideBar from "./sidebar";
import CartSideBar from "./cartSideBar";

const Nav = ({ categoriesFetched }: ProductsNavSuspenseProps) => {
  return (
    <>
      <div className="flex border items-center mx-auto justify-between px-10 py-10">
        <div className="lg:hidden border">
          <SideBar categories={categoriesFetched}></SideBar>
        </div>
        <img
          src="https://ext.same-assets.com/3082109262/2665675448.png"
          alt="amrod logo"
          className="h-6 px-6"
        />
        {/* Search */}
        <div className="hidden md:flex items-center w-full max-w-4xl mx-4 rounded-full border border-[#d6c9b6] overflow-hidden bg-white shadow-sm">
          {/* <input
            type="text"
            placeholder="Search by product name, code or keyword"
            className="  flex-grow px-4 py-2 text-sm focus:outline-none text-black"
          /> */}

          <Search />
          <div className="lg:flex hidden items-center px-4 border-l border-[#5a493b] text-[#22201e] cursor-pointer hover:text-[#5c5346]">
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
        <div className="hidden md:block">
          <CartSideBar />
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
