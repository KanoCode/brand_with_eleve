import { headers } from "next/headers";
import { promises as fs } from "fs";

import { generalPriceCalculation, getMarketHubRate } from "@/lib/utils";
import { redisClient } from "@/lib/redis/RedisClient2";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

interface Price {
  simplecode: string;
  fullCode: string;
  price: number;
}

export const fetchFeaturedProducts = async () => {
  let featuredProducts = await fetch(
    `${process.env.MARKETHUB_NODE_URL}/featured_products`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  return featuredProducts.result;
};

export const getLocalForex = async () => {
  const file = await fs.readFile(process.cwd() + "/app/fx.json", "utf8");
  const data = JSON.parse(file);
  return data;
};
export const getMarketForexRate = async () => {
  const res = await fetch(
    `https://api.getgeoapi.com/v2/currency/convert?api_key=9f27beb52c6fa0913c38e18caa426c21534d8704&from=ZAR&to=ZMW&amount=1&format=json`,
    {
      method: "GET",
      next: {
        revalidate: 24 * 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to Get current currency");
  }

  const data = await res.json();

  return data;
};

export async function getManualPrices() {
  try {
    let manualPrices: any[] = [];

    const querySnapshot = await getDocs(collection(db, "manualPrices"));
    querySnapshot.forEach((doc) => {
      manualPrices.push(doc.data());
    });

    return manualPrices;
  } catch (error) {}
}

export async function getGeneralPercentage() {
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

export async function getCurrentMarketRate() {
  let currentMarketRate = await getMarketForexRate();
  let currentRate = Number(currentMarketRate?.rates["ZMW"].rate);

  return currentRate;
}

export async function getPriceAsyn(price: string, productCode: string) {
  const docRef = doc(db, "manualPrices", productCode);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().price;
  } else {
    let percentage: any;

    const docRef = doc(db, "generalPrices", "generalPrice");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      percentage = docSnap.data().generalPercentage;

      let marketHubRate = await getCurrentMarketRate();

      let marketHubPrice = generalPriceCalculation(
        Number(price),
        marketHubRate,
        percentage
      );

      return marketHubPrice.toFixed(2);
    } else {
      // something else
      console.log("general price can't be null, check firestore");
    }
  }
}
