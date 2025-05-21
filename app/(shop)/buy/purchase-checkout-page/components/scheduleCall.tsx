import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function handleRedirect() {
  await fetch("/api/calender_auth", {
    method: "GET",
  });
}

const ScheduleCall = () => {
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
            <h1 className="text-4xl font-bold">
              Do you want to schedule a call to discuss your order{" "}
            </h1>

            <a className="inline-flex items-center px-4 py-2 text-white bg-primary border border-indigo-600 rounded-full hover:bg-[#B52F32] focus:outline-none focus:ring">
              <span className="text-sm font-medium">
                <Button onClick={handleRedirect}> Schedule a Meeting</Button>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCall;
