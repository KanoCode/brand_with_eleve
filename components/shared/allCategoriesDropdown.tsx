import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const links = [
//   { href: "/settings", label: "Settings" },
//   { href: "/support", label: "Support" },
//   { href: "/license", label: "License" },

  "Gifting",
  "Hampers",
  "Gift Sets",
  "Clothing",
  "Headwear",
  "Workwear",
  "Display",
  "Custom Products",
  "Clearance",
];

export default function AllCategoriesDropdown() {
  return (
    <Menu>
      <MenuButton className="data-active:bg-blue-200">All Categories</MenuButton>
      <MenuItems anchor="bottom" className="bg-white border px-6 py-2 z-40 grid-cols-1 grid">
        {links.map((link) => (
          <MenuItem key={link}>
            <a href={link}>{link}</a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
