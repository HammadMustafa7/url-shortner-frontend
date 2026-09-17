import Analytics from "@/components/Analytics";
import ShortUrl from "@/components/ShortUrl";


export default function Home() {


  return (
    <main className="flex gap-4 md:gap-10 font-mono mx-auto flex-1 w-full md:max-w-2xl max-[768px]:p-4 flex-col items-center justify-center py-20  sm:items-start">
      <ShortUrl />
      <Analytics />
    </main>
  );
}
