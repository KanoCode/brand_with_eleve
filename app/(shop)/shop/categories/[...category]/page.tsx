import React from "react";
import CategoryCard from "@/components/shared/CategoryCard";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import { getCategories } from "@/components/shared/productsNav";
import { headers } from "next/headers";
import BreadcrumbComp from "../../components/breadCrumb";

function makeCategoryObj(categoryItem: any, organizedCategories: any) {
  let totalProducts = organizedCategories[
    categoryItem.categoryName.toLowerCase()
  ]
    ? organizedCategories[categoryItem.categoryName.toLowerCase()].length
    : undefined;
  let imageUrl = organizedCategories[categoryItem.categoryName.toLowerCase()]
    ? organizedCategories[categoryItem.categoryName.toLowerCase()][0].image
    : undefined;
  return {
    totalProducts,
    imageUrl,
  };
}

async function getOrganizedCategories(type: number) {
  try {
    const res = await fetch(
      `${process.env.MARKETHUB_NODE_URL}/organize-categories?categoryType=0`,
      { next: { revalidate: 24 * 7 * 3000 } }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    let response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
  params: { [key: string]: string[] };
}) {
  let start = searchParams?.start || "0";

  let categoryType = Number(start);

  let pathName = headers().get("x-pathname");
  let formatPathName = decodeURI(pathName || "");

  let organizedCategories = await getOrganizedCategories(categoryType);

  let allCategories = await getCategories();
  let childCategories = [];
  let filteredCategories = allCategories.filter((category: any) => {
    if (Number(start) == 0) {
      return category.categoryBehaviour == start;
    } else {
      let categoryName = searchParams?.categoryName || null;

      return category.categoryName?.toLowerCase() == categoryName;
    }
  });

  if (Number(start) == 0) {
    filteredCategories = filteredCategories.map((categoryItem: any) => {
      return {
        categoryName: categoryItem.categoryName.toLowerCase(),

        ...makeCategoryObj(categoryItem, organizedCategories),
      };
    });
  } else {
    let childCategoriesArr =
      organizedCategories[filteredCategories[0].categoryName.toLowerCase()];

    childCategories = filteredCategories[0].children.map(
      (categoryItem: any) => {
        const innerCategories = childCategoriesArr.filter((childCat: any) => {
          return childCat.path?.includes(categoryItem.categoryPath);
        });

        return {
          categoryName: categoryItem.categoryName,
          totalProducts: innerCategories.length,
          imageUrl: innerCategories.length ? innerCategories[0].image : "",
        };
      }
    );

    filteredCategories = childCategories;
  }

  return (
    <div className="w-full container">
      <BreadcrumbComp pages={{ path: formatPathName }} />

      <Separator />

      <div className="grid grid-cols-12 gap-2">
        <div className="grid col-span-full grid-cols-1 mt-10 mx-auto  gap-x-2 gap-y-3 sm:gap-x-7 sm:gap-y-14 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center justify-center text-center">
          {filteredCategories?.length &&
            filteredCategories
              .filter((category: any) => category.imageUrl)
              .map(async (category: any, i: number, arr: any) => {
                return (
                  <div key={i}>
                    {category.imageUrl && (
                      <CategoryCard
                        link={
                          Number(start) == 0
                            ? `/shop/categories/${category.categoryName}?categoryName=${category.categoryName}&&start=1`
                            : `/shop/category/${category.categoryName}?keywords=${category.categoryName}`
                        }
                        categoryName={category.categoryName}
                        imageUrl={category.imageUrl}
                        totalProducts={category.totalProducts}
                      />
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Page;
