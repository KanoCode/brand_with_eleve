"use client";

import { useState, useEffect } from "react";

import { ProductsNavSuspenseProps } from "@/lib/apiTypes";
import Dropdown from "./DropDown";
import SearchBar from "./search";
import CartSideBar from "./cartSideBar";

function ProductsNavSuspense({ categoriesFetched }: ProductsNavSuspenseProps) {
  if (!categoriesFetched || categoriesFetched.length === 0) return null;

  const [scrolledValue, setScrolledValue] = useState(0);
  const [activeSearchBar, setSearchActive] = useState(false);
  const onScroll = () => {
    setScrolledValue(window.scrollY);
  };

  function handleActiveSearchBar() {
    // setSearchActive(true)
    if (scrolledValue > 123 && activeSearchBar) {
      setSearchActive(false);
    } else if (scrolledValue > 123 && !activeSearchBar) {
      setSearchActive(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrolledValue > 123 && activeSearchBar) {
      // setSearchActive(true);
      console.log("still active ");
    }
  }, [scrolledValue]);

  return (
    <ul
      className={`flex justify-center space-x-8 px-2 py-4 bg-[#5a493b] ${
        scrolledValue > 123
          ? "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out"
          : ""
      }`}
    >
      {categoriesFetched.map((category) => {
        return (
          <li
            key={category.categoryCode}
            className="cursor-pointer hover:underline flex items-center gap-1"
          >
            <Dropdown key={category.categoryCode} category={category} />
          </li>
        );
      })}
      {scrolledValue > 123 ? (
        <li>
          <button
            onClick={() => handleActiveSearchBar()}
            className="bg-[#5a493b]  hover:bg-[#cbbcab] text-white"
          >
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
        </li>
      ) : (
        ""
      )}

      {scrolledValue > 123 && activeSearchBar && (
        <li className="absolute transition-all duration-300 ease-in-out bg-white py-10 flex justify-end top-14 -left-10 right-0">
          <SearchBar /> <CartSideBar />
        </li>
      )}
    </ul>
  );
}

export default ProductsNavSuspense;
