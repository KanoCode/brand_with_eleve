import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface Price {
  simplecode: string;
  fullCode: string;
  price: number;
}

export async function GET(req: any) {
  const token = headers().get("authorization");
  const res = await fetch(`${process.env.AMROD_API_URL}/api/v1/Products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // next: {
    //   revalidate: 60,
    // },
  });

  const res2 = await fetch(`${process.env.AMROD_API_URL}/api/v1/Prices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res2.ok) {
    throw new Error(res.statusText);
  }

  let prices: Price[] = await res2.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const products = await res.json();

  let result: Record<string, any> = {};

  prices.forEach(({ simplecode, fullCode, price }) => {
    if (!result[simplecode]) {
      result[simplecode] = { principle: price };
    }
    if (!result[simplecode][fullCode]) {
      result[simplecode][fullCode] = price;
    } else {
      result[simplecode] = {
        ...result[simplecode],
        [fullCode]: [...result[simplecode][fullCode], price],
      };
    }
  });

  const combinedProducts = products.map((product: any) => {
    let price = "";
    // (result[product.simpleCode]?.principle);
    if (result[product.simpleCode]) {
      price = result[product.simpleCode]?.principle;
      return {
        ...product,
        price,
      };
    } else {
      let shortSimplerCode = product.simpleCode
        .split("-")
        .slice(0, 2)
        .join("-");

      price = result[shortSimplerCode]?.principle;
      return {
        ...product,
        price,
      };
    }
  });

  console.log(req.url);

  return NextResponse.json(combinedProducts);
}
