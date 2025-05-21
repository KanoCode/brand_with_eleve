"use client";
import React from "react";
import { Audio, Hourglass } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <Hourglass
        visible={true}
        height="50"
        width="50"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#4a8c49", "#DB1F26"]}
      />
      <h1 className="text-muted-foreground text-sm">Please wait...</h1>
    </div>
  );
};

export default Loader;
