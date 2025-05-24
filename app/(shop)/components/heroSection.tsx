"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const [isSmScreen, setIsSmScreen] = useState(false);

  // Function to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmScreen(window.innerWidth < 430); // Tailwind's md breakpoint is 768px
    };

    // Add event listener to check the screen size
    window.addEventListener("resize", handleResize);
    // Call the handler right away to set the state on initial load
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmScreen]);
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
    <section
      className={`relative w-full h-[80vh] flex items-center justify-center ${
        isSmScreen ? "mt-20" : ""
      }`}
    >
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
        <div className="border-4 flex flex-col border-white px-12 py-7 rounded bg-[#ffffffcc] backdrop-blur-sm shadow-md">
          <h1 className="text-[#5c5346] font-extrabold text-3xl md:text-5xl mb-2 text-center tracking-tight">
            Welcome to Eleve
          </h1>
          <div className="text-[#7a6f64] font-medium text-lg md:text-2xl text-center">
            Africa’s largest promotional products supplier
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-md bg-[#5c5346] px-3.5 py-3  text-lg text-white shadow-sm hover:bg-[#DB3A37] transition duration-300"
          >
            <Link href={"/shop/categories/main?start=0"}>Find Your Fit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
