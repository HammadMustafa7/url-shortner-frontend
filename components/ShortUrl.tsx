"use client";

import { useState, SyntheticEvent } from "react";
import { Copy, Check } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const ShortUrl = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (!shortUrl) return;
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  async function onSubmitShortenUrl(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setShortUrl(null);

    if (!inputUrl) {
      setError("URL not provided");
      return;
    }

    if (!BACKEND_URL) {
      setError("Backend URL not configured");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message || `Request failed with status ${res.status}`,
        );
      }

      const data = await res.json();
      setShortUrl(`${FRONTEND_URL}/${data.shortId}`); // adjust key to match your API's response shape
      setInputUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setTimeout(() => setShortUrl(null), 60000);
    }
  }
  return (
    <div className="flex flex-col w-full items-start sm:items-center justify-center gap-4">
      <h2 className="text-start sm:text-center text-xl md:text-3xl font-semibold">
        Paste the (long) url to be shortened
      </h2>
      <div className="flex flex-col items-start sm:items-center w-full font-semibold text-lg ">
        <p>
          Enter your link and click{" "}
          <span className="italic">Short-en Link</span>
        </p>
        <div className="flex flex-col space-y-2 sm:flex-row space-x-4 text-sm font-normal mt-2 text-gray-600">
          <p>✨ Easy to use</p>
          <p>📊 Track clicks</p>
          <p>🔒 Secure</p>
        </div>
      </div>
      <form
        onSubmit={onSubmitShortenUrl}
        className=" w-full flex flex-col items-end justify-center "
      >
        <input
          className="w-full  max-w-full shadow-sm ring-0 outline-0 flex-1 py-2 px-1 text-base md:text-lg border-[#2B5748] border-2"
          type="url"
          required
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste (https://www.thehammadmustafa.com)"
        />
        <button
          className="bg-foreground text-background p-1 px-2 cursor-pointer hover:scale-x-110 transition-all duration-200 hover:mr-1.5"
          type="submit"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Short-en Link"}
        </button>
      </form>
      {error && <p className="text-red-700">{error}</p>}
      {shortUrl && (
        <div className="flex justify-between items-center gap-2 divide-x-2 border-2 w-full border-[#2B5748] divide-[#2B5748]">
          <p className="w-full p-1">
            Your short link:{" "}
            <button
              type="button"
              onClick={handleCopy}
              className="font-semibold"
            >
              {shortUrl}
            </button>{" "}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            className="flex items-center gap-1 cursor-pointer p-1 hover:scale-105 transition-all duration-100"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <p className="w-full font-semibold text-start sm:text-center">
        Include <code>https://</code> at the start (e.g.,
        https://example.com/page)
      </p>
    </div>
  );
};

export default ShortUrl;
