import { prisma } from "../../../../../lib/prisma";
import { getNow } from "../../../../../lib/time";

export async function GET(req, context) {

  const { id } = await context.params;

  if (!id) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = getNow(req);

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // TTL check
  if (paste.expiresAt && now > paste.expiresAt) {
    return Response.json({ error: "Expired" }, { status: 404 });
  }

  // View limit check
  if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
    return Response.json({ error: "View limit exceeded" }, { status: 404 });
  }

  // Increment view count
  const updated = await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  return Response.json({
    content: updated.content,
    remaining_views:
      updated.maxViews === null
        ? null
        : Math.max(updated.maxViews - updated.viewCount, 0),
    expires_at: updated.expiresAt,
  });
}
