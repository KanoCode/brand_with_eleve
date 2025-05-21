"use client";

import { Fragment, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";

import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";

const DropdownOverFlow = ({ leftoverCategories }: any) => {
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="flex text-white justify-around py-2 data-[active]:bg-primary">
          More Categories
          <ChevronDownIcon className="size fill-white/60" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="bg-white border border-gray-700"
        >
          {leftoverCategories?.map((categoryItem: any, idx: number) => (
            <MenuItem key={idx} as={Fragment}>
              {({ focus: focus1 }) => (
                <div>
                  <Menu>
                    <MenuButton
                      className={clsx(
                        "flex w-full justify-between navBarLink text-primary hover:text-white hover:bg-[#db3a37]",
                        focus1 && "border bg-[#db3a37] text-white"
                      )}
                    >
                      <ChevronLeftIcon />
                      {categoryItem.categoryName}
                    </MenuButton>

                    <MenuItems
                      anchor="bottom end"
                      className="bg-white border px-4"
                    >
                      {categoryItem.children?.map(
                        (categoryChildItem: any, idx2: number) => (
                          <MenuItem key={idx2} as={Fragment}>
                            {({ focus: focus2 }) => (
                              <a
                                href={`/shop/category/${categoryChildItem.categoryPath}?keywords=${categoryChildItem.categoryName}`}
                                className={clsx(
                                  "flex w-full navBarLink text-primary",
                                  focus2 && "border bg-[#db3a37] text-white"
                                )}
                              >
                                {categoryChildItem.categoryName}
                              </a>
                            )}
                          </MenuItem>
                        )
                      )}
                    </MenuItems>
                  </Menu>
                </div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DropdownOverFlow;
