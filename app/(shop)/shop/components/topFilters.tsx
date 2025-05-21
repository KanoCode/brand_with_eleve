"use client";

import React from "react";

import { ChevronRight, Home } from "lucide-react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";

const TopFilters = ({ totalProducts }: any) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const pathArray = pathname.split("/").map((part) => {
    if (part.includes("+")) {
      return part.split("+").join(" ");
    }
    return part;
  });

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("sortBy", term);
    } else {
      params.delete("sortBy");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <div className="border-b pb-2 flex items-center justify-between text-[#666]  mx-auto">
        <div className="flex flex-col space-y-2">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-1">
              <li>
                <div className="flex items-center">
                  <Link
                    role="button"
                    href="/"
                    className="text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    <Home />
                  </Link>
                </div>
              </li>

              {pathArray?.map((path, i) => {
                if (path == "shop") {
                  return (
                    <li key={i}>
                      <div className="flex items-center">
                        <ChevronRight />
                        <Link
                          href="/shop/categories/main?start=0"
                          role="button"
                          className="ml-2 text-sm font-medium  capitalize text-gray-600 hover:text-gray-800"
                        >
                          All Products
                        </Link>
                      </div>
                    </li>
                  );
                }

                if (path != "" && path != "category") {
                  return (
                    <li key={i}>
                      <div className="flex items-center">
                        <ChevronRight />
                        <Link
                          href={{
                            pathname: "/shop/category/" + path,
                            query: {
                              keywords: capitalizeFirstLetter(
                                decodeURIComponent(path)
                              ),
                            },
                          }}
                          role="button"
                          className="ml-2 text-sm font-medium capitalize text-gray-600 hover:text-gray-800"
                        >
                          {decodeURIComponent(path)}
                        </Link>
                      </div>
                    </li>
                  );
                }
              })}
            </ol>
          </nav>

          <span>{totalProducts} results</span>

          <div className="flex flex-wrap gap-3"></div>
        </div>

        <div className="hidden sm:flex items-center gap-3 ">
          <label
            htmlFor="sortBy"
            className="hidden sm:block text-sm font-medium leading-6 text-gray-900 whitespace-nowrap"
          >
            Sort By:
          </label>
          <select
            id="sortBy"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            name="sortBy"
            className="block w-full border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="price_min_to_max">Price: Low to High</option>
            <option value="price_max_to_min">Price: High to Low</option>

            <option value="a_to_z">Alphabetical A - Z</option>
            <option value="z_to_a">Alphabetical Z - A</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TopFilters;
