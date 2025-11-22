import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const { content } = await req.json();
  if (!content || typeof content !== "string") {
    return new Response(JSON.stringify({ error: "Missing content" }), { status: 400 });
  }
  const id = uuidv4();
  await kv.set(`paste:${id}`, content);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://filedb-kappa.vercel.app";
  const url = `${base}/p/${id}`;

  return new Response(JSON.stringify({ id, url }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
}
