import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export async function createCacheStorage(items: any[], key: string) {
  await redis.json.set(key, "$", []);
  let pipeline = redis.multi();

  for (let item of items) {
    await pipeline.json.arrappend(key, "$", item);
  }

  await pipeline.exec();
}
