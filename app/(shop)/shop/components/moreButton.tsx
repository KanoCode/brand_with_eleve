"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function MoreButton({ start, end, totalChunks }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const router = useRouter();

  const handlePageNext = (start: number, end: number) => {
    const params = new URLSearchParams(searchParams as any);
    console.log(params.get("end"), end, params.get("start"), start);

    if (end || start) {
      params.set("start", `${start}`);
      params.set("end", `${end}`);
    }

    window.location.href = `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <Button
        onClick={() => {
          let nextEnd = parseInt(end);
          let nextStart = parseInt(start);
          handlePageNext(nextStart + 1, nextEnd + 1);
        }}
        size="sm"
        variant={"outline"}
        className="rounded-none"
      >
        Load More Results
      </Button>
    </>
  );
}

export default MoreButton;
