"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SortFiltersDialog() {
  // State to keep track of the selected option

  const [sheetOpen, setSheetOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set("sortBy", term);
    } else {
      params.delete("sortBy");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  // Handle the change event for radio buttons
  const handleOptionChange = (event: any) => {
    handleSearch(event.target.value);
  };
  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sort By</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>Sort your data.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
          <h3>Select an option:</h3>
          <label>
            <input
              type="radio"
              value="price_min_to_max"
              onChange={(e) => {
                handleOptionChange(e);
                setSheetOpen(false);
              }}
            />
            Price: Low to High
          </label>
          <label>
            <input
              type="radio"
              value="price_max_to_min"
              onChange={(e) => {
                handleOptionChange(e);
                setSheetOpen(false);
              }}
            />
            Price: High to Low
          </label>
          <label>
            <input
              type="radio"
              value="a_to_z"
              onChange={(e) => {
                handleOptionChange(e);
                setSheetOpen(false);
              }}
            />
            Alphabetical A - Z
          </label>

          <label>
            <input
              type="radio"
              value="z_to_a"
              onChange={(e) => {
                handleOptionChange(e);
                setSheetOpen(false);
              }}
            />
            Alphabetical Z - A
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
