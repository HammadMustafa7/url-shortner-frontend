"use client";

import { SyntheticEvent, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Analytics = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [analytics, setAnalytics] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onGetAnalytics(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!inputUrl) {
      setError("URL not provided");
      return;
    }

    if (!BACKEND_URL) {
      setError("Backend URL not configured");
      return;
    }

    setLoading(true);
    const id = inputUrl.split("/").pop();
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/url/${id}/analytics`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message || `Request failed with status ${res.status}`,
        );
      }

      const data = await res.json();
      setAnalytics(data.totalClicks);
      setInputUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setAnalytics(null);
      setInputUrl("");
      setTimeout(() => setError(null), 10000);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col w-full items-start sm:items-center justify-center gap-4">
      <h2 className="text-start sm:text-center text-xl md:text-3xl font-semibold">
        Paste the (short) url to get analytics
      </h2>
      <form
        onSubmit={onGetAnalytics}
        className=" w-full flex flex-col items-end justify-center "
      >
        <input
          className="w-full max-w-full shadow-sm ring-0 outline-0 flex-1 py-2 px-1 text-base md:text-lg border-[#2B5748] border-2"
          type="url"
          value={inputUrl}
          required
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste https://short-en.thehammadmustafa.com/idlaBL4M"
        />
        <button
          className="bg-foreground text-background p-1 px-2 cursor-pointer hover:scale-x-110 transition-all duration-200 hover:mr-1.5"
          type="submit"
          disabled={loading}
        >
          {loading ? "Tracing..." : "Track Link"}
        </button>
      </form>
      {error && <p className="text-red-700">{error}</p>}
      {!!analytics && (
        <div className="flex justify-between items-start gap-2 border-2 w-full border-[#2B5748] pr-4">
          <p className=" p-1">Total Clicks: </p>
          <h5 className=" p-1">{analytics}</h5>
        </div>
      )}
    </div>
  );
};

export default Analytics;
