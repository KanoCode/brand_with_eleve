"use client";
import chroma from "chroma-js";

import React, { useEffect, useState } from "react";
import { useProductStore } from "@/app/store/productsStore";
import { toast } from "sonner";

import { Product } from "@/lib/apiTypes";

interface AddToCartProps {
  product: Product;
  isStockAvailable: boolean;
  price: number;
  productCode: string;
  selectedColor: string;
  size: string | null;
  stock: number | null;
}

const AddToCart: React.FC<AddToCartProps> = ({
  product,
  isStockAvailable,
  price,
  productCode,
  selectedColor,
  size,
  stock,
}) => {
  // const [selectedColor, setSelectedColor] = useState("");
  const [withOwnBranding, setWithBrandingPref] = useState("no");
  const [quantity, setQuantity] = useState(1);
  const [noStock, setNoStock] = useState(false);
  // const [selectedColor, setSelectedColor] = useState("");
  const productImages = useProductStore((state: any) => state.productImages);

  useEffect(() => {
    if (stock) {
      if (quantity > stock) {
        toast.error(
          "Not enough stock available. You can only add up to " +
            stock +
            " items."
        );
        setNoStock(true);
      } else if (quantity == stock) {
        setQuantity(stock);
        setNoStock(false);
      } else {
        setNoStock(false);
      }
    }
  }, [quantity]);

  // Example colors to be displayed (with their codes)

  const cart = useProductStore((state: any) => state.cart);
  const addCartItem = useProductStore((state: any) => state.setCart);

  return (
    <div>
      {/* Quantity Input */}
      <div className="grid grid-cols-4 gap-2 font-bold">
        <div>
          <label
            htmlFor="qty"
            className="block text-[16px] font-bold leading-6"
          >
            Quantity: (1 min)
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder={`${quantity}`}
              min="1"
              className="disabled:bg-gray-700 disabled:text-sitePrimary-950 block w-full rounded-md border-0 py-1.5 text-[#52a1f5] shadow-md sm:leading-6"
              defaultValue={1}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="item_price"
            className="block text-[16px] font-bold leading-6"
          >
            Item Price:
          </label>
          <div className="mt-2">
            <span
              id="item_price"
              className="bg-[#e4e4e4] block w-full rounded-md border-0 py-1.5 px-3 sm:leading-6 text-sitePrimary-950"
            >
              {price}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="subtotal"
            className="block text-[12px] font-bold leading-6"
          >
            Subtotal:
          </label>
          <div className="mt-2">
            <span
              id="subtotal"
              className="bg-[#e4e4e4] block w-full rounded-md border-0 py-1.5 px-3 sm:leading-6 text-sitePrimary-950"
            >
              {(+price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* Add to Quote and Minimum Cart Value */}
      <div className="w-full flex space-x-2 items-center">
        <button
          type="button"
          disabled={!isStockAvailable || noStock}
          onClick={() => {
            let newCart = cart.filter(
              (item: any) => item.id != product.fullCode
            );
            let newObj = {
              name: product.productName,
              url:
                productImages.length == 0
                  ? product.images[0].urls[0].url
                  : productImages[0].urls[0].url,
              quantity,
              colour: selectedColor,
              branding: withOwnBranding,
              id: productCode,
              price: price,
              size: size,
            };

            newCart.push(newObj);
            addCartItem(newCart);

            toast.success("Product added to cart successfully");
          }}
          // Replace with actual event handler
          className="disabled:opacity-50 w-[75%] rounded-md bg-red-600 hover:bg-primary px-3 py-2 flex items-center justify-center text-[22px] font-bold text-white shadow-sm"
          style={{ marginTop: "16px", marginBottom: "20px" }}
        >
          Add To Quote
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
