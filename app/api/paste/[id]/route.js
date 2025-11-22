import redis from "../../../../lib/redis.js";

export async function GET(_req, { params }) {
  try {
    const raw = await redis.get(`paste:${params.id}`);
    if (!raw) return new Response("Not found", { status: 404 });

    const { title, content } = JSON.parse(raw);
    return new Response(JSON.stringify({ title, content }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error fetching paste:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}