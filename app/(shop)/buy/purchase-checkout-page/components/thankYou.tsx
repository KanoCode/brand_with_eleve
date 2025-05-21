import Link from "next/link";
import React from "react";

const ThankYouForShoppingWithUs = () => {
  return (
    <section className="min-h-[430px] relative w-full h-full">
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 bg-white rounded shadow-lg ring ring-indigo-600/50">
          <div className="flex flex-col items-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary w-28 h-28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold">Thank You !</h1>
            <p>
              Thank you for shopping with us! We will get back to you with
              lightning speed, in the mean time feel free
              <Link
                href={{
                  pathname: "/shop",
                }}
              >
                {" "}
                to browse through all our catalogues
              </Link>
            </p>
            <a className="inline-flex items-center px-4 py-2 text-white bg-primary border border-indigo-600 rounded-full hover:bg-[#B52F32] focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium">
                <Link
                  href={{
                    pathname: "/",
                  }}
                >
                  Home
                </Link>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouForShoppingWithUs;
