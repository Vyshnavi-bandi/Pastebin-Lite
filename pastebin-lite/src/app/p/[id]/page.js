import { prisma } from "../../../../lib/prisma";

export default async function PastePage({ params }) {
  // 👇 IMPORTANT: params is async in Next 15
  const { id } = await params;

  if (!id) {
    return <h1>404 - Not Found</h1>;
  }

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return <h1>404 - Not Found</h1>;
  }

  if (paste.expiresAt && new Date() > paste.expiresAt) {
    return <h1>404 - Expired</h1>;
  }

  if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
    return <h1>404 - View limit exceeded</h1>;
  }

  await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  return <pre>{paste.content}</pre>;
}
