// "use client";

import TopFilters from "./components/topFilters";

import { redisClient } from "@/lib/redis/RedisClient2";

import { keyWordProductFilters, filterBadges } from "@/lib/utils";

import React from "react";
import { Separator } from "@/components/ui/separator";

import ProductsList from "./components/productsList";
import SidebarFilters from "./components/sidebarFilters";
import { MobileFilters } from "./components/mobileFilters";
import FilterBadges from "./components/filterBadges";
import {
  getCurrentMarketRate,
  getGeneralPercentage,
  getManualPrices,
} from "@/lib/server/amrodUtils/productsAndPrices";

import { cookies } from "next/headers";
import { SortFiltersDialog } from "./components/mobileSortFilters";
import { Product } from "@/lib/apiTypes";
interface Price {
  simplecode: string;
  fullCode: string;
  price: number;
}

interface SavedProducts {
  [key: number]: any;
}

async function saveToRedis(products: any[], key: string) {
  await redisClient.setex(key, 3600 * 48, JSON.stringify(products));
}

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    page: string;
    filterBy?: string;
    sortBy?: string;
  };
}) => {
  let cookieStore = cookies();

  let pageNumber = searchParams?.page || "1";
  let products: Product[] | any[];
  let totalProducts = await redisClient.get("totalProducts");

  if (parseInt(pageNumber) == 1) {
    let checkCache = await redisClient.get(
      `all_products:${0}:${parseInt(pageNumber) * 12}`
    );
    if (checkCache) {
      products = JSON.parse(checkCache);
    } else {
      const res = await fetch(
        `${process.env.MARKETHUB_NODE_URL}/products-with-prices/all_products?page=${pageNumber}`
      ).then((res) => res.json());

      await saveToRedis(
        res.data,
        `all_products:${0}:${parseInt(pageNumber) * 12}`
      );
      await redisClient.setex("totalProducts", 3600 * 48, res.totalProducts);
      products = res.data;
    }
  } else {
    let nextEnd = JSON.stringify(parseInt(pageNumber) * 12);
    let prevStart = JSON.stringify((parseInt(pageNumber) - 1) * 12);

    let checkCache = await redisClient.get(
      `all_products:${prevStart}:${nextEnd}`
    );
    if (checkCache) {
      products = JSON.parse(checkCache);
    } else {
      const res = await fetch(
        `${process.env.MARKETHUB_NODE_URL}/products-with-prices/all_products?page=${pageNumber}`
      ).then((res) => res.json());

      products = await res.data;
      products = products.map((result: any) => {
        return {
          price: result.price,
          productName: result.productName,
          categories: result.categories,
          colourImages: result.colourImages,
          fits: result.fit,
          type: result.type,
          gender: result.gender,
          material: result.material,
          brand: result.brand,
          images: result.images,
          fullCode: result.fullCode,
        };
      });
      await saveToRedis(
        res.data,
        `all_products:${Number(prevStart)}:${Number(nextEnd)}`
      );

    }
  }

  // read from cache using the page number end

  let filterBy = searchParams?.filterBy || "";

  let productFilters: any[] = [];
  let filteredProducts: Product[] = [];

  if (filterBy) {
    productFilters = filterBy.split("&");
    filteredProducts = filterBadges(productFilters, products);
  }

  let sortBy = searchParams?.sortBy || "";

  let {
    products: productsArray,
    typesObj,
    fitsObj,
    materialsObj,
    categoriesObj,
    gendersObj,
    brandsObj: trackBrands,
    colors: colorsArray,
  } = keyWordProductFilters(products);

  if (sortBy.length == 0) {
    productsArray?.sort((a: any, b: any) => {
      return Number(a.price) - Number(b.price);
    });
  }
  let manualPrices = await getManualPrices();
  let generalPercentage = await getGeneralPercentage();
  let marketRate = await getCurrentMarketRate();
  return (
    <div className="w-full container">
      <div>
        <TopFilters
          totalProducts={totalProducts ? totalProducts : products.length}
        />
        <Separator />
      </div>
      <div className="md:hidden flex justify-between w-full">
        <MobileFilters
          colorsArray={colorsArray}
          brandsObj={trackBrands}
          typesObj={typesObj}
          fitsObj={fitsObj}
          materialsObj={materialsObj}
          categoriesObj={categoriesObj}
          gendersObj={gendersObj}
        />
        <SortFiltersDialog />
      </div>
      <div className="grid grid-cols-12 gap-2">
        <SidebarFilters
          colorsArray={colorsArray}
          brandsObj={trackBrands}
          typesObj={typesObj}
          fitsObj={fitsObj}
          materialsObj={materialsObj}
          categoriesObj={categoriesObj}
          gendersObj={gendersObj}
        />
        <div className="lg:col-span-10  col-span-full">
          <div>
            <FilterBadges
              filters={productFilters.length > 0 ? productFilters : []}
            />

            <ProductsList
              pageNumber={pageNumber}
              manualPrices={manualPrices}
              generalPercentage={generalPercentage}
              marketRate={marketRate}
              products={
                filteredProducts.length > 0 ? filteredProducts : products
              }
            />
          </div>

          <div className="text-center w-full py-10 flex justify-evenly">
            {Number(pageNumber) > 1 && (
              <a
                className="rounded-md border border-slate-500 p-2 hover:text-white shadow-sm hover:bg-[#DB3A37]"
                role="button"
                href={`?page=${Number(pageNumber) - 1}`}
              >
                Show Previous Page
              </a>
            )}

            <a
              className="rounded-md border p-2  hover:text-white shadow-sm hover:bg-[#DB3A37] "
              role="button"
              href={`?page=${Number(pageNumber) + 1}`}
            >
              Load More Results
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
