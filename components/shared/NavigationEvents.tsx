"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/ga";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    pageview(url)
    // return () => {
      // console.log(url);
    // };
  }, [pathname, searchParams]);

  return "...";
}
