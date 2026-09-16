export default function Footer() {
  return (
    <nav className="flex flex-col items-center justify-center py-2 bg-foreground text-background">
      <h1 className="text-xl font-semibold font-mono">
        &copy; 2026 Short-en Link
      </h1>
      <a
        href="https://thehammadmustafa.com/"
        target="_blank"
        className="text-xl font-medium font-mono hover:underline"
      >
        thehammadmustafa.com{" "}
      </a>
    </nav>
  );
}
