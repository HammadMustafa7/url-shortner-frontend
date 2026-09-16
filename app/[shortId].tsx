import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function ShortId({
  params,
}: Readonly<{
  params: Promise<{ shortId: string }>;
}>) {
  const { shortId } = await params;

  redirect(`${BACKEND_URL}/api/v1/url/${shortId}`);
}
