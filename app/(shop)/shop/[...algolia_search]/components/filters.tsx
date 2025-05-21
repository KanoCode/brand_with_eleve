import React from "react";
import { Filter, FilterProps } from "./filter";
import { RefinementList, RangeInput } from "react-instantsearch";

export default function Filters({ type }: Pick<FilterProps, "type">) {
  return (
    <>
      <Filter header="Brands" type={type} className="pt-10">
        <RefinementList
          attribute="brand"
          limit={8}
          classNames={{
            list: "pt-6 space-y-4 lg:space-y-3",
            item: "flex items-center",
            label: "cursor-pointer",
            selectedItem: "font-semibold",
            checkbox:
              "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer",
            labelText: "ml-3 text-sm text-gray-600",
            count:
              "ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700",
          }}
        />
      </Filter>

      <Filter header="Categories" type={type}>
        <RefinementList
          attribute="categories"
          classNames={{
            list: "pt-6 space-y-4 lg:space-y-3",
            item: "flex items-center",
            label: "cursor-pointer",
            selectedItem: "font-semibold",
            checkbox:
              "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer",
            labelText: "ml-3 text-sm text-gray-600",
            count:
              "ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700",
          }}
        />
      </Filter>

      {/* <Filter header="Color" type={type} className="pt-10">
          <ColorRefinementList
            attribute="color_hex"
            limit={8}
            classNames={{
              list: 'pt-6 space-y-4 lg:space-y-3',
              item: 'flex items-center',
              selectedItem: 'font-semibold',
              label: 'flex items-center cursor-pointer',
              checkbox: 'hidden',
              swatch:
                'w-8 h-8 flex items-center justify-center rounded-full cursor-pointer checked:bg-gray-300 ring-1 ring-black/10 ring-inset cursor-pointer',
              swatchIcon: 'h-4 w-4 stroke-2 mix-blend-difference text-white',
              labelText: 'ml-3 text-sm text-gray-600',
              count:
                'ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700',
            }}
          />
        </Filter>
        */}
      <Filter header="Price Range" type={type} className="pt-10">
        <RangeInput
          attribute="price"
          classNames={{
            form: "pt-6 flex space-x-4 justify-between",
            input:
              "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            separator: "self-center text-sm font-medium text-gray-500",
            submit:
              "rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50",
          }}
        />
      </Filter>
    </>
  );
}
