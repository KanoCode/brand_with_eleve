import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type ProductsNavCategory = {
  category: any;
};
export let categoryObj: any = {
  "Corporate Gifts": "Gifting",
  Hampers: "Hampers",
  "Gift Sets": "Gift Sets",
  "Corporate Clothing": "Clothing",
  "Headwear and Accessories": "Headwear",
  Workwear: "Workwear",
  Display: "Display",
  "Custom Products": "Custom Products",
  "All Clearance Items": "Clearance",
};
const Dropdown = ({ category }: ProductsNavCategory) => {
  return (
    <>
      <Menu>
        <MenuButton className="data-active:bg-blue-200">
          {categoryObj[category.categoryName]
            ? categoryObj[category.categoryName]
            : category.categoryName}
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="bg-white border transition duration-100 ease-ou px-6 py-2 z-40 grid grid-cols-3 gap-2"
        >
          {category.children.map((childCategory: any) => (
            <MenuItem key={childCategory.categoryCode}>
              <a
                href={`/shop/category/${childCategory.categoryPath}?keywords=${childCategory.categoryName}`}
              >
                {childCategory.categoryName}
              </a>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
};

export default Dropdown;
