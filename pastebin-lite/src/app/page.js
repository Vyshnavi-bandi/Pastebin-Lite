"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  async function createPaste() {
    setError(null);

    const body = {
      content,
    };

    // Add TTL only if user entered it
    if (ttl) {
      body.ttl_seconds = Number(ttl);
    }

    // Add max views only if user entered it
    if (maxViews) {
      body.max_views = Number(maxViews);
    }

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setUrl(data.url);
    setContent("");
    setTtl("");
    setMaxViews("");
  }

  return (
    <div className={styles.pastebin}>
      <h1>Pastebin-Lite</h1>

      <textarea
        placeholder="Enter paste content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
      />

      <input
        type="number"
        placeholder="TTL (seconds)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max views"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
      />

      <button onClick={createPaste}>Create Paste</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {url && (
        <p>
          Share Link:<br></br>
           <a href={url} target="_blank">{url}</a>
        </p>
      )}
    </div>
  );
}
