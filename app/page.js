"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    setUrl(data.url || "Error creating paste");
  }

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>FileDB Paste</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste text here..."
          style={{ width: "100%", height: 200, marginBottom: "1rem" }}
        />
        <button type="submit">Create paste</button>
      </form>
      {url && <p>Share URL: <a href={url}>{url}</a></p>}
    </div>
  );
}
