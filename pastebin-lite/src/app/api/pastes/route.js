import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { content, ttl_seconds, max_views } = body;

  // Validation
  if (!content || typeof content !== "string" || content.trim() === "") {
    return Response.json({ error: "Content is required" }, { status: 400 });
  }

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return Response.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
    return Response.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await prisma.paste.create({
    data: {
      content,
      expiresAt,
      maxViews: max_views ?? null,
    },
  });

  const origin = req.headers.get("origin");

  return Response.json({
    id: paste.id,
    url: `${origin}/p/${paste.id}`,
  });
}
