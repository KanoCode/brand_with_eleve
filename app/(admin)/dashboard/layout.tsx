"use client";
import React, { FC, useEffect } from "react";
import DashboardSideBar from "./components/dashboardSideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userSession = user ? sessionStorage.getItem("user") : 0;
  useEffect(() => {
    if (!user && !userSession) {
      router.push("/auth/login");
    } /* else {
      console.log(user);
    }*/
  }, []);

  return (
    <div className="flex flex-row min-h-screen">
      <div className=" w-[320px]  border-primary bg-gray-800">
        <DashboardSideBar />
      </div>
      <div className="p-10 w-full self-center flex flex-col items-center">
        <div>
          <h1 className="text-center font-bold text-xl mb-8">
            Dashboard Panel
          </h1>{" "}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
