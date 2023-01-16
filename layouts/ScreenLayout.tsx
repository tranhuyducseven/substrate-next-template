import DarkModeButton from "@components/DarkModeButton";
import { HomeSVG } from "@components/SVGIcons/HomeSVG";
import { useRouter } from "next/router";

export const ScreenLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return (
    <div className="w-full h-screen">
      <div className="py-8 px-8" onClick={() => router.push("/")}>
        <HomeSVG
          className="cursor-pointer hover:scale-105 duration-150  dark:text-green-400"
          width={28}
          height={28}
        />
      </div>
      <DarkModeButton />
      <div className="">{children}</div>
    </div>
  );
};
