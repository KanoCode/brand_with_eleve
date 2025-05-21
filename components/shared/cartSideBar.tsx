"use client";

import { useState } from "react";

import Image from "next/image";

import { useProductStore } from "@/app/store/productsStore";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdArrowForward } from "react-icons/md";
import {
  handleQuantityDecreament,
  handleQuantityIncreament,
  handleItemDelete,
} from "@/lib/utils";

function CartSideBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const removeAllItems = useProductStore((state: any) => {
    return state.removeAll;
  });

  const cart = useProductStore((state: any) => state.cart);
  // const removeCartItem = useProductStore((state: any) => state.remove);
  // const clearAllCart = useProductStore((state: any) => state.removeAll);
  let disabledBtn = cart.length > 0 ? false : true;

  let total = cart.reduce((initialTotal: number, product: any) => {
    return initialTotal + product.quantity * Number(product.price);
  }, 0);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button className="rounded-md bg-primary px-2 py-2  text-lg text-white shadow-sm hover:bg-[#DB3A37] transition duration-300">
          View Quote
        </button>
      </SheetTrigger>
      <SheetContent
        className=" w-screen md:min-w-[760px] md:h-auto overflow-y-auto"
        side={"right"}
      >
        <SheetHeader>
          <SheetTitle className="font-medium">Quote Request</SheetTitle>
        </SheetHeader>

        <QuotationComponent setOpen={sheetOpen} />

        <div className="absolute bottom-0 left-0 w-full bg-neutral-50 p-5">
          <p className="flex justify-between">
            <span>
              <span className="font-medium">Subtotal</span>
              <span className="block text-sm text-neutral-500">
              All Prices Excluding Taxes.
              </span>
            </span>
            <span className="text-xl font-medium">$ {total}</span>
          </p>
          <div className="mt-5 flex items-center gap-5">
            <Link
              className={`w-full p-2 rounded-md flex-1 border-2 bg-primary text-white  
  ${disabledBtn ? "pointer-events-none opacity-50" : "hover:bg-red-600"}`}
              aria-disabled={disabledBtn}
              onClick={() => {
                toast.success("Cart updated successfully");
                setSheetOpen(false);

                removeAllItems();
              }}
              href={"/shop"}
            >
              Clear Quote Request
            </Link>

            <Link
              className={`w-full p-2 rounded-md flex-1 border-2 bg-primary text-white 
  ${disabledBtn ? "pointer-events-none opacity-50" : "hover:bg-red-600"}`}
              aria-disabled={disabledBtn}
              onClick={() => {
                setSheetOpen(false);
              }}
              href={"/buy/purchase-checkout-page"}
            >
              Generate Quotation
            </Link>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"link"} onClick={() => setSheetOpen(false)}>
              {/* Continue Shopping <MdArrowForward /> */}
              <Link
                className="flex"
                href={"/shop"}
                onClick={() => setSheetOpen(false)}
              >
                Continue Shopping <MdArrowForward />
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default CartSideBar;

export function QuotationComponent(props: any) {
  const cart = useProductStore((state: any) => state.cart);
  const addCartItem = useProductStore((state: any) => state.setCart);

  return (
    <div className="w-full max-h-[70vh] overflow-y-auto">
      <div className="grid gap-4">
        {cart.map((item: any, i: number, arr: any[]) => {
          return (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    fill
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <h5 className="">{item.price}</h5>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      let revisedCart = handleQuantityDecreament(item, arr);
                      addCartItem(revisedCart);
                      toast.success("Cart updated successfully");
                    }}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      let revisedCart = handleQuantityIncreament(item, arr);
                      addCartItem(revisedCart);
                      toast.success("Cart updated successfully");
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-medium">
                  $ {(+item.price * +item.quantity).toFixed(2)}
                </div>
                <Button
                  onClick={() => {
                    let revisedCart = handleItemDelete(item, cart);
                    addCartItem(revisedCart);
                    toast.success("Cart updated successfully");
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <AiOutlineDelete className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
