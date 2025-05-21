import { Redis } from "ioredis";
// localhost
// const redisClient = new Redis(
//   "rediss://default:AdDQAAIjcDEwZmFkYjg5ZDIyMTk0MzM4OTNlZjcwNjcyY2NmZDFkMXAxMA@fitting-cheetah-53456.upstash.io:6379"
// );

// production server
const redisClient = new Redis(
  "rediss://default:AcmhAAIjcDEzM2M2YjkyOTM0Mjg0MDhjYmVlMzZhODc1NzA0MDE4Y3AxMA@witty-lemming-51617.upstash.io:6379"
);

export { redisClient };
