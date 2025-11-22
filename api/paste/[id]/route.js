export async function GET(req, { params }) {
  const content = await kv.get(`paste:${params.id}`);
  if (!content) return new Response("Not found", { status: 404 });
  return new Response(content, { status: 200 });
}
