import {
  getCurrentMarketRate,
  getGeneralPercentage,
  getMarketForexRate,
} from "@/lib/server/amrodUtils/productsAndPrices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let markethubRate = await getCurrentMarketRate();
  let generalPricePercent = await getGeneralPercentage();
  let rates = await getMarketForexRate();
  return NextResponse.json({
    markethubRate: markethubRate,
    generalPricePercent: generalPricePercent,
    rates: rates,
  });
}
