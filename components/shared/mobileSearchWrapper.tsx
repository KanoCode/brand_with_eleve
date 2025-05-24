// SearchWrapper.tsx
"use client";
import {
  autocomplete,
  AutocompleteOptions,
  getAlgoliaResults,
} from "@algolia/autocomplete-js";

import { useRouter, useSearchParams } from "next/navigation";

// import { SearchClient } from "algoliasearch";

import { useState } from "react";
import { Autocomplete, ProductItem, searchClient } from "./Search1";
import { Search } from "lucide-react";
import { InstantSearch } from "react-instantsearch";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function SearchWrapper() {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  let query = searchParams.get("query") as string;

  return (
    <div className="relative">
      {
        <InstantSearch searchClient={searchClient} indexName="markethub_test">
          <Autocomplete
            className="absolute z-50 mt-2 w-[300px] bg-white border shadow rounded-md"
            placeholder="Search..."
            openOnFocus
            detachedMediaQuery=""
            onStateChange={({ state }) => {
              if (state.query === "") return;
              // optionally close after selection
            }}
            getSources={({ query }) => [
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
                  item({ item }) {
                    return <div className="px-4 py-2">{item.name}</div>;
                  },
                },
              },
            ]}
          />
        </InstantSearch>
      }
    </div>
  );
}

// export function SearchWrapper() {
//   const [open, setOpen] = useState(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   let query = searchParams.get("query") as string;
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
//           <Search className="w-4 h-4" />
//           <span>Search</span>
//         </button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[600px] p-6 pt-4">
//         <div className="border rounded-md">
//           <Autocomplete
//             initialState={{ query: query || "" }}
//             searchClient={searchClient}
//             placeholder="Search by product name, code or keyword"
//             openOnFocus={true}
//             detachedMediaQuery=""
//             className="w-full !bg-black"
//             getSources={({ query }: { query: any }) => [
//               {
//                 sourceId: "products",
//                 getItems() {
//                   return getAlgoliaResults({
//                     searchClient,
//                     queries: [
//                       {
//                         indexName: "markethub_test",
//                         query,
//                         params: {
//                           hitsPerPage: 10,
//                           query,
//                         },
//                       },
//                     ],
//                   });
//                 },
//                 templates: {
//                   // header({ items, html }: any) {
//                   //   if (items.length === 0) {
//                   //     return null;
//                   //   }
//                   //   return html`<span class="aa-sourceHeaderTitle">Products</span>
//                   //     <div class="aa-SourceHeaderLine" />`;
//                   // },
//                   item({ item, components }: any) {
//                     return (
//                       <ProductItem
//                         priceData={item.price}
//                         // manualPrices={manualPrices ? manualPrices : null}
//                         hit={item}
//                         components={components}
//                       />
//                     );
//                   },
//                   noResults() {
//                     return "No products for this query.";
//                   },
//                 },
//               },
//             ]}
//             onSubmit={({ state }: any) => {
//               window.location.href = `/shop/search?query=${state.query}`;
//             //   event({
//             //     action: "search",
//             //     params: {
//             //       item: state.query,
//             //     },
//             //   });
//             }}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
