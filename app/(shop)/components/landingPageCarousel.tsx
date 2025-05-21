"use client";
// import useGetAllPartners from "@/app/service/useGetAllPartners";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Define the type for the data items.
type Partner = {
  link: string;
  filePath: string;
  id: number;
};

const OurPartnersCarousel = ({ partnerLinks }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          speed: 1000,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          speed: 1000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 1000,
        },
      },
    ],
  };

  return (
    <div className="slider-container ">
      <Slider {...settings} className="">
        {partnerLinks?.map(({ link, id }: Partner) => {
          return (
              <Card key={id}>
                <CardContent className="brand_partner border border-slate-500">
                  <div key={id}>
                    <Image
                      width={147}
                      height={34}
                      className="object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                      src={link}
                      alt=""
                    />
                  </div>
                </CardContent>
              </Card>
            
          );
        })}
      </Slider>
    </div>
  );
};

export default OurPartnersCarousel;
