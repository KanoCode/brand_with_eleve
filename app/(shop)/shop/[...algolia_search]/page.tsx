"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

import Head from "next/head";
import { PRODUCTS_INDEX } from "../Constants/Constants";
import { searchClient } from "../shopUtils/searchClient";
import HitComponent from "../components/hitComponent";
import { useSearchParams, usePathname } from "next/navigation";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import { Dialog } from "@headlessui/react";
import { RxCross1 as XMarkIcon } from "react-icons/rx";
import {
  InfiniteHits,
  useSearchBox,
  CurrentRefinements,
  InstantSearch,
} from "react-instantsearch";
import Filters from "./components/filters";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ManualPrice } from "@/lib/apiTypes";

const FILTER_LABEL_MAP: Record<string, string> = {
  available_sizes: "Size",
  brand: "Brand",
  color_hex: "Color",
  "categories.lvl0": "Categories",
  price: "Price",
};

function Page() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [manualPrices, setManualPrices] = useState([] as any[]);
  const [calculatedPriceData, setCalculatedPriceData] = useState({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCalculatedData = async () => {
      let req = await fetch("/api/markethub_rate", {
        cache: "no-store",
      });
      const priceData = await req.json();
      setCalculatedPriceData(priceData);
    };
    const fetchData = async () => {
      const manualPricesRef = collection(db, "manualPrices");
      const manualPrices: ManualPrice[] = [];

      const querySnapshot = await getDocs(manualPricesRef);
      querySnapshot.forEach((doc: any) => {
        manualPrices.push(doc.data());
      });

      setManualPrices(manualPrices);
    };

    fetchCalculatedData();
    fetchData();
  }, []);

  let query = searchParams.get("query")
    ? searchParams.get("query")
    : searchParams.get("keywords");

  return (
    <>
      <Head>
        <title>Markethub Store front</title>
      </Head>

      <InstantSearch
        routing={{ stateMapping: singleIndex(PRODUCTS_INDEX) }}
        searchClient={searchClient}
        indexName={PRODUCTS_INDEX}
        key={(query as string) || ""}
      >
        <Separator />

        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          unmount={false}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 flex z-40">
            <Dialog.Panel className="ml-20 relative w-full h-full bg-white py-4 pb-6 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4">
                <Filters type="disclosure" />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        <VirtualSearchBox />
        <div className="mx-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
              </button>

              <div className="hidden lg:block divide-y divide-gray-200 space-y-10">
                <Filters type="list" />
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <div className="border-t border-gray-200 sm:border-0 flex-grow sm:flex sm:items-center">
                <h3 className="text-sm px-7 py-5 sm:p-0 flex-shrink-0 font-medium text-gray-500">
                  Active filters
                </h3>
                <div
                  aria-hidden="true"
                  className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
                />
                {/* <NoFiltersLabel /> */}
                <CurrentRefinements
                  transformItems={(items) =>
                    items.map((item) => {
                      return {
                        ...item,
                        label: FILTER_LABEL_MAP[item.label] || item.label,
                        refinements: item.refinements.map((refinement) => {
                          // const { label } = extractColorFacet(refinement.label);

                          return { ...refinement };
                        }),
                      };
                    })
                  }
                  classNames={{
                    root: 'relative before:content-[""] before:absolute before:w-6 before:h-full  after:content-[""] after:absolute after:w-6 after:h-full after:top-0 after:right-0',
                    list: "flex space-x-4 px-6 pb-4 sm:py-4 overflow-auto",
                    noRefinementList: "!p-0 sm:mt-0.5 sm:h-16",
                    item: "flex flex-shrink-0 rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900",
                    categoryLabel: "ml-2 font-normal text-gray-700",
                    delete:
                      "ml-1 inline-flex items-center w-4 h-4 flex-shrink-0 rounded-full p-1 hover:!bg-gray-200 text-xs text-gray-400 hover:text-gray-500",
                  }}
                />
              </div>
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <InfiniteHits
                hitComponent={({ hit,sendEvent }) => {
                  let manualPrice = manualPrices.find(
                    (itm: ManualPrice) => itm.productId === hit.fullCode
                  );

                  return (
                    <HitComponent
                      hit={hit}
                      eventCallBack={sendEvent}
                      manualPrice={manualPrice ? manualPrice.price : null}
                      priceData={calculatedPriceData}
                    />
                  );
                }}
                showPrevious={true}
                classNames={{
                  list: "grid grid-cols-2 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4",
                  item: "relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden",
                  loadPrevious:
                    "mb-10 h-10 w-full items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600",
                  disabledLoadPrevious: "hidden",
                  loadMore:
                    "mt-10 h-10 w-full items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600",
                  disabledLoadMore: "hidden",
                }}
              />
            </section>
          </div>
        </div>
      </InstantSearch>
    </>
  );
}

export default Page;

function VirtualSearchBox() {
  useSearchBox();

  return null;
}
