"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/app/(shop)/shop/loading";
import chroma from "chroma-js";

import { useProductStore } from "@/app/store/productsStore";
import ImageSlider from "./imagesSlider";
import { ColourImage, Variant } from "@/lib/apiTypes";
import { FaCheck, FaTimes } from "react-icons/fa";
import AddToCart from "./addToCart";
import ProductDescriptionTabs from "./productsInformation";

function ProductSlideshow({ product, stock, price }: any) {
  // meeting modal

  const [selectedColor, setSelectedColor] = useState({} as any | null);
  const [productCode, setProductCode] = useState(product.fullCode);
  const [isStockAvailable, setIsStockAvailable] = useState(false);
  const [stockInfoObj, setStockInfoObj] = useState({} as any);
  const [selectedSize, setSelectedSize] = useState(null);

  const setProductImages = useProductStore(
    (state: any) => state.setProductImages
  );
  const [loading, setLoading] = useState(false);

  const setVariants = useProductStore((state: any) => state.setVariants);
  const setStock = useProductStore((state: any) => state.setStock);
  setVariants(product.variants);
  let cachedStock = useProductStore((state: any) => state.stock);
  let checkHasSizes = product.variants && product.variants[0].codeSize;

  let variants = useProductStore((state: any) => state.variants);

  const handleSizeClick = (size: any) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    // Code that runs when the component mounts
    setProductImages(product.images);
    setLoading(false);

    const cleanUpComponent = () => {
      setProductImages([]);
      setStock([]);
      setIsStockAvailable(false);
      setStockInfoObj({});
    };

    const handleBeforeUnload = (event: any) => {
      // Perform actions before the page unloads
      event.returnValue = ""; // Required for most browsers
      cleanUpComponent();
      setLoading(true);
      console.log("Page is being reloaded or closed!");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    setStock(stock);

    console.log(stock);
    let stockItem = stock.find((item: any) => item.fullCode == productCode);
    if (stockItem) {
      setIsStockAvailable(true);
      setStockInfoObj(stockItem);
    } else {
      setIsStockAvailable(false);
    }
    // Code that runs when the component unmounts (user leaves route)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      cleanUpComponent();
      setLoading(true);
      console.log("Component unmounted or user left the route");
    };
  }, []);

  useEffect(() => {
    let stockItem = cachedStock.find(
      (item: any) => item.fullCode == productCode
    );

    if (stockItem) {
      setIsStockAvailable(true);
      setStockInfoObj(stockItem);
      if (!stockItem.stock) {
        setIsStockAvailable(false);
      }
    } else {
      setIsStockAvailable(false);
    }
  }, [productCode, stockInfoObj]);

  useEffect(() => {
    let variant = variants.find(
      (variant: any) => variant.codeColour == selectedColor.code
    );

    if (variant) {
      setProductCode(variant.fullCode);
    }
  }, [selectedColor]);

  const checkColors = product.colourImages?.map((colorItm: ColourImage) => {
    let name = colorItm.name.toLowerCase().split(" ").join("");
    if (chroma.valid(name)) {
      return {
        ...colorItm,
        codeLeft: chroma(name).hex(),
        codeRight: chroma(name).hex(),
      };
    } else {
      let [fixColor1, fixColor2] = colorItm.name.split(" ");

      if (chroma.valid(fixColor1) && chroma.valid(fixColor2)) {
        return {
          ...colorItm,
          codeLeft: chroma(fixColor1).hex(),
          codeRight: chroma(fixColor2).hex(),
        };
      }
    }
  });

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
              <ImageSlider images={product.images} />

              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  {product.productName}
                </h2>
                <p className="text-gray-600 mb-4">SKU: {productCode}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">K {price}</span>
                  {product.keywords.length > 0 && (
                    <h4 className="font-semibold">
                      {" "}
                      Keywords:{product.keywords}
                    </h4>
                  )}
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Selected Color: {selectedColor.name}
                  </h3>

                  {checkColors && (
                    <div className="flex space-x-2 flex-wrap">
                      {checkColors.map((color: any, i: number) => {
                        if (color) {
                          return (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedColor(color);

                                setProductImages(color.images);
                              }}
                              className="w-12 h-12 flex cursor-pointer"
                            >
                              <div
                                className="w-1/2 h-full"
                                style={{
                                  backgroundColor: `${color.codeLeft}`,
                                }}
                              />
                              {color.codeRight && (
                                <div
                                  className="w-1/2 h-full"
                                  style={{
                                    backgroundColor: `${color.codeRight}`,
                                  }}
                                />
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
                {/* Display selected size */}
                <p>Selected size: {selectedSize ? selectedSize : "None"}</p>
                {checkHasSizes && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    {selectedColor &&
                      variants
                        .filter(
                          (varnt: Variant) =>
                            varnt.codeColour == selectedColor.code
                        )
                        .map((pdctVariant: Variant, i: string) => (
                          <button
                            key={i}
                            onClick={() => {
                              handleSizeClick(pdctVariant.codeSize);

                              setProductCode(pdctVariant.fullCode);
                            }}
                            style={{
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor:
                                selectedSize === pdctVariant.codeSize
                                  ? "black"
                                  : "lightgray",
                              color:
                                selectedSize === pdctVariant.codeSize
                                  ? "white"
                                  : "black",
                              cursor: "pointer",
                            }}
                          >
                            {pdctVariant.codeSize}
                          </button>
                        ))}

                    {!selectedColor &&
                      variants
                        .slice(0, 10)
                        .map((pdctVariant: Variant, i: string) => (
                          <button
                            key={i}
                            onClick={() => {
                              handleSizeClick(pdctVariant.codeSize);
                              setProductCode(pdctVariant.fullCode);
                            }}
                            style={{
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor:
                                selectedSize === pdctVariant.codeSize
                                  ? "black"
                                  : "lightgray",
                              color:
                                selectedSize === pdctVariant.codeSize
                                  ? "white"
                                  : "black",
                              cursor: "pointer",
                            }}
                          >
                            {pdctVariant.codeSize}
                          </button>
                        ))}
                  </div>
                )}
                {isStockAvailable || stockInfoObj.stock == 0 ? (
                  <span className="item-in-stock flex text-[#4b5862]">
                    <FaCheck />
                    <span className="show-stock-qty ml-4">
                      {stockInfoObj.stock} In Stock
                    </span>
                  </span>
                ) : (
                  <span className="item-in-stock flex text-[#4b5862]">
                    <FaTimes />
                    <span className="show-stock-qty ml-4">Not in stock</span>
                  </span>
                )}
                <AddToCart
                  productCode={productCode}
                  stock={stockInfoObj.stock}
                  price={price}
                  product={product}
                  isStockAvailable={isStockAvailable}
                  selectedColor={selectedColor.name}
                  size={selectedSize}
                />

                {product.fullBrandingGuide && (
                  <div className="font-extrabold">
                    <Link
                      href={product.fullBrandingGuide}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW OR DOWNLOAD YOUR BRANDING OPTIONS HERE
                    </Link>
                  </div>
                )}

                {product.keywords.length > 0 && (
                  <h4 className="font-semibold">
                    {" "}
                    Keywords:{product.keywords}
                  </h4>
                )}
                <h4 className="font-semibold">
                  {" "}
                  Categories:
                  {product.categories &&
                    product.categories.map((category: any, idx:number) => (
                      <h4 key={idx}  className="font-semibold"> {category.name},</h4>
                    ))}
                </h4>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features:</h3>

                  <ProductDescriptionTabs
                    product={product}
                    productCode={productCode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductSlideshow;
