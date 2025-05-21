import { FaOpencart } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import { IoMdDoneAll } from "react-icons/io";
import React from "react";

const HelpSection = () => {
  return (
    <section className="px-10 py-20 bg-[#F4ECD6]">
      <div className="my-4 text-center flex flex-col items-center gap-8">
        <h2 className="text-center pb-4 text-2xl border-primary border-b-4">
          Pick, Click, Done!
        </h2>
      </div>

      <div>
        <ol className=" flex sm:justify-center flex-col md:flex-row items-center w-full">
          <li className="flex w-72 items-center flex-col mb-2 text-blue-60">
            <span className="flex items-center flex-col justify-center w-20 h-20 bg-primary text-white rounded-full lg:h-24 lg:w-24 mr-2 shrink-0">
              <h3 className="font-extrabold ">Step 1</h3>
              <FaOpencart />
            </span>

            <span className="flex">Add to your Quote</span>
          </li>
          <li className="flex flex-col w-72 items-center mb-2  ">
            <span className="flex flex-col items-center justify-center w-20 h-20 bg-primary text-white rounded-full lg:h-24 lg:w-24 shrink-0 mr-2">
              <h3 className="font-extrabold">Step 2</h3>
              <TbHandClick />
            </span>
            <span className="flex">Submit your Quote</span>
          </li>
          <li className="flex flex-col items-center w-72">
            <span className="flex flex-col items-center justify-center w-20 h-20 bg-primary text-white rounded-full lg:h-24 lg:w-24 shrink-0 mr-2">
              <h3 className="font-extrabold">Step 3</h3>
              <IoMdDoneAll />
            </span>
            <span className="flex">Easy Peasy</span>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HelpSection;
