"use client";
import React, { useState } from "react";
import NewForm from "../../components/shared/NewForm";
import { contactUsImage } from "@/asserts/img";
import Image from "next/image";

const ContactUs = () => {
  return (
    <main className="font-sans antialiased">
      <Image
        className="w-full h-[140px] object-cover"
        src={contactUsImage}
        alt=""
      />

      <div className="container mx-auto relative text-[#666]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-6 relative sm:static sm:py-10">
            <div className="mx-auto xl:mx-0 my-5 xl:my-0">
              <h2 className="text-4xl font-bold tracking-tight text-[#414141]">
                Contact Us
              </h2>
              <p className="mt-6 text-base text-gray-600">
                Need more assistance than the FAQ section can give? Our team is
                ready to help! Get in touch by using the contact details below,
                or by filling in the contact form. You’ll be hearing back from
                us in record time.
              </p>

              <div className="mt-10">
                <h2 className="font-semibold text-2xl text-[#414141]">
                  You can contact us on:
                </h2>
                <div className="flex items-center my-5 gap-x-2">
                  <p className="font-bold text-[#232f3e]">Email:</p>
                  <a
                    className="hover:underline hover:text-blue-600"
                    href="mailto:sales.markethub.zm@gmail.com"
                  >
                    sales.markethub.zm@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 my-2">
                  <p className="font-bold text-[#232f3e]">Phone Number:</p>
                  <a
                    href="tel:260979230277"
                    className="cursor-pointer hover:text-siteSecondary-500"
                  >
                    (+260) 979-230-277
                  </a>
                </div>
              </div>

              <p className="mb-10 mt-2">
                For existing orders and dispatch enquiries only
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <p className="font-bold text-[#232f3e]">Office Hours:</p>
                <p>08:00 – 17:00</p>
              </div>
              <p className="mb-10 mt-2">
                Monday to Friday (excluding Public Holidays)
              </p>
            </div>
          </div>

          <div className="col-span-12  xl:col-span-6 text-[#666] p-0 xl:p-10">
            <NewForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
