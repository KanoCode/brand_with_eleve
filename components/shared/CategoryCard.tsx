"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

import Image from "next/image";

interface Props {
  categoryName: string;
  imageUrl: string;
  totalProducts: number;

  link: string;
}

const CategoryCard: FC<Props> = ({
  totalProducts,
  categoryName,
  imageUrl,

  link,
}) => {
  const router = useRouter();

  const [loadingCategoryName, setLoadingCategoryName] = useState("");

  const handleCardClick = (categoryStr: string) => {
    setLoadingCategoryName(categoryStr);
    router.push(`${link}`);
  };

  return (
    <div className="transitionEffect shadow-md">
      <div
        onClick={() => {
          handleCardClick(categoryName);
        }}
        className="border relative transition duration-500 sm:hover:shadow-product group h-full space-x-3"
      >
        <div className="card border CategoryCard">
          <div className="img-card h-40">
            <Image
              src={imageUrl}
              alt="product"
              fill
              className="card-img-top m-0"
            />
          </div>
          <div className="card-body pb-0" style={{ minHeight: 90 + "px" }}>
            <h2 className="card-title text-primary text-uppercase font-bold m-0 font-size-17">
              {categoryName}
            </h2>
          </div>
          <div className="card-footer py-2 border-top-0">
            <p className="m-0 text-neutral-700">
              {totalProducts} product{totalProducts > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loadingCategoryName === categoryName && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <FiLoader className="animate-spin text-black" size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
