import React, { FC, useEffect } from "react";

import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

const BreadcrumbComp = ({ pages }: any) => {
  let excludePathsArr: string[] = ["main", "categories"];
  if (pages) {
    let productsBreadCrumb = pages.path.split("/");

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild href="/">
              <Home />
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop" className="font-medium">
              All Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          {productsBreadCrumb?.map(
            (category: string, i: number, arr: string[]) => {
              if (category.length == 0) return null;
              return (
                <div key={i}>
                  <div className="flex items-center">
                    <BreadcrumbSeparator>
                      <ChevronRight />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {!excludePathsArr.includes(category) && (
                        <Link
                          className="ml-2 text-sm font-medium capitalize text-gray-600 hover:text-gray-800"
                          href={{
                            pathname: "/shop/category/" + category,
                            query: {
                              keywords: capitalizeFirstLetter(category),
                            },
                          }}
                        >
                          {capitalizeFirstLetter(category)}
                        </Link>
                      )}
                    </BreadcrumbItem>
                  </div>
                </div>
              );
            }
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  return null;
};

export default BreadcrumbComp;
