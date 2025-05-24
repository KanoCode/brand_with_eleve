import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductStore } from "@/app/store/productsStore";

function ProductDescriptionTabs(product: any, productCode: string) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs Component */}
      <Tabs defaultValue="description">
        <TabsList className="border-b border-gray-200">
          <TabsTrigger
            value="description"
            className="px-4 py-2 text-gray-900 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:text-red-500 data-[state=active]:border-red-500"
          >
            DESCRIPTION
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="px-4 py-2 text-gray-900 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:text-red-500 data-[state=active]:border-red-500"
          >
            ADDITIONAL INFORMATION
          </TabsTrigger>
        </TabsList>

        {/* Description Tab Content */}
        <TabsContent value="description">
          <div
            className="py-2"
            dangerouslySetInnerHTML={{ __html: product.product.description }}
          ></div>
        </TabsContent>

        {/* Reviews Tab Content */}
        <TabsContent value="reviews">
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>{product.product.fullCode}</li>
            <li>
              <h5 className="font-bold">Packaging and Dimensions</h5>

              {Object.keys(
                product.product?.variants[0].packagingAndDimension
              ).map((item, id) => (
                <li key={id}>
                  {item}:{" "}
                  {product.product?.variants[0].packagingAndDimension[item]}
                </li>
              ))}
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductDescriptionTabs;
