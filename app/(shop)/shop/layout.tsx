"use client";
import React, { FC } from "react";


interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className=" my-4">
        <div className="mx-6 md:mx-24">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
