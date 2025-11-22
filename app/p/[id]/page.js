export default async function PastePage({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/api/paste/${params.id}`, { cache: "no-store" });
  if (!res.ok) return <div style={{ maxWidth: 640, margin: "2rem auto" }}><h1>Paste not found</h1></div>;
  const content = await res.text();
  return (
    <div style={{ maxWidth: 640, margin: "2rem auto" }}>
      <h1>Paste #{params.id}</h1>
      <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: 6, whiteSpace: "pre-wrap" }}>
        {content}
      </pre>
    </div>
  );
}
