import { kv } from "@vercel/kv";

export async function GET(_req, { params }) {
  const raw = await kv.get(`paste:${params.id}`);
  if (!raw) return new Response("Not found", { status: 404 });

  const { title, content } = JSON.parse(raw);
  return new Response(JSON.stringify({ title, content }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
