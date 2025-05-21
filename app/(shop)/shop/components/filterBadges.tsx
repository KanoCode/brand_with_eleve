"use client";
import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function FilterBadges({ filters }: any) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("filters", filters);

  const handleFilterRemove = (term: string | null) => {
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      let currentFilterByArrayParams = params
        .get("filterBy")
        ?.split("&")
        .filter((itm) => itm != term);

      if (currentFilterByArrayParams) {
        if (currentFilterByArrayParams.length > 0) {
          params.set(
            "filterBy",
            JSON.stringify(currentFilterByArrayParams?.join("&"))
          );
        } else {
          params.delete("filterBy");
        }
      } else {
        params.delete("filterBy");
      }
    } else {
      params.delete("filterBy");
    }

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      {filters.map((filter: string, idx: number, thisArr: string[]) => {
        let [filterType, filterValue] = filter.split("-");
        return (
          <>
            <span className="inline-flex gap-x-0.5 mr-2 bg-primary px-3 py-1 text-md text-white rounded-md font-medium">
              <button
                onClick={() => {
                  handleFilterRemove(filterType + "-" + filterValue);
                }}
                type="button"
                className="group relative flex items-center hover:bg-gray-500/20"
              >
                {filterValue}

                <span className="sr-only">Remove</span>
                <svg
                  viewBox="0 0 14 14"
                  className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75"
                >
                  <path d="M4 4l6 6m0-6l-6 6"></path>
                </svg>
                <span className="absolute -inset-1"></span>
              </button>
            </span>
          </>
        );
      })}

      {filters?.length > 0 ? (
        <span className="inline-flex gap-x-0.5 bg-red-300 px-3 py-1 text-md  rounded-md font-medium">
          <button
            onClick={() => handleFilterRemove(null)}
            type="button"
            className="group relative flex items-center hover:bg-gray-500/20"
          >
            clear filters
            <span className="sr-only">Remove</span>
            <svg
              viewBox="0 0 14 14"
              className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75"
            >
              <path d="M4 4l6 6m0-6l-6 6"></path>
            </svg>
            <span className="absolute -inset-1"></span>
          </button>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default FilterBadges;
