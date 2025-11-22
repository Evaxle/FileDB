import redis from "../../../lib/redis.js";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { content, title } = await req.json();
    if (!content) {
      return new Response(JSON.stringify({ error: "Missing content" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = uuidv4();
    await redis.set(`paste:${id}`, JSON.stringify({ title, content }));

    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    return new Response(JSON.stringify({ url: `${base}/p/${id}` }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error creating paste:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}