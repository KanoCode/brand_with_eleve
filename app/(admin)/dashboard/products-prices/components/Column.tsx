"use client";

import { ColumnDef, isFunction } from "@tanstack/react-table";
import { toast } from "sonner";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { isFeaturedStatus } from "./tableDefinition";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMutation } from "react-query";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

export type Product = {
  price: number;
  productName: string;
  productCode: string;
  generalPrice: number;
  manualPrice: number;
  defaultImage: string;
};

const isFeaturedProductsMaximumReached = async () => {
  const docRef = doc(db, "featuredProducts", "featuredProductCount");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let percentage = docSnap.data().currentFeaturedProductCount;
    return percentage;
  } else {
    // something else
    console.log(
      "general price can't be null, somethings wrong,check firestore"
    );
  }
};

const deleteFeaturedProduct = async (product: any) => {
  await deleteDoc(doc(db, "featuredProducts", product.productCode));
};

const deleteManualPrices = async (product: any) => {
  await deleteDoc(doc(db, "manualPrices", product.productId));
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productCode",
    header: "Product Code",
  },
  {
    accessorKey: "productName",
    header: "product name",
  },
  {
    accessorKey: "generalPrice",
    header: "General Price",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          {product.manualPrice > 0 ? (
            <div className="line-through">{product.generalPrice}</div>
          ) : (
            <div>{product.generalPrice}</div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "manualPrice",
    header: "Manual Price",
  },
  {
    accessorKey: "price",
    header: "Original Price (Rand)",
    cell: ({ row }) => {
      const product = row.original;

      return <div>{Number(product.price).toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      const featured = isFeaturedStatus.find(
        (featuredItm) => featuredItm.value === row.getValue("featured")
      );

      if (!featured) {
        return null;
      }

      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-red-500": featured.value === "notFeatured",
            "text-green-500": featured.value === "isFeatured",
          })}
        >
          {featured.icon && (
            <featured.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{featured.label}</span>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const isFeatured = row.getValue("featured");
      const product = row.original;
      // const { mutate: addToFeaturedProducts, isLoading: isUpdating } =
      //   useMutation({
      //     mutationFn: createFeaturedProduct,
      //     mutationKey: "create-featured-product",
      //   });

      // const { mutate: deleteManualPriceMutation } = useMutation({
      //   mutationFn: deleteManualPriceEntry,
      //   mutationKey: "delete-manual-price-on-product",
      // });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.productCode)}
            >
              Copy product code
            </DropdownMenuItem>
            {product.manualPrice > 0 ? (
              <DropdownMenuItem
                onClick={async () => {
                  let body = {
                    productId: product.productCode,
                  };

                  try {
                    await deleteManualPrices(body);
                    toast.success("Removed the selected individual price");
                  } catch (error) {
                    toast.error("request failed");
                  }
              
                }}
              >
                Remove Individual Pricing
              </DropdownMenuItem>
            ) : (
              ""
            )}

            <DropdownMenuSeparator />

            {
              // const isFeatured = row.getValue("isFeatured");
              isFeatured === "isFeatured" ? (
                <DropdownMenuItem
                  onClick={async () => {
                    // let productCode = row.getValue("productCode");
                    let body = {
                      productCode: product.productCode,
                      price: product.price,
                      productName: product.productName,
                      defaultImage: product.defaultImage,
                      manualPrice: product.manualPrice,
                    };

                    try {
                      await deleteFeaturedProduct(body);
                      toast.success(
                        "Featured products table successfully Updated"
                      );

                      const featuredProductCountRef = doc(
                        db,
                        "featuredProducts",
                        "featuredProductCount"
                      );

                      await updateDoc(featuredProductCountRef, {
                        currentFeaturedProductCount: increment(-1),
                      });
                    } catch (error) {
                      toast.error("oops didn't work, try again");
                    }
                  }}
                >
                  Remove from featured
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    let body = {
                      ...product,
                    };

                    try {
                      let isFeaturedProductsMaximum =
                        await isFeaturedProductsMaximumReached();

                      console.log(isFeaturedProductsMaximum);
                      if (isFeaturedProductsMaximum >= 10) {
                        toast.error(
                          "Cannot add more that 10 products to featured section, please remove some"
                        );
                      } else {
                        await setDoc(
                          doc(db, "featuredProducts", product.productCode),
                          {
                            defaultImage: body.defaultImage,

                            manualPrice: product.manualPrice,
                            price: product.price,

                            productCode: body.productCode,
                            productName: body.productName,
                          }
                        );

                        const featuredProductCountRef = doc(
                          db,
                          "featuredProducts",
                          "featuredProductCount"
                        );

                        await updateDoc(featuredProductCountRef, {
                          currentFeaturedProductCount: increment(1),
                        });
                        toast.success(
                          "Featured products table successfully Updated"
                        );
                      }
                    } catch (error) {
                      toast.error("oops didn't work, try again");
                    }
                  }}
                >
                  Add to featured
                </DropdownMenuItem>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
