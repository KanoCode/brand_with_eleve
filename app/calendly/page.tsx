"use client";
import Footer from "@/components/shared/footer";
import Nav from "@/components/shared/nav";
import Script from "next/script";

import React from "react";

function page() {
  return (
    <div>
      <Nav />

      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/sales-markethub-zm/30min"
      ></div>
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></Script>
      <Footer />
    </div>
  );
}

export default page;
