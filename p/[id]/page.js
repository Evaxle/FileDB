// app/p/[id]/page.js
export default async function PastePage({ params }) {
  const { id } = params;

  // Fetch the paste content from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paste/${id}`, {
    cache: "no-store" // ensures fresh data
  });

  if (!res.ok) {
    return (
      <div>
        <h1>Paste not found</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  const content = await res.text();

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Paste #{id}</h1>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "1rem",
          borderRadius: "6px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word"
        }}
      >
        {content}
      </pre>
    </div>
  );
}
