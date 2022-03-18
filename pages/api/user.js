import * as uuid from "uuid";
import rateLimit from "../../utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req, res) {
  try {
    await limiter.check(res, 10000, "CACHE_TOKEN"); // 10000 requests per minute

    const { q } = req.query;

    if (q.toLowerCase().contains("what is your name")) {
      console.log("q:", req.query.q);
      console.log("Method:", req.method);
      console.log("Body:", req.body);
    }

    res.status(200).end("Kopfsteinhammer");
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
