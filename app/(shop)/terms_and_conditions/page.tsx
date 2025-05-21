"use client";
import React from "react";
import { PDFCanvas } from "./components/PDFCanvas";

function page() {
  return (
    <div className="flex items-center ">
      <PDFCanvas />
    </div>
  );
}

export default page;
