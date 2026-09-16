'use client';
import Image from "next/image";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto flex-1 gap-5">
      <Image
        src="link.svg"
        alt="Link Image"
        width={70}
        height={70}
        className="animate-spin"
      />
      <h2 className="text-xl font-mono">URL Not Found!</h2>
    </div>
  );
};

export default ErrorPage;
