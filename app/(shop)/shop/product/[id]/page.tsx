import React from "react";
import ProductSlideshow from "../components/ProductSlideshow";
import BreadcrumbComp from "../../components/breadCrumb";
import ProductNotFound from "../components/notFound";
import { getPriceAsyn } from "@/lib/server/amrodUtils/productsAndPrices";
import {  saveStockCache } from "@/lib/saveFile";
import Fuse from "fuse.js";
import { redisClient } from "@/lib/redis/RedisClient2";

const getProductStock = async (productCode: string) => {
  let stock;

  let checkIfCachedStock = await redisClient.exists(`${productCode}-stock`);

  if (Boolean(checkIfCachedStock)) {
    stock = await redisClient.get(`${productCode}-stock`);
  } else {
    try {
      const res = await fetch(
        `${process.env.MARKETHUB_NODE_URL}/stock/${productCode}`
      );

      let respons = await res.json();

      stock = respons;

      await saveStockCache(stock, productCode);
    } catch (error) {
      console.log(error, "could not get stock");
    }

    const options = {
      keys: ["fullCode"],
      threshold: 0.1,
    };

    const fuse = new Fuse(stock.stockData, options);

    const result = fuse.search(productCode);
    return result.map((r) => r.item);
  }
};

async function saveToRedis(product: any, key: string) {
  try {
    await redisClient.setex(key, 3600 * 24 * 6, JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}

async function checkCache(productCode: string) {
  let cachedCategories = await redisClient.get(productCode);

  if (cachedCategories) {
    let cachedProduct = JSON.parse(cachedCategories || "");
    return cachedProduct;
  }
  return null;
}

async function getSpecificProduct(id: string) {
  try {
    const res = await fetch(`${process.env.MARKETHUB_NODE_URL}/products/${id}`);
    let respons = await res.json();
    await saveToRedis(respons, id);

    return respons;
  } catch (error) {
    console.error(error);
  }
}

type Props = {
  params: {
    id: string;
  };
};
const ProductPage = async ({ params: { id } }: Props) => {
  let product: any = [];

  let checkIfCached = await checkCache(id);

  if (checkIfCached) {
    console.log("Checking product cached hit");
    product = checkIfCached;
  } else {
    let tempProduct: any = await getSpecificProduct(id);
    console.log("Checking product cached mis", id);
    product = tempProduct;
  }

  const stock: any = await getProductStock(product?.fullCode);
  let price1: any;

  price1 = product ? await getPriceAsyn(product?.price, product?.fullCode) : 0;

  return (
    <>
      <BreadcrumbComp pages={product?.categories[0]} />
      {product && (
        <ProductSlideshow
          price={price1}
          product={product}
          stock={stock ? stock : []}
        ></ProductSlideshow>
      )}

      {!product && <ProductNotFound />}
    </>
  );
};

export default ProductPage;
