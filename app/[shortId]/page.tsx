import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}): Promise<Metadata> {
  const { shortId } = await params;

  return {
    title: `Redirecting — ${shortId}`,
    robots: { index: false, follow: false },
  };
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function ShortId({
  params,
}: Readonly<{
  params: Promise<{ shortId: string }>;
}>) {
  const { shortId } = await params;

  const res = await fetch(`${BACKEND_URL}/api/v1/url/${shortId}`, {
    redirect: "manual",
    next: { tags: [`shortlink-${shortId}`], revalidate: 604800 },
  });

  const location = res.headers.get("location");

  if (!location) {
    notFound();
  }

  redirect(location);
}
