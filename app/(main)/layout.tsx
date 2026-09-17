import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "ShortLink — Fast, Simple URL Shortener",
  description: "Shorten long URLs into short, shareable links in seconds.",
  keywords: ["url shortener", "short link", "link shortener"],
  authors: [{ name: "Hammad Mustafa" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
