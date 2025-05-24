"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useProductStore } from "@/app/store/productsStore";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { event as sendGAEvent } from "../../../../lib/ga";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { AiOutlineDelete } from "react-icons/ai";
import {
  handleItemDelete,
  handleQuantityDecreament,
  handleQuantityIncreament,
} from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@/components/shared/cartSideBar";
import { ChevronRight, Home } from "lucide-react";
import { ThankYouMessageDialog } from "./components/thankyouModal";

const fileSchema = z.object({
  filename: z.string(),
  content: z.any(),
});

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(16),
  attachments: z.array(fileSchema).optional(),
  phoneNumber: z.string().min(10),
  organization: z.string().min(6),
  jobTitle: z.string().min(6),
});

const Page = () => {
  const cart = useProductStore((state: any) => state.cart);
  const addCartItem = useProductStore((state: any) => state.setCart);
  const viewportWidth = useProductStore((state: any) => state.viewportWidth);

  const [isSmScreen, setIsSmScreen] = useState(false);

  // Function to detect screen size

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setIsSmScreen(true); // Tailwind's md breakpoint is 768px
      }
    };

    // Add event listener to check the screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmScreen]);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setIsSmScreen(true); // Tailwind's md breakpoint is 768px
    }

    return () => {
      // window.removeEventListener("resize", handleResize);
    };
  }, []);

  let total = cart.reduce((initialTotal: number, product: any) => {
    return initialTotal + product.quantity * Number(product.price);
  }, 0);

  return (
    <>
      {
        <main className={`container py-1 lg:pb-28 lg:pt-6 `}>
          <div
            className={`flex items-center
            ${isSmScreen ? "mt-32" : ""}`}
          >
            <Link
              role="button"
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              <Home />
            </Link>
            <ChevronRight />
            <Link
              href="/shop"
              role="button"
              className="ml-2 text-sm font-medium  capitalize text-gray-600 hover:text-gray-800"
            >
              All Products
            </Link>
          </div>

          <div className="mb-16"></div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">{renderLeft()}</div>

            <div className="my-6 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16 " />

            <div className="w-full lg:w-[36%] ">
              {" "}
              <h2 className="block text-xl font-semibold sm:text-3xl lg:text-2xl ">
                Checkout
              </h2>
              <h3 className="text-lg font-semibold">Order summary</h3>
              <div className="mt-8 divide-y divide-neutral-300">
                {cart.map((item: any, i: number, arr: any[]) =>
                  renderProduct(item, arr, addCartItem)
                )}
              </div>
              <div className="mt-10 border-t border-neutral-300 pt-6 text-sm">
                <div className="mt-4 flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {" "}
                    ZMW {+total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span> ZMW {+total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </>
  );
};

export default Page;

const renderProduct = (item: any, cartArr: any[], addCartItem: Function) => {
  const {
    name,
    url: coverImage,
    price: currentPrice,
    id: slug,
    colour,
    quantity,
  } = item;

  return (
    <div key={name} className="flex py-5 last:pb-0">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl md:size-40">
        <Image
          fill
          src={coverImage}
          alt={item.name}
          className="size-full object-contain object-center"
        />
        <Link className="absolute inset-0" href={`/shop/product/${slug}`} />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="font-medium md:text-2xl ">
                <Link href={`/shop/product/${slug}`}>{name}</Link>
              </h3>

              <span className="my-1 text-sm text-neutral-500">
                {" "}
                Quantity: {quantity}
              </span>

              <span className="my-1 text-sm text-neutral-500">{colour}</span>
            </div>
            <span className="font-medium md:text-xl">K{currentPrice}</span>
          </div>
        </div>
        <div className="flex w-full items-end justify-between text-sm">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                let revisedCart = handleItemDelete(item, cartArr);
                addCartItem(revisedCart);
                console.log(revisedCart);
                toast.success("Cart updated successfully");
              }}
              variant="ghost"
              size="icon"
            >
              <AiOutlineDelete className="text-2xl" />
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                let revisedCart = handleQuantityDecreament(item, cartArr);
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
                let revisedCart = handleQuantityIncreament(item, cartArr);
                addCartItem(revisedCart);
                toast.success("Cart updated successfully");
              }}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// contact info
const renderLeft = () => {
  const cart = useProductStore((state: any) => state.cart);
  const clearAllCart = useProductStore((state: any) => state.removeAll);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      organization: "",
      jobTitle: "",
      attachments: undefined,
    },
  });

  async function onSubmit({
    email,
    firstName,
    lastName,
    attachments,
    phoneNumber,
    organization,
    jobTitle,
  }: z.infer<typeof formSchema>) {
    let body = {
      email,
      phoneNumber,
      firstName,
      lastName,
      attachments,
      organization,
      jobTitle,
      cart,
    };

    // handleShow(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    })
      .then(() => {
        toast.success("Order sent successfully");

        setIsDialogOpen(true);

        sendGAEvent({
          action: "Quotation-Request",
          params: {
            item: "Request Quotation sent",
          },
        });
      })
      .catch((e) => {
        toast.error("something went wrong");
        console.log(e);
      });
  }
  return (
    <div className="space-y-4 border-t border-[#5c5346] bg-white shadow-lg px-6 py-7 sm:space-y-6 ">
      <h3 className="text-lg font-semibold">Contact infomation</h3>

      <div id="ContactInfo" className="scroll-mt-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                        placeholder="Enter First Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                        placeholder="Enter Last Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter Contact Number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the phone number we will use to contact you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g ZESCO plc" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the organization or company that you represent
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email Address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    Attach Your Company Logo / RFQ Documentation - Optional
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          Promise.all(
                            Array.from(files).map(async (file) => ({
                              filename: file.name,
                              content: Buffer.from(
                                await file.arrayBuffer()
                              ).toString("base64"),
                            }))
                          ).then((filesArray) => {
                            field.onChange(filesArray);
                          });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"> Submit Quote</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
