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
  marketHubRate,
}: any) => {
  // function getPriceAsyn(arg0: string, fullCode: any) {
  //   throw new Error("Function not implemented.");
  // }

  // const searchParams = useSearchParams();
  // const products = await getProducts();
  // let query = searchParams.get("q");

  // const products = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getProducts,
  // });

  // const { isLoading: isManualPricesLoaded, data: manualPrices } =
  //   useGetManualPrices();

  // const queryObj = JSON.parse(query || "{}");
  // const categoryName = searchParams.get("categoryName");
  // const childCategoryName = searchParams.get("categoryChild");

  // let brandsNames = queryObj ? queryObj["brandsNames"] : null;

  // ===================================================

  // load preset forex rates kwatcha to rand,
  // let { data: localForex, isLoading: isLoadingLocalForex } = useGetForex();

  // let { data: currency, isLoading: isCurrencyLoading } = useGetCurrentRate();
  // const { data: productsArr, isLoading: productsLoading } =
  //   useGetProducts(null);
  // const { data: prices, isLoading: isPricesLoading } = useGetPrices();
  // const { isLoading, data: generalPricePercentage } = useQuery({
  //   queryFn: getAdminGeneralPrices,
  //   queryKey: ["general-price"],
  // });// const searchParams = useSearchParams();
  // const products = await getProducts();
  // let query = searchParams.get("q");

  // const products = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getProducts,
  // });

  // const { isLoading: isManualPricesLoaded, data: manualPrices } =
  //   useGetManualPrices();

  // const queryObj = JSON.parse(query || "{}");
  // const categoryName = searchParams.get("categoryName");
  // const childCategoryName = searchParams.get("categoryChild");

  // let brandsNames = queryObj ? queryObj["brandsNames"] : null;

  // const updateProductFilters = useProductStore(
  //   (state: any) => state.setProductFilters
  // );

  // if (
  //   isLoading ||
  //   productsLoading ||
  //   isPricesLoading ||
  //   isLoadingLocalForex ||
  //   isCurrencyLoading ||
  //   isManualPricesLoaded
  // ) {
  //   return (
  //     <div className="absolute flex flex-col items-center justify-center inset-0 backdrop-blur-0 z-50 bg-white">
  //       <Loader />
  //     </div>
  //   );
  // }

  //  price: pricesMap.get(product.simpleCode)?.price || null
  // let currentRate = Number(currency?.rates["ZMW"].rate);

  // let marketHubRate = getMarketHubRate(localForex.data, currentRate);

  // console.log(productsArray);

  // let filterdProducts = filterItems(productFilters, productsArray);
  // updateTotalProducts(filterdProducts.length);

  //=====================================================


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
          marketHubRate,
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
