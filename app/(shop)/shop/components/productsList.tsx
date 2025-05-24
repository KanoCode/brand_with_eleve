import {
  generalPriceCalculation,
  getPromoItems,
  handleFilterButtonClick,
} from "@/lib/utils";

import { getPriceAsyn } from "@/lib/server/amrodUtils/productsAndPrices";

import ProductCard from "@/components/shared/productCard";
import React from "react";

// import Loader from "@/components/ui/loader";
// import { useQuery } from "react-query";
// import { getPriceAsyn } from "@/lib/server/amrodUtils/productsAndPrices";

interface Price {
  simplecode: string;
  fullCode: string;
  price: number;
}

const ProductsList = ({
  products,
  pageNumber,
  manualPrices,
  generalPercentage,
  marketRate,
}: any) => {


  return (
    <div className="grid  w-full grid-cols-1 mt-10  xs:grid-cols-1 mx-auto  gap-x-2 gap-y-3 sm:gap-x-7 sm:gap-y-14 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-center justify-center text-center">
      {products.map((product: any, i: number) => {
        if (product.images === null) {
          return null; // Return null to skip rendering this item
        }
        let manualPrice = manualPrices.find((manualPrc: any) => {
          return manualPrc.productId == product.fullCode;
        });

        let isPromoItem = getPromoItems(product.categories);
        let price = generalPriceCalculation(
          Number(product.price),
          marketRate,
          generalPercentage
        );

        return (
          <div key={i}>
            <ProductCard
              eventCallBack={null}
              isPromoItem={isPromoItem}
              manualPrice={manualPrice?.price}
              isFeatured={false}
              productName={product.productName}
              imageUrl={product.images ? product.images[0].urls[0].url : ""}
              price={Number(price)}
              fullCode={product.fullCode}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
