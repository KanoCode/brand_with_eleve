import { NextResponse } from "next/server";

export async function GET(req: any) {
  const products = await fetch(
    `${process.env.MARKETHUB_NODE_URL}/products-with-prices/all_products`
  ).then((res) => res.json());

  const combinedProducts = products.data;

  return NextResponse.json(combinedProducts);
}
