export default async function PastePage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paste/${params.id}`, {
    cache: "no-store"
  });
  if (!res.ok) return <div><h1>Paste not found</h1></div>;

  const { title, content } = await res.json();

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>{title || `Paste #${params.id}`}</h1>
      <pre style={{
        background: "#f4f4f4",
        padding: "1rem",
        borderRadius: 6,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      }}>
        {content}
      </pre>
    </div>
  );
}