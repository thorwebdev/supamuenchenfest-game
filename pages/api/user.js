import * as uuid from "uuid";
import rateLimit from "../../utils/rate-limit";
import { facts } from "../../utils/queryParser";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req, res) {
  try {
    await limiter.check(res, 1_000_000_000, "NEW_CACHE_TOKEN"); // 10000 requests per minute

    const { q } = req.query;

    if (q?.toLowerCase().includes("primes")) {
      const isPrime = (num) => {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++)
          if (num % i === 0) return false;
        return num > 1;
      };
      // 0069bcb0: which of the following numbers are primes: 421, 572
      console.log(q);
      const parts = q
        .split(": ")[2]
        .split(", ")
        .map((n) => Number(n))
        .filter((n) => isPrime(n));
      const result = parts[0];
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (q?.toLowerCase().includes("plus")) {
      // what is 11 plus 17
      console.log(q);
      const parts = q.split(" ");
      const result = Number(parts[3]) + Number(parts[5]);
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (q?.toLowerCase().includes("minus")) {
      // what is 11 plus 17
      console.log(q);
      const parts = q.split(" ");
      const result = Number(parts[3]) - Number(parts[5]);
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (q?.toLowerCase().includes("power")) {
      // q: what is 7 to the power of 18
      console.log(q);
      const parts = q.split(" ");
      const result = Math.pow(Number(parts[3]), Number(parts[8]));
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (q?.toLowerCase().includes("multiplied")) {
      // what is 11 plus 17
      console.log(q);
      const parts = q.split(" ");
      const result = Number(parts[3]) * Number(parts[6]);
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (q?.toLowerCase().includes("largest")) {
      // what is 11 plus 17
      console.log(q);
      const parts = q
        .split(": ")[2]
        .split(", ")
        .map((n) => Number(n));
      const result = Math.max(...parts);
      console.log(result);
      return res.status(200).end(result.toString());
    }

    // which of the following numbers is both a square and a cube: 961, 845, 4, 499
    if (q?.toLowerCase().includes("both a square and a cube")) {
      console.log(q);
      const parts = q
        .split(": ")[2]
        .split(", ")
        .map((x) => Number(x))
        // is a square
        .filter((x) => {
          const sqrt = Math.sqrt(x);
          return sqrt % 1 === 0;
        })
        // is a cube
        .filter((x) => {
          const cube = Math.cbrt(x);
          return cube % 1 === 0;
        });
      const result = parts[0];
      return res.status(200).end(result?.toString());
    }

    // if (!q?.toLowerCase().includes("what is your name")) {
    //   console.log("q:", req.query.q);
    //   console.log("Method:", req.method);
    //   console.log("Body:", req.body);
    //   return res.status(200).end("Kopfsteinhammer");
    // }

    // Unknow -> fact check
    return res.status(200).end(facts(req));
  } catch (e) {
    console.log(e);
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
