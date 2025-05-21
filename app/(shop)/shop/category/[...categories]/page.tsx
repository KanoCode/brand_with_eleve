import React from "react";
import ProductCard from "@/components/shared/productCard";
import TopFilters from "../../components/topFilters";
import { Category, Product } from "@/lib/apiTypes";

import SidebarFilters from "../../components/sidebarFilters";
import { Separator } from "@/components/ui/separator";
import MoreButton from "../../components/moreButton";

import {
  generalPriceCalculation,
  keyWordProductFilters,
  filterBadges,
  getPromoItems,
} from "@/lib/utils";
import FilterBadges from "../../components/filterBadges";

import PreviousButton from "../../components/previousButton";

import {
  getCurrentMarketHubRate,
  getGeneralPercentage,
  getManualPrices,
} from "@/lib/server/amrodUtils/productsAndPrices";
import { redisClient } from "@/lib/redis/RedisClient2";
import { SortFiltersDialog } from "../../components/mobileSortFilters";
import { MobileFilters } from "../../components/mobileFilters";

async function saveToRedis(products: Product[], key: string, page: number) {
  let pipeline = await redisClient.pipeline();

  if (page == 1) {
    await pipeline.setex(key, 3600 * 24, JSON.stringify(products.slice(0, 12)));
  } else {
    await pipeline.setex(
      key + "_" + page,
      3600 * 24 * 3,
      JSON.stringify(products.slice((page - 1) * 12, page * 12))
    );
  }

  pipeline.setex(key + ":total", 3600 * 24, products.length);
  pipeline.setex(
    key + ":total_chunks",
    3600 * 24,
    Math.floor(products.length / 12)
  );
  await pipeline.exec();
}

async function getCachedProducts(key: string) {
  let cachedCategories = await redisClient.get(key);

  if (cachedCategories) {
    return JSON.parse(cachedCategories);
  }
  return null;
}

async function Page({
  searchParams,
}: // params,
{
  searchParams: { [key: string]: string };
  params: { [key: string]: string[] };
}) {
  let sortBy = searchParams?.sortBy || "";
  let filterBy = searchParams?.filterBy || "";
  let start = searchParams?.start || "0";
  let end = searchParams?.end || "1";

  let products: any;
  let totalCategories: number = 0;

  let searchTerms = searchParams.keywords;
  let total_chunks = await redisClient.get(searchTerms + ":total_chunks");
  let totalChunks = Number(total_chunks);

  let modifiedSearchTerms =
    Number(start) >= 1 ? searchTerms + "_" + start : searchTerms;
  let redisProducts = await getCachedProducts(modifiedSearchTerms);
  if (redisProducts) {
    if (Number(start) == 0) {
      console.log("categories products cache hit");
      products = redisProducts;
    } else {
      if (Number(start) < totalChunks) {
        console.log("categories products cache hit");
        products = await getCachedProducts(searchTerms + "_" + start);
      } else {
        products = [];
      }
    }
  } else {
    console.log("categories cache mis");
    const res = await fetch(
      `${process.env.MARKETHUB_NODE_URL}/products/category/${searchTerms}`
    ).then((res) => res.json());
    products = res;
    await saveToRedis(products, searchTerms, Number(end));
    products = res.slice((Number(end) - 1) * 12, Number(end) * 12);
  }

  let totalRedis = await redisClient.get(searchTerms + ":total");
  if (totalRedis) {
    totalCategories = JSON.parse(totalRedis as string);
  } else {
    totalCategories = products.length;
  }

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

  // filter badges

  let productFilters: string[] = [];

  if (filterBy) {
    productFilters = filterBy.split("&");
    productsArray = filterBadges(productFilters, products);
  }

  // price range
  productsArray?.sort((a: any, b: any) => {
    if (sortBy == "price_max_to_min") {
      return Number(b.price) - Number(a.price);
    } else if (sortBy == "price_min_to_max") {
      return Number(a.price) - Number(b.price);
    } else if (sortBy == "a_to_z") {
      if (a.productName < b.productName) {
        return -1;
      }
    } else {
      if (a.productName > b.productName) {
        return 1;
      }
    }
  });

  // default sortBy = "price_min_to_max"
  if (sortBy.length == 0) {
    productsArray?.sort((a: any, b: any) => {
      return Number(a.price) - Number(b.price);
    });
  }

  // cached constant values
  let manualPrices = await getManualPrices();
  let generalPercentage = await getGeneralPercentage();
  let marketHubRate = await getCurrentMarketHubRate();

  return (
    <div className="w-full container">
      <div>
        <div>
          <TopFilters totalProducts={totalCategories} />
          <Separator />
        </div>
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
        <div className="lg:col-span-10 col-span-full">
          <div>
            <FilterBadges filters={productFilters} />
            <div className="grid grid-cols-1 mt-10 mx-auto  gap-x-2 gap-y-3 sm:gap-x-7 sm:gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center text-center">
              {productsArray?.length ? (
                productsArray.map(
                  async (product: Product, i: number, arr: any) => {
                    if (product.images === null) {
                      return null; // Return null to skip rendering this item
                    }

                    let manualPrice = manualPrices?.find((manualPrc: any) => {
                      return manualPrc.productId == product.fullCode;
                    });
                    let isPromoItem = getPromoItems(product.categories);

                    let price = generalPriceCalculation(
                      Number(product.price),
                      marketHubRate,
                      generalPercentage
                    );

                    return (
                      <div key={i}>
                        <ProductCard
                          eventCallBack={null}
                          manualPrice={manualPrice?.price}
                          isFeatured={false}
                          productName={product.productName}
                          imageUrl={
                            product.images ? product.images[0].urls[0].url : ""
                          }
                          isPromoItem={isPromoItem}
                          price={Number(price)}
                          fullCode={product.fullCode}
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <div className="bg-green-500 col-span-full">
                  <div className="bg-[#232F3E] p-6 mb-3">
                    <h1 className="text-white" style={{ fontSize: "40px" }}>
                      This is somewhat embarrassing...
                    </h1>
                    <h3
                      className="text-white hidden sm:block"
                      style={{ fontSize: " 28px" }}
                    >
                      I see our super brainy search engine couldn't find what
                      you were looking for, do you mind if I give it a try?
                    </h3>
                    <h3
                      className="text-white sm:hidden"
                      style={{ fontSize: "28px" }}
                    >
                      I see our super brainy search engine couldn't find what
                    </h3>
                    <h3
                      className="text-white sm:hidden"
                      style={{ fontSize: "28px" }}
                    >
                      you were looking for, please try another query?
                    </h3>
                  </div>{" "}
                </div>
              )}
            </div>
          </div>

          <div className="text-center w-full py-10">
            {Number(start) > 0 && <PreviousButton start={start} end={end} />}

            {Number(start) >= 0 && productsArray.length >= 12 && (
              <MoreButton start={start} end={end} totalChunks={totalChunks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
