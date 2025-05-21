"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import chroma from "chroma-js";

// type SheetSide = (typeof SHEET_SIDES)[number];

export function MobileFilters({
  colorsArray,
  brandsObj,
  typesObj,
  fitsObj,
  materialsObj,
  categoriesObj,
  gendersObj,
}: any) {
  let [checkSizesArray, checkMaterials, checkCategories, checkGenders] = [
    Object.keys(fitsObj).length > 0,
    Object.keys(materialsObj).length > 0,
    Object.keys(categoriesObj).length > 0,
    Object.keys(gendersObj).length > 0,
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const pathname = usePathname();

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      let oldStr = params.get("filterBy") ? params.get("filterBy") + "&" : "";

      params.set("filterBy", oldStr + term);
    } else {
      params.delete("filterBy");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleCategorySelectRoute = (term: string) => {
    if (term) {
      let actualSearchTerm = term.split(" ").join("");
      window.location.href = `/shop/category/${actualSearchTerm}?keywords=${term
        .split(" ")
        .join("+")}`;
    }
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="right">
        <SheetTrigger asChild>
          <Button className="w-44" variant="outline">
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetDescription>Refine your search.</SheetDescription>
          </SheetHeader>
          <div className="block md:hidden">
            <Accordion type="single" collapsible>
              {Object.keys(brandsObj).length && (
                <AccordionItem value="item-1">
                  <AccordionTrigger>Brand</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-3 py-3 space-y-2 max-h-[240px] h-full overflow-y-auto">
                      {Object.keys(brandsObj).map(
                        (
                          name: string,
                          idx: number,
                          brandNamesOnly: string[]
                        ) => {
                          return (
                            <>
                              <div
                                key={idx}
                                className="flex items-center cursor-pointer"
                              >
                                <input
                                  value={name}
                                  onChange={() => {
                                    let hybridStr = `brand-${name}`;
                                    handleSearch(hybridStr);
                                  }}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-siteSecondary-500 focus:ring-0 focus:ring-transparent"
                                />
                                <label
                                  htmlFor="brand-filter-fwrd-1-brand-119"
                                  className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                                >
                                  {name}{" "}
                                  <span className="text-gray-400">
                                    ({brandsObj[name].count})
                                  </span>
                                </label>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {Object.keys(colorsArray).length && (
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="border-bottom border-color-1 mb-3 accordionHeading rolledUp">
                      <h4 className="section-title section-title__sm mb-0 pb-2 font-size-14">
                        Colours{" "}
                        <span className="group-count text-primary"></span>
                      </h4>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <div className="grid grid-cols-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 py-3">
                        {colorsArray.map((color: string) => {
                          let bgColor: string;

                          try {
                            bgColor = chroma(color.split("/")[0]).hex();
                          } catch (error) {
                            console.error(error);
                          }

                          return (
                            <button
                              onClick={() => {
                                let hybridStr = `colourImages-${
                                  color.split("/")[0]
                                }`;

                                handleSearch(hybridStr);
                              }}
                              style={{
                                height: " 25px",
                                width: "25px",
                                backgroundColor: color.split("/")[0],
                              }}
                              className="rounded-full col-span-1 shadow-sm border"
                            ></button>
                          );
                        })}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="item-3">
                <AccordionTrigger>Type</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-3 py-3 space-y-2 max-h-[240px] h-full overflow-y-auto">
                    {Object.keys(typesObj).map((type: string) => {
                      return (
                        <>
                          <div className="flex items-center cursor-pointer">
                            <input
                              value={type}
                              onChange={() => {
                                let hybridStr = `type-${type}`;
                                handleSearch(hybridStr);
                              }}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-siteSecondary-500 focus:ring-0 focus:ring-transparent"
                            />
                            <label
                              htmlFor="brand-filter-fwrd-1-brand-119"
                              className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                            >
                              {type}{" "}
                              <span className="text-gray-400">
                                ({typesObj[type]})
                              </span>
                            </label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {checkSizesArray && (
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="border-bottom border-color-1 mb-3 accordionHeading rolledUp">
                      <h4 className="section-title section-title__sm mb-0 pb-2 font-size-14">
                        Fits <span className="group-count text-primary"></span>
                      </h4>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.keys(fitsObj)?.map(
                      (name: string, idx: number, brandNamesOnly: string[]) => {
                        return (
                          <>
                            <div
                              key={idx}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                value={name}
                                onChange={() => {
                                  let hybridStr = `brand-${name}`;
                                  handleSearch(hybridStr);
                                }}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-siteSecondary-500 focus:ring-0 focus:ring-transparent"
                              />
                              <label
                                htmlFor="brand-filter-fwrd-1-brand-119"
                                className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                              >
                                {name}{" "}
                                <span className="text-gray-400">
                                  ({fitsObj[name].count})
                                </span>
                              </label>
                            </div>
                          </>
                        );
                      }
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {checkCategories && (
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    <div className="border-bottom border-color-1 mb-3 accordionHeading rolledUp">
                      <h4 className="section-title section-title__sm mb-0 pb-2 font-size-14">
                        Categories{" "}
                        <span className="group-count text-primary"></span>
                      </h4>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      {Object.keys(categoriesObj).map(
                        (
                          name: string,
                          idx: number,
                          brandNamesOnly: string[]
                        ) => {
                          return (
                            <>
                              <div
                                key={idx}
                                className="flex items-center cursor-pointer"
                              >
                                <input
                                  value={name}
                                  onChange={() => {
                                    handleCategorySelectRoute(name);
                                  }}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-siteSecondary-500 focus:ring-0 focus:ring-transparent"
                                />
                                <label
                                  htmlFor="brand-filter-fwrd-1-brand-119"
                                  className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                                >
                                  {name}{" "}
                                  <span className="text-gray-400">
                                    ({categoriesObj[name].count})
                                  </span>
                                </label>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {checkGenders && (
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    <div className="border-bottom border-color-1 mb-3 accordionHeading rolledUp">
                      <h4 className="section-title section-title__sm mb-0 pb-2 font-size-14">
                        Genders{" "}
                        <span className="group-count text-primary"></span>
                      </h4>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.keys(gendersObj).map(
                      (name: string, idx: number, brandNamesOnly: string[]) => {
                        return (
                          <>
                            <div
                              key={idx}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                value={name}
                                onChange={() => {
                                  let hybridStr = `brand-${name}`;

                                  handleSearch(hybridStr);
                                }}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-siteSecondary-500 focus:ring-0 focus:ring-transparent"
                              />
                              <label
                                htmlFor="brand-filter-fwrd-1-brand-119"
                                className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                              >
                                {name}{" "}
                                <span className="text-gray-400">
                                  ({gendersObj[name].count})
                                </span>
                              </label>
                            </div>
                          </>
                        );
                      }
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {checkMaterials && (
                <AccordionItem value="item-9">
                  <AccordionTrigger>
                    <div className="border-bottom border-color-1 mb-3 accordionHeading rolledUp">
                      <h4 className="section-title section-title__sm mb-0 pb-2 font-size-14">
                        Materials{" "}
                        <span className="group-count text-primary"></span>
                      </h4>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.keys(materialsObj).map(
                      (name: string, idx: number, brandNamesOnly: string[]) => {
                        return (
                          <>
                            <div
                              key={idx}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                value={name}
                                onChange={() => {
                                  let hybridStr = `brand-${name}`;
                                  handleSearch(hybridStr);
                                }}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-siteSecondary-500 focus:ring-0 focus:ring-transparent"
                              />
                              <label
                                htmlFor="brand-filter-fwrd-1-brand-119"
                                className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                              >
                                {name}{" "}
                                <span className="text-gray-400">
                                  ({materialsObj[name].count})
                                </span>
                              </label>
                            </div>
                          </>
                        );
                      }
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
