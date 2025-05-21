import React from "react";
import { logo1 } from "@/asserts/img";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Subscribe from "./Subscribe";

const footerData = {
  footerLinks: [
    {
      title: "Quick Links",
      links: [
        { href: "/", name: "Home" },
        { href: "/terms_and_conditions", name: "Terms and Conditions" },
        { href: "/contact", name: "Leave Us a Message" },
      ],
    },

    {
      title: "Social Media",
      links: [
        { href: "https://www.facebook.com/markethub.zm", name: "facebook" },
        {
          href: "https://www.linkedin.com/in/markethub-outdoor-advertising-limited-743623255/",
          name: "linkedIn",
        },
        { href: "https://www.instagram.com/markethub.zm/", name: "Instagram" },
      ],
    },
  ],

  usefulInfo: [
    {
      title: "Useful Info",
      links: [
        { name: "phone number", value: "(+1) 864 580 6678" },
        { name: "email", value: "lio@brandwithmarkethub.com" },
        {
          name: "physical address",
          value: "200 Gladstone Way 29650, Greer, South Carolina",
        },
      ],
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#F4ECD6] text-black relative text-center ">
      <div className="sm:px-0 grid lg:grid-cols-3 gap-5 lg:gap-0">
        <div className="space-y-4 col-span-1 flex flex-col items-center ">
          <Image className="w-[60px] h-[40px] place-self-start ml-10" src={logo1} alt="company logo" />
          <Subscribe />
        </div>

        <div className="grid grid-cols-2 col-span-2 gap-3 md:grid-cols-3">
          <div className="space-y-5">
            <h4 className="text-2xl font-medium">
              {footerData.footerLinks[0]?.title}
            </h4>
            {footerData.footerLinks[0]?.links.map((link) => {
              return (
                <div key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </div>
              );
            })}
          </div>
          <div>
            <div className="grid gap-5">
              {footerData.footerLinks.slice(1, 2).map((item) => {
                return (
                  <div
                    key={item.title}
                    className="space-y-5 flex flex-col items-center"
                  >
                    <h4 className="text-2xl font-medium">{item.title}</h4>
                    {item.links.map((link) => {
                      if (link.name == "facebook") {
                        return (
                          <div key={link.name}>
                            <a
                              href={link.href}
                              target="_blank"
                              id="facebook_link"
                              className="flex items-center justify-center w-[45px] h-[45px] rounded-full border border-gray-400 hover:border-[#F9FAFB] 
            text-primary 
                              hover:text-white hover:bg-red-500"
                            >
                              <div>
                                <FaFacebook />
                              </div>
                            </a>
                          </div>
                        );
                      } else if (link.name == "linkedIn") {
                        return (
                          <div key={link.name}>
                            <a
                              href={link.href}
                              target="_blank"
                              id="linkedin_link"
                              className="flex items-center
                               text-primary 
                              justify-center w-[45px] h-[45px] rounded-full border border-gray-400 border-spacing-3 hover:border-[#F9FAFB] hover:text-white hover:bg-red-500"
                            >
                              <div>
                                <FaLinkedinIn />
                              </div>
                            </a>
                          </div>
                        );
                      } else {
                        return (
                          <div key={link.name}>
                            <a
                              href={link.href}
                              target="_blank"
                              id="instagram_link"
                              className="flex items-center 
                               text-primary 
                              justify-center w-[45px] h-[45px] rounded-full border border-gray-400 border-spacing-3 hover:border-[#F9FAFB] hover:text-white hover:bg-red-500"
                            >
                              <div>
                                <RiInstagramFill />
                              </div>
                            </a>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-2xl font-medium">
              {footerData.usefulInfo[0]?.title}
            </h4>
            {footerData.usefulInfo[0]?.links.map((link) => (
              <div key={link.name}>
                <span>{link.value}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 absolute bottom-0">
          Copyright © 2025 Markethub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
