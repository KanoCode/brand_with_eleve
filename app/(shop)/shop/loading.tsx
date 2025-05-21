import { Separator } from "@/components/ui/separator";
import React from "react";

function loading() {
  return (
    <div className="w-full container mt-9">
      <Separator />

      <div className="grid grid-cols-12 gap-2">
        <div className="lg:col-span-2 hidden lg:block">
          <div
            role="status"
            className="space-y-8 md:space-y-0 md:space-x-8 mt-8 md:flex md:items-center"
          >
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[360px]"></div>

              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full shining-block dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="lg:col-span-10 col-span-full">
          <div className="w-full container">
            <div className="grid grid-cols-1 mt-10 xs:grid-cols-1 mx-auto gap-x-2 gap-y-3 sm:gap-x-7 sm:gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center text-center">
              {Array(8) // Display 8 placeholders (or as many as needed)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="product-card-skeleton">
                    <div
                      role="status"
                      className="max-w-sm p-4 border border-gray-200 rounded shadow shining-block md:p-6 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                        <svg
                          className="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mx-auto mb-4"></div>

                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mx-auto mb-4"></div>

                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loading;
