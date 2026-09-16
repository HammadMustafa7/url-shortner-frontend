import Analytics from "@/components/Analytics";
import ShortUrl from "@/components/ShortUrl";


export default function Home() {


  return (
    <main className="flex gap-4 md:gap-10 font-mono mx-auto flex-1 w-full md:max-w-2xl max-[768px]:p-4 flex-col items-center justify-center py-20  sm:items-start">
      <ShortUrl />
      <p className="w-full font-semibold text-start sm:text-center">
        Include <code>https://</code> at the start (e.g.,
        https://example.com/page)
      </p>
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
      <Analytics />
    </main>
  );
}
