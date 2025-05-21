import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch(
    `https://api.getgeoapi.com/v2/currency/convert?api_key=9f27beb52c6fa0913c38e18caa426c21534d8704&from=ZAR&to=USD&amount=1&format=json`,
    {
      method: "GET",
      next: {
        revalidate: 800,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to Get current currency");
  }

  const data = await res.json();

  return NextResponse.json(data);
}
