import Image from "next/image";
import Link from "next/link";

export const JamsrworldLogo = () => {
  return (
    <Link href="https://tesleum.com" target="_blank">
      <Image
        src="https://tesleum.com/tesleum_dark.svg"
        alt="Tesleum"
        height={40}
        width={200}
      />
    </Link>
  );
};
