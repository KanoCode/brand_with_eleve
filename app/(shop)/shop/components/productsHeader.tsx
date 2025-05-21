import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { MdChevronRight, MdHome } from "react-icons/md";

const ProductsHeader = () => {
  return (
    <div className="p-10">
      <ul className="flex flex-row  items-center">
        <li>
          <Button asChild variant="link" size="icon">
            <Link href={"/"}>
              <MdHome className="w-5 h-5" />
            </Link>
          </Button>
        </li>
        <li className="text-gray-600">
          <MdChevronRight className="w-5 h-5" />
        </li>
        <li>
          <Link href={"#"} className="text-gray-600 font-medium">
            All Products
          </Link>
        </li>
      </ul>
      <hr />
      <h1 className="my-2 font-bold text-2xl text-gray-600">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum vero
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quasi,
        beatae iusto nam, tempore, distinctio ab doloremque ea veniam aliquam
      </p>
    </div>
  );
};

export default ProductsHeader;
