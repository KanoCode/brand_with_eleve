"use client";
import Image from "next/image";
import Link from "next/link";

import React, { Suspense, useEffect } from "react";
import { Product } from "@/lib/apiTypes";
import { generalPriceCalculation } from "@/lib/utils";

export default function FeaturedProducts({
  products,
  marketHubRate,
  generalPercentage,
  manualPrices,
}: any) {
  return (
    <section className="p-10 bg-white">
      <div className="my-4 text-center flex flex-col items-center gap-4">
        <h1 className="text-center text-2xl">Seasonal Specials!</h1>
        <hr className="w-[120px] border-[2px] border-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-x-16 items-center justify-center text-center mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedProductsSuspense
            manualPrices={manualPrices}
            marketHubRate={marketHubRate}
            generalPercentage={generalPercentage}
            products={products}
          />
        </Suspense>
      </div>
    </section>
  );
}

function FeaturedProductsSuspense({
  products,
  manualPrices,
  marketHubRate,
  generalPercentage,
}: any) {
  return products.map((product: Product, i: number) => {
    if (!product.currentFeaturedProductCount) {
      let price = generalPriceCalculation(
        Number(product.price),
        marketHubRate,
        generalPercentage
      );

      let manualPrice = manualPrices.find(
        (p: any) => p.productId == product.productCode
      );

      if (manualPrice) {
        manualPrice = manualPrice.price;
      }

      return (
        <Link
          key={i}
          href={{
            pathname: `shop/product/${product.productCode}`,
          }}
        >
          <div className="border p-2 relative transition duration-500 sm:hover:shadow-product group h-full space-x-3">
            <Image
              src={product.defaultImage}
              alt="product"
              height={500}
              width={400}
              className="mb-5"
            />
            <h4 className="text-[18px] truncate text-ellipsis group-hover:text-sitePrimary-400 product-title mb-3">
              {product.productName}
            </h4>
            <div className="flex flex-col justify-center">
              {manualPrice && (
                <span className="font-bold text-sitePrimary-500">
                  USD {manualPrice}
                </span>
              )}

              {!manualPrice && (
                <span className="font-bold text-sitePrimary-500">
                  USD {price.toFixed(2)}
                </span>
              )}
              <span className="text-xs"> Excl. Taxes and branding options</span>
            </div>
          </div>
        </Link>
      );
    }
  });
}
