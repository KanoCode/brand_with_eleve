"use client";

import { useState, useEffect } from "react";

import { ProductsNavSuspenseProps } from "@/lib/apiTypes";
import Dropdown from "./DropDown";

function ProductsNavSuspense({ categoriesFetched }: ProductsNavSuspenseProps) {
  if (!categoriesFetched || categoriesFetched.length === 0) return null;

  const [scrolledValue, setScrolledValue] = useState(0);

  const onScroll = () => {
    setScrolledValue(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    console.log("Updated scrolledValue from state:", scrolledValue);
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
          <li className="cursor-pointer hover:underline flex items-center gap-1">
            <Dropdown key={category.categoryCode} category={category} />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductsNavSuspense;
