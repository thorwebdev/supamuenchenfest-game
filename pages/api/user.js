import * as uuid from "uuid";
import rateLimit from "../../utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req, res) {
  try {
    await limiter.check(res, 1_000_000_000, "NEW_CACHE_TOKEN"); // 10000 requests per minute

    const { q } = req.query;

    if (q?.toLowerCase().includes("plus")) {
      // what is 11 plus 17
      console.log(q);
      const parts = q.split(" ");
      const result = Number(parts[3]) + Number(parts[5]);
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (q?.toLowerCase().includes("largest")) {
      // what is 11 plus 17
      console.log(q);
      const parts = q.split(": ")[1].split(", ");
      const result = Math.max(...parts);
      console.log(result);
      return res.status(200).end(result.toString());
    }

    if (!q?.toLowerCase().includes("what is your name")) {
      console.log("q:", req.query.q);
      console.log("Method:", req.method);
      console.log("Body:", req.body);
      return res.status(200).end("Kopfsteinhammer");
    }

    res.status(200).end("Kopfsteinhammer");
  } catch (e) {
    console.log(e);
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
