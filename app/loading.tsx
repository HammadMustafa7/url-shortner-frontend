import Image from 'next/image'

const loading = () => {
  return (
    <div className="flex mx-auto flex-1">
      <Image
              src="link.svg"
              alt="Link Image"
              width={70}
              height={70}
              className="animate-spin"
            />
    </div>
  );
}

export default loading
