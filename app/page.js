"use client";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setUrl("");

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setUrl(data.url);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>FileDB Pastebin</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Paste title"
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste content..."
          style={{ width: "100%", height: 200, padding: "0.5rem", fontFamily: "monospace" }}
        />
        <button type="submit" style={{ padding: "0.75rem", fontSize: "1rem", cursor: "pointer" }}>
          Create Paste
        </button>
      </form>
      {url && <p>Paste created: <a href={url}>{url}</a></p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
    </div>
  );
}