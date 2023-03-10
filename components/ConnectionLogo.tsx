import { useAppStore } from "@states/app";
import Image from "next/image";
import { useRouter } from "next/router";

export const ConnectionLogo: IComponent<{
  route?: string;
  content?: string;
}> = ({ route, content }) => {
  const router = useRouter();
  const { darkMode } = useAppStore();
  return (
    <div
      onClick={() => (route ? router.push(route) : router.push("/"))}
      className={`${
        darkMode === "dark" ? "animate-pulse" : ""
      } z-50 w-[400px]  bg-primary button-connect hover:scale-105 active:scale-90 duration-300 border-8 border-default dark:border-white px-8 pt-8 mt-5 rounded-lg  cursor-pointer`}
      style={{ animationDuration: "4s" }}
    >
      <div className="pb-2">
        <Image
          src={`/mu.png`}
          alt="connect"
          width={300}
          height={300}
          layout="responsive"
        />
        <div
          style={{ letterSpacing: "6px" }}
          className="font-thin text-black text-lg pt-2 text-center"
        >
          {content ?? "CONNECT TO THE APP"}
        </div>
      </div>
    </div>
  );
};
