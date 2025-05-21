// @ts-nocheck
import React from "react";
import { createElement, Fragment, useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useSearchParams } from "next/navigation";
import {
  getAdminGeneralPrices,
  getAdminManualPrices,
} from "@/lib/server/admin";

import { db } from "@/app/firebase/config";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { generalPriceCalculation } from "@/lib/utils";

import {
  usePagination,
  useSearchBox,
  InstantSearch,
  SearchBox,
} from "react-instantsearch";
import {
  autocomplete,
  AutocompleteOptions,
  getAlgoliaResults,
} from "@algolia/autocomplete-js";
import { BaseItem } from "@algolia/autocomplete-core";
import { useRouter } from "next/navigation";
import useGetCalculatedRate from "@/app/service/useGetCalculatedMarketHubRate";
import "@algolia/autocomplete-theme-classic";
import useGetManualPrices from "@/app/service/useGetAdminManualPrices";

import Image from "next/image";
import Link from "next/link";
import { event } from "@/lib/ga";

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

const searchClient = algoliasearch(
  "SM6WMZD4CZ",
  "ca552f39783a34f8a0e7417fd52e49f1"
);

export function Autocomplete<TItem extends Record<string, unknown>>(
  options: Partial<AutocompleteOptions<TItem>> &
    Pick<React.ComponentProps<"div">, "className">
) {
  const { className, ...props } = options;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },

      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} className={className} />;
}

export default function Search() {
  const [calculatedPriceData, setCalculatedPriceData] = useState(null);
  const [manualPrices, setManualPrices] = useState([]);

  useEffect(() => {
    const fetchCalculatedData = async () => {
      let req = await fetch("/api/markethub_rate", {
        cache: "no-store",
      });
      const priceData = await req.json();

      setCalculatedPriceData(priceData);
    };
    const fetchData = async () => {
      let tempArray: any = [];
      const querySnapshot = await getDocs(collection(db, "manualPrices"));
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data());
      });

      setManualPrices(tempArray);
    };

    fetchCalculatedData();
    fetchData();
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  let query = searchParams.get("query") as string;

  return (
    <InstantSearch searchClient={searchClient} indexName="markethub_test">
      <Autocomplete
        initialState={{ query: query || "" }}
        searchClient={searchClient}
        placeholder="Search products"
        openOnFocus={true}
        detachedMediaQuery=""
        className="lg:w-full"
        getSources={({ query }: { query: any }) => [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "markethub_test",
                    query,
                    params: {
                      hitsPerPage: 10,
                      query,
                    },
                  },
                ],
              });
            },
            templates: {
              // header({ items, html }: any) {
              //   if (items.length === 0) {
              //     return null;
              //   }
              //   return html`<span class="aa-sourceHeaderTitle">Products</span>
              //     <div class="aa-SourceHeaderLine" />`;
              // },
              item({ item, components }: any) {
                return (
                  <ProductItem
                    priceData={calculatedPriceData ? calculatedPriceData : null}
                    manualPrices={manualPrices ? manualPrices : null}
                    hit={item}
                    components={components}
                  />
                );
              },
              noResults() {
                return "No products for this query.";
              },
            },
          },
        ]}
        onSubmit={({ state }: any) => {
          window.location.href = `/shop/search?query=${state.query}`;
          event({
            action: "search",
            params: {
              item: state.query,
            },
          });
        }}
      />
    </InstantSearch>
  );
}

export function ProductItem({ hit, components, priceData, manualPrices }: any) {
  let price: any;

  // let price;
  if (manualPrices) {
    let manualPrice = manualPrices.find((product: any) => {
      return product.productId == hit.fullCode;
    });

    if (!manualPrice) {
      price = generalPriceCalculation(
        Number(hit.price),
        priceData.markethubRate,
        priceData.generalPricePercent
      ).toFixed(2);
    } else {
      price = manualPrice.price;
    }
  }
  return (
    <a href={`/shop/product/${hit.fullCode}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--alignTop">
          <Image src={hit.image} height={90} width={80} alt={hit.productName} />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="productName" />
            <span className="pl-4 mr-2"> ${price}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
