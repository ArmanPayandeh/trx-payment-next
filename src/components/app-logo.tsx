import { APP_ROUTES } from "@/app/config/routes";
import Image from "next/image";
import Link from "next/link";
import Logo from "~/logo.png";

export const AppLogo = () => {
  return (
    <Link href={APP_ROUTES.home}>
      <Image src={Logo} alt="logo" className="h-10 w-auto" />
    </Link>
  );
};
