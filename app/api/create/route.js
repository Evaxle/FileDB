import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { content, title } = await req.json();

    if (!content || typeof content !== "string") {
      return new Response(JSON.stringify({ error: "Missing content" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = uuidv4();
    // Save both title and content
    await kv.set(`paste:${id}`, JSON.stringify({ title, content }));

    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://filedb-kappa.vercel.app";
    const url = `${base}/p/${id}`;

    return new Response(JSON.stringify({ id, url }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
