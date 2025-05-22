"use client";

import AllCategoriesDropdown from "./allCategoriesDropdown";

function SearchBar() {
  return (
    <div className="hidden md:flex items-center w-full max-w-4xl mx-4 rounded-full border border-[#d6c9b6] overflow-hidden bg-white shadow-sm">
      <input
        type="text"
        placeholder="Search by product name, code or keyword"
        className="  flex-grow px-4 py-2 text-sm focus:outline-none text-black"
      />
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
  );
}


export default SearchBar