"use client";
import { studentPic } from "@/asserts/img";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { event } from "@/lib/ga";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const db = [
    // { message: "first", name: "eeddi" },
    {
      message: "second",
      name: "hso",
      img: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/UMB-7522/default_1024X1024.jpg",
    },
    {
      message: "second",
      name: "hso",
      img: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/DISPLAY-7014/default_1024X1024.jpg",
    },
    {
      message: "second",
      name: "hso",
      img: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/DISPLAY-2076/DEFAULT_1024X1024.jpg",
    },
  ];
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center ">
      <div className="bg-black absolute z-20 inset-0 bg-opacity-60 h-full"></div>

      <div className="w-[100vw] max-w-full mt-0">
        <Slider {...settings}>
          {db.map((src, index) => (
            <div key={index} className="">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={src.img}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={600}
                  className="w-full h-[80vh] object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="absolute z-30 flex flex-col items-center justify-center w-full h-full">
        <div className="border-4 border-white px-12 py-7 rounded bg-[#ffffffcc] backdrop-blur-sm shadow-md">
          <h1 className="text-[#5c5346] font-extrabold text-3xl md:text-5xl mb-2 text-center tracking-tight">
            Welcome to Eleve
          </h1>
          <div className="text-[#7a6f64] font-medium text-lg md:text-2xl text-center">
            Africa’s largest promotional products supplier
          </div>
        </div>
      </div>
      {/* <div className=" absolute w-auto top-6 left-0 ml-[15px] md:ml-[79px] md:text-lg lg:ml-[159px]">
        <div>
          <h1 className="text-white text-2xl sm:text-[1.2rem] font-semibold pt-7">
            We Guarantee:
          </h1>
          <hr className=" border-white mt-4 mb-2 my-3 border-b-[3px] w-[75%] sm:w-[550px] max-w-[550px]" />

          <ul className="text-gray-100  sm:text-sm font-medium list-disc list-inside mb-4">
            <li className="flex text-xl">
              <span className=" text-[#F66060]">
                <IoMdCheckmarkCircleOutline />
              </span>
              <p className="ml-2 col-span-2">Premium Brand Representation</p>
            </li>

            <li className="flex text-xl">
              <span className=" text-[#F66060]">
                <IoMdCheckmarkCircleOutline />
              </span>
              <p className="ml-2 col-span-2">
                {" "}
                Unlimited Product Variety & Customization
              </p>
            </li>

            <li className="flex text-xl">
              <span className=" text-[#F66060] text-lg">
                <IoMdCheckmarkCircleOutline />
              </span>
              <p className="ml-2 col-span-2">
                {" "}
                Fast Turnaround & Reliable Delivery
              </p>
            </li>

            <li className="flex text-xl">
              <span className=" text-[#F66060]">
                <IoMdCheckmarkCircleOutline />
              </span>
              <p className="ml-2 col-span-2"> Low Costs With Clear ROI</p>
            </li>

            <li className="flex text-xl">
              <span className=" text-[#F66060]">
                <IoMdCheckmarkCircleOutline />
              </span>
              <p className="ml-2 col-span-2">
                {" "}
                High Engagement & Brand Visibility
              </p>
            </li>
          </ul>

          <div className="my-4">
            <Button
              onClick={() => {
                event({
                  action: "user-engagement",
                  params: {
                    item: "goes to shop page",
                  },
                });
              }}
              asChild
              size="lg"
              className="rounded-md bg-primary px-3.5 py-3  text-lg text-white shadow-sm hover:bg-[#DB3A37] transition duration-300"
            >
              <Link href={"/shop/categories/main?start=0"}>Find Your Fit</Link>
            </Button>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
