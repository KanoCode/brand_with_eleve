import FeaturedProducts from "./components/featuredProducts";
import HelpSection from "./components/helpSection";
import HeroSection from "./components/heroSection";

import {
  getManualPrices,
  getGeneralPercentage,
  getCurrentMarketHubRate,
  fetchFeaturedProducts,
} from "@/lib/server/amrodUtils/productsAndPrices";
import OurPartnersCarousel from "./components/landingPageCarousel";

import FeaturedProductsContainer from "@/components/shared/FeaturedProductsContainer";
import { createCacheStorage, redis } from "@/lib/redis/redis";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import HeroCategories from "./components/heroCategories";

export default async function Home() {
  let products: any;

  const manualPrices = await getManualPrices();
  const generalPercentage = await getGeneralPercentage();
  const marketHubRate = await getCurrentMarketHubRate();

  let cachedFeaturedProducts: any = await redis.json.get(
    "featuredProducts",
    `$`
  );

  const partnerLinksCollectionRef = collection(db, "markethubPartners");

  let partnersArray: any = [];


  return (
    <main>
      <HeroSection />

      <HeroCategories />
      <section>
       
        <div className="mx-auto md:w-3/4 w-full ">
          {/* <OurPartnersCarousel partnerLinks={partnersArray} /> */}
        </div>
      </section>
    </main>
  );
}
