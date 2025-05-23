"use client";

import Link from "next/link";

const HeroCategories = () => {
  return (
    <>
      <main className="max-w-6xl mx-auto px-4 mt-6 mb-6">
        <section className="mb-14">
          <h2 className="text-[2rem] font-extrabold text-center mb-2 text-[#424b55]">
            Browse our products
          </h2>
          <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
            Discover Amrod's range of high-quality products designed to meet all
            your promotional and branding needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mb-6">
            {/* GIFTS */}
            <Link
              href="/shop/category/gifts?keywords=gifts"
              className="relative group rounded overflow-hidden shadow-sm"
              aria-label="Browse Gifts"
            >
              <img
                src="https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/AV-19002/DEFAULT_1024X1024.jpg"
                alt="Gift products - bags, notepads, and more"
                className="object-cover w-full h-[210px] transition-transform group-hover:scale-105 duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition duration-200">
                <span className="text-white text-lg font-semibold bg-white/20 px-6 py-2 rounded">
                  GIFTS
                </span>
              </span>
            </Link>

            {/* CLOTHING */}
            <Link
              href="/shop/category/clothing?keywords=clothing"
              className="relative group rounded overflow-hidden shadow-sm"
              aria-label="Browse Clothing"
            >
              <img
                src="https://assets.promoafrica.com/webassets/home/images/clothing.jpg"
                alt="Clothing products - t-shirts, jackets, and more"
                className="object-cover w-full h-[210px] transition-transform group-hover:scale-105 duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition duration-200">
                <span className="text-white text-lg font-semibold bg-white/20 px-6 py-2 rounded">
                  CLOTHING
                </span>
              </span>
            </Link>

            {/* HEADWEAR */}
            <Link
              href="/shop/category/headwear?keywords=headwear"
              className="relative group rounded overflow-hidden shadow-sm"
              aria-label="Browse Headwear"
            >
              <img
                src="https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/CAP-1604/CAP-1604-Y_1024X1024.jpg"
                alt="Headwear products - caps, hats, and more"
                className="object-cover w-full h-[210px] transition-transform group-hover:scale-105 duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition duration-200">
                <span className="text-white text-lg font-semibold bg-white/20 px-6 py-2 rounded">
                  HEADWEAR
                </span>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mt-1 mb-8">
            {/* WORKWEAR */}
            <Link
              href="/shop/category/workwear?keywords=workwear"
              className="relative group rounded overflow-hidden shadow-sm"
              aria-label="Browse Workwear"
            >
              <img
                src="https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/ALT-1107/DEFAULT_1024X1024.jpg"
                alt="Workwear products - overalls, safety gear, and more"
                className="object-cover w-full h-[210px] transition-transform group-hover:scale-105 duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition duration-200">
                <span className="text-white text-lg font-semibold bg-white/20 px-6 py-2 rounded">
                  WORKWEAR
                </span>
              </span>
            </Link>

            {/* DISPLAY */}
            <Link
              href="/shop/category/display?keywords=display"
              className="relative group rounded overflow-hidden shadow-sm"
              aria-label="Browse Display"
            >
              <img
                src="https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/DC-AM-24-D/DEFAULT_1024X1024.jpg"
                alt="Display products - banners, stands, and more"
                className="object-cover w-full h-[210px] transition-transform group-hover:scale-105 duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition duration-200">
                <span className="text-white text-lg font-semibold bg-white/20 px-6 py-2 rounded">
                  DISPLAY
                </span>
              </span>
            </Link>

            {/* CUSTOM PRODUCTS */}
            <Link
              href="/shop/category/custom-products?keywords=custom-products"
              className="relative group rounded overflow-hidden shadow-sm"
              aria-label="Browse Custom Products"
            >
              <img
                src="https://assets.promoafrica.com/webassets/home/images/customProducts.jpg"
                alt="Custom products - branded speakers, packaging, and more"
                className="object-cover w-full h-[210px] transition-transform group-hover:scale-105 duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition duration-200">
                <span className="text-white text-lg font-semibold bg-white/20 px-6 py-2 rounded">
                  CUSTOM PRODUCTS
                </span>
              </span>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full border-t border-[#d0dae3] my-8" />
      </main>
    </>
  );
};

export default HeroCategories;
