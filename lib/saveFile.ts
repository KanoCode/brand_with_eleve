import { promises as fs } from "fs";

import { sanitizeProductDataForSearchIndexing } from "./utils";
import { redisClient } from "./redis/RedisClient2";

interface IncomingStockItem {
  total: number;
  date: string; // or Date if you'll parse the string into Date objects
}

interface StockDataItem {
  simpleCode: string;
  fullCode: string;
  stockType: number;
  colourCode: string | null;
  stock: number;
  reservedStock: number;
  incomingStock: IncomingStockItem[];
  modifiedDate: string; // or Date if you'll parse the string into Date objects
}

interface StockDataResponse {
  stockData: StockDataItem[];
}



async function saveStockCache(stock: StockDataResponse[], productCode: string) {
  await redisClient.setex("public/stock.json", 3600 * 24, Date.now());

  try {
    let checkIfCachedStock = await redisClient.exists(`${productCode}-stock`);

    if (Boolean(checkIfCachedStock)) {
      console.log(
        "Data was already successfully fetched and saved to stock.json"
      );
    } else {
  
      await redisClient.setex(
        `${productCode}-stock`,
        3600 * 24,
        JSON.stringify(stock)
      );
      console.log("Data successfully fetched and saved to stock.json");
    }
  } catch (error) {
    console.error("Error writing stocks to file", error);
  }
}

async function readStockFromJSONFile() {
  const file = await fs.readFile(process.cwd() + `/public/stock.json`, "utf8");
  const data = JSON.parse(file);

  return data;
}
export {
  readStockFromJSONFile,
  saveStockCache,
};
