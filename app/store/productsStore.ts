"use client";

import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

interface CartItem extends Product {
  count: number;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
};

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: Product) => void;
  remove: (idProduct: number) => void;
  removeAll: () => void;
};

export const useProductStore = create<any>(
  persist(
    (set: any, get: any) => ({
      products: [],
      isPricesLoaded: false,
      filters: {
        brandNames: null,
        pricesRange: null,
        gender: null,
        color: null,
      },
      variants: [],
      cart: [],
      externalForexInfo: {},

      stock: [],
      productTypes: [],
      productImages: [],
      totalProducts: 0,

      // filters

      count: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item: any) => item.count)
            .reduce((prev: number, curr: number) => prev + curr);
        return 0;
      },

      add: (product: Product) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
      },
      remove: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        set({ cart: updatedCart });
      },
      removeAll: () => set({ cart: [] }),
      setCart: (data: any) => set({ cart: data }),
      setProducts: (data: any) => set({ products: data }),
      setProductBrands: (data: any) => set({ productBrands: data }),
      setProductTypes: (data: any) => set({ productTypes: data }),
      setTotalProducts: (data: any) => set({ totalProducts: data }),
      setColorFamily: (data: any) => set({ colorsFamily: data }),
      setFeaturedProducts: (data: any) => set({ featuredProducts: data }),
      setIsPricesLoaded: (value: boolean) => set({ isPricesLoaded: value }),
      setExternalForexInfo: (data: any) => set({ externalForexInfo: data }),
      setProductImages: (data: any) => set({ productImages: data }),
      setVariants: (data: any) => set({ variants: data }),
      setStock: (data: any) => set({ stock: data }),
    }),
    {
      name: "markethubData", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

function updateBrandNames(data: any, filters: any) {
  return filters.set("brandNames", data);
}

function updateCart(product: Product, cart: CartItem[]): CartItem[] {
  const cartItem = { ...product, count: 1 } as CartItem;
  const productOnCart = cart.map((item) => item.id).includes(product.id);

  if (!productOnCart || cart.length == 0) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === product.id)
        return { ...item, quantity: product.quantity } as CartItem;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
