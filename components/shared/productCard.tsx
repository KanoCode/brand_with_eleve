"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLoader } from "react-icons/fi";

import Image from "next/image";

import { useProductStore } from "@/app/store/productsStore";

interface Props {
  productName: string;
  price: any;
  fullCode: string;
  imageUrl: string;
  manualPrice: any;
  isFeatured: boolean;
  isPromoItem: boolean;
  eventCallBack: Function | null;
}

const ProductCard: FC<Props> = ({
  manualPrice,
  productName,
  fullCode,
  price,
  isFeatured,
  imageUrl,
  isPromoItem,
  eventCallBack,

  // isFiltersActive,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState("");

  const handleCardClick = (productId: string) => {
    setLoading(true); // Show loader on the clicked product card
    setLoadingProductId(productId);
    router.push(`/shop/product/${productId}`); // Navigate to the product details page
  };

  return (
    <div className="transitionEffect shadow-md">
      <div
        onClick={() => {
          eventCallBack
            ? eventCallBack("click", fullCode, "viewing product details page")
            : "";
          handleCardClick(fullCode);
        }}
      >
        <div className="border p-2 relative transition duration-500 sm:hover:shadow-product group h-full space-x-3">
          {isPromoItem ? (
            <div className=" absolute inset-0 h-14 w-36">
              <span className="text-white bg-red-500 p-2">Marked To Clear</span>
            </div>
          ) : (
            ""
          )}
          <Image
            src={imageUrl}
            alt="product"
            height={500}
            width={400}
            className="mb-5"
          />
          <h4 className="text-[18px] truncate text-ellipsis group-hover:text-sitePrimary-400 product-title mb-3">
            {productName}
          </h4>

          <h5 className="text-center text-gray-500">
            {manualPrice > 0 ? (
              <div>
                <div className="">
                  <span className=""> USD {manualPrice}</span>
                  <span className="text-xs">
                    Excl. Taxes and branding options
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col justify-center">
                  <span className=""> USD {+price.toFixed(2)}</span>
                  <span className="text-xs">
                  Excl. Taxes and branding options
                  </span>
                </div>
              </div>
            )}
          </h5>

          {loadingProductId === fullCode && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <FiLoader className="animate-spin text-black" size={32} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
