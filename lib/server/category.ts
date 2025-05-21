import { ICategory } from "@/app/model";

export const getCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${process.env.AMROD_API_URL}/api/amrod/category`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to get categories");
  }
  return await res.json();
};
