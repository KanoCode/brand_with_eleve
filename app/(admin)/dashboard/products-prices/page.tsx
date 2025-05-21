"use client";

import useGetProducts from "@/app/service/useGetProducts";

import useGetCurrentRate from "@/app/service/useGetCurrentRate";
import { Product, columns } from "./components/Column";
import { DataTable } from "./components/DataTable";
import { generalPriceCalculation, getMarketHubRate } from "@/lib/utils";
import { FeaturedProduct } from "@/app/model";

import Loader from "@/components/ui/loader";

import { useEffect, useState } from "react";

import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/config";

async function getGeneralPercentage() {
  let percentage: any;

  const docRef = doc(db, "generalPrices", "generalPrice");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    percentage = docSnap.data().generalPercentage;

    return percentage;
  } else {
    // something else
    console.log(
      "general price can't be null, somethings wrong,check firestore"
    );
  }
}

function getData(
  data: any,
  price: any,
  featured: Array<FeaturedProduct>,
  marketHubRate: number,
  percentProfit: number,
  manualPrices: any[]
) {
  try {
    let newProducts = data.map((product: any) => {
      if (product) {
        let isProductFeatured = featured
          .flat()
          .filter((pdct: any) => pdct.productCode === product.fullCode);

        let isProductManuallyPriced = manualPrices?.filter(
          (item: any) => item.productId === product.fullCode
        );

        let generalPrice: number = generalPriceCalculation(
          product.price,
          marketHubRate,
          percentProfit
        );

        let manualPrice;

        if (isProductManuallyPriced.length > 0) {
          manualPrice = Number(isProductManuallyPriced[0].price);
        }

        return {
          generalPrice: +generalPrice.toFixed(2),
          price: +product.price,
          productName: product.productName,
          productCode: product.fullCode,
          marketHubRate: marketHubRate,
          percentProfit: percentProfit,
          defaultImage: product.images[0].urls[0].url,
          manualPrice: manualPrice ? manualPrice.toFixed(2) : 0,
          featured: isProductFeatured.length > 0 ? "isFeatured" : "notFeatured",
          ...product,
        };
      }

      return product;
    });

    return newProducts.filter((item: any) => item.price);
  } catch (error) {
    console.error(error);
  }
}

export default function ProductsInfoPage() {
  let { isLoading, data } = useGetProducts();
  const [manualPricesArr, setManualPrices] = useState([] as any[]);
  const [generalPrice, setGeneralPrice] = useState(0);

  const [featuredProducts, setFeaturedProducts] = useState([] as any[]);
  const [calculatedPriceData, setCalculatedPriceData] = useState({} as any);

  let { data: currency, isLoading: isCurrencyLoading } = useGetCurrentRate();

  useEffect(() => {
    const fetchCalculatedData = async () => {
      let req = await fetch("/api/markethub_rate", {
        cache: "no-store",
      });
      const priceData = await req.json();

      setCalculatedPriceData(priceData);
    };

    const collectionRef = collection(db, "featuredProducts");
    const getAllData = async () => {
      try {
        let generalPercentage = await getGeneralPercentage();
        setGeneralPrice(generalPercentage);
      } catch (error) {}
    };

    const manualPricesCollectionRef = collection(db, "manualPrices");

    const manualPricesUnSubscribe = onSnapshot(
      manualPricesCollectionRef,
      (snapshot) => {
        const manualPrices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setManualPrices(manualPrices);
      }
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const featuredProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeaturedProducts(featuredProducts);
    });
    fetchCalculatedData();
    getAllData();
    // fetchProducts();
    return () => {
      manualPricesUnSubscribe();
      unsubscribe();
    }; // Cleanup listener on component unmount
  }, []);

  if (isLoading || isCurrencyLoading) {
    return <Loader />;
  }

  const currencyData = currency?.rates;

  let currentRate = Number(currency?.rates.rates["USD"]?.rate);

  let marketHubRate = calculatedPriceData?.markethubRate;

  let percentage = calculatedPriceData?.generalPricePercent;

  let products = getData(
    data,
    null,
    featuredProducts,
    marketHubRate,
    percentage,
    manualPricesArr
  );

  return (
    <div className="container mx-auto">
      <h2 className="font-bold">Market hub pricing table </h2>
      <div className="grid grid-cols-6 w-full border">
        <h3 className="col-span-6 font-semibold">Currency Information</h3>
        <div className="col-span-2 flex flex-col">
          <span>base currency code: {currencyData?.base_currency_code}</span>
          <span>base currency name: {currencyData?.base_currency_name}</span>
        </div>

        <div className="col-span-2 flex flex-col">
          <span>Last updated: {currencyData?.updated_date}</span>
          <span>
            Currency Name: {currencyData?.rates["USD"]?.currency_name}
          </span>
        </div>
        <div className="col-span-2 flex flex-col">
          <span> market rate : {currentRate}</span>
          {/* <span>market hub rate: {marketHubRate}</span> */}
        </div>

        <div className="col-span-2 flex flex-col">
          <span> percentage: {generalPrice ? generalPrice : 0} %</span>
        </div>
      </div>
      <DataTable columns={columns} data={products ? products : []} />
    </div>
  );
}
