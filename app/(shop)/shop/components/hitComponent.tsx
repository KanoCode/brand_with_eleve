import React from "react";
import ProductCard from "@/components/shared/productCard";
import { generalPriceCalculation, getPromoItems } from "@/lib/utils";

function HitComponent({ hit, manualPrice, priceData, eventCallBack }: any) {
  let isPromoItem = getPromoItems(hit.categories, true);
  let price: any;

  if (!manualPrice) {
    price = generalPriceCalculation(
      Number(hit.price),
      priceData.markethubRate,
      priceData.generalPricePercent
    ).toFixed(2);
  }
  return (
    <>
      <ProductCard
        manualPrice={manualPrice}
        eventCallBack={eventCallBack}
        isFeatured={false}
        productName={hit.productName}
        isPromoItem={isPromoItem}
        imageUrl={hit.image}
        price={Number(price)}
        fullCode={hit.fullCode}
      />
    </>
  );
}

export default HitComponent;
