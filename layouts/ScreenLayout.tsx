import DarkModeButton from "@components/DarkModeButton";
import { useAppStore } from "@states/app";
import Image from "next/image";
import Link from "next/link";

export const ScreenLayout: IComponent = ({ children }) => {
  const { darkMode } = useAppStore();
  return (
    <div className="w-full h-screen">
      <div className="py-8 px-4">
        <a className="cursor-pointer  p-3">
          <Link href="/">
            <Image
              className="hover:scale-105"
              src={`${darkMode === "dark" ? "/home-white.png" : "/home.png"}`}
              alt="/"
              width={28}
              height={28}
            />
          </Link>
        </a>
      </div>
      <DarkModeButton />
      <div className="">{children}</div>
    </div>
  );
};
