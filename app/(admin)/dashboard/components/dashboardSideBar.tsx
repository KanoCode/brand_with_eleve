"use client";

import ActionAlert from "@/components/shared/ActionAlert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signOut } from "firebase/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdPerson2 } from "react-icons/md";

import Image from "next/image";
import { logo1 } from "@/asserts/img";
import { auth } from "@/app/firebase/config";

const DashboardSideBar = () => {
  const session = useSession();

  return (
    <div className="py-10 px-2">
      <div className="">
        <Image className="w-32 mx-auto h-auto" src={logo1} alt="store-logo" />
      </div>
      <div className="flex h-10 items-center justify-center space-x-4 my-6">
        <div className="text-white">
          <MdPerson2 className="w-7 h-7" />
        </div>
        <Separator orientation="vertical" />
        <b className="text-lg text-white">{session.data?.user.userName}</b>
      </div>
      <Separator orientation="horizontal" />
      <Button
        size={"lg"}
        variant={"ghost"}
        className="w-full rounded-none text-white"
        asChild
      >
        <Link href="/">Web Site</Link>
      </Button>
      <Separator orientation="horizontal" />
      <Button
        size={"lg"}
        variant={"ghost"}
        className="w-full rounded-none text-white"
        asChild
      >
        <Link href="/dashboard/general-price"> General Prices</Link>
      </Button>
      <Separator orientation="horizontal" />

      <Button
        size={"lg"}
        variant={"ghost"}
        className="w-full rounded-none text-white"
      >
        <Link href="/dashboard/brands_we_worked_with">Partner Brands</Link>
      </Button>
      <Separator orientation="horizontal" />

      <Button
        size={"lg"}
        variant={"ghost"}
        className="w-full rounded-none text-white"
      >
        <Link href="/dashboard/products-prices">Products Prices</Link>
      </Button>
      <Separator orientation="horizontal" />
  
      <Button
        size={"lg"}
        variant={"ghost"}
        className="w-full rounded-none text-white"
        asChild
      >
        <Link href="/dashboard/terms_and_conditions">Terms & Conditions</Link>
      </Button>
      <Separator orientation="horizontal" />

      <ActionAlert
        actionProps={{
          onClick: () => {
            signOut(auth);
            sessionStorage.removeItem("user");
          },
        }}
        actionTitle="Logout"
        alertDescription="This action will log you out as an admin"
        alertTile="Admin Logout"
        triggerButtonProps={{
          size: "lg",
          variant: "ghost",
          className: "w-full rounded-none text-white",
        }}
      />
      <Separator orientation="horizontal" />
    </div>
  );
};

export default DashboardSideBar;
