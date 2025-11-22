import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const { content } = await req.json();
  const id = uuidv4();

  // Save to Vercel KV (or Postgres/Blob)
  await kv.set(`paste:${id}`, content);

  return new Response(JSON.stringify({ url: `/p/${id}` }), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}