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
  // let featuredArray: any = await fetchFeaturedProducts();

  // const querySnapshot = await getDocs(partnerLinksCollectionRef);
  // querySnapshot.forEach((doc) => {
  //   partnersArray.push({ id: doc.id, ...doc.data() });
  // });

  return (
    <main>
      <HeroSection />

      {/* <FeaturedProductsContainer>
        <FeaturedProducts
          manualPrices={manualPrices}
          marketHubRate={marketHubRate}
          generalPercentage={generalPercentage}
          products={featuredArray}
        />
      </FeaturedProductsContainer> */}

      {/* <HelpSection /> */}

      <HeroCategories />
      <section>
        {/* <div className="my-4 text-center flex flex-col items-center gap-4">
          <h1 className="text-center text-2xl">You Are In Safe Hands!</h1>
          <hr className="w-[120px] border-[2px] border-primary" />
        </div> */}
        <div className="mx-auto md:w-3/4 w-full ">
          {/* <OurPartnersCarousel partnerLinks={partnersArray} /> */}
        </div>
      </section>
    </main>
  );
}
