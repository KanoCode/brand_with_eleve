import { headers } from "next/headers";
import ProductsNavSuspense from "./CategoriesRenderer";

export async function getCategories() {
  const token = headers().get("authorization");

  const res = await fetch(`${process.env.MARKETHUB_NODE_URL}/categories`, {
    method: "GET",
   

    next: { revalidate: 24 * 7 * 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to Get categories");
  }
  const data = await res.json();

  return data;
}

async function ProductNav() {
  let allCategories = await getCategories();
  return (
    <nav className="hidden lg:flex px-24 max-h-14 justify-between bg-[rgb(221,40,45)]">
      <ProductsNavSuspense categoriesFetched={allCategories} />
    </nav>
  );
}

export default ProductNav;

