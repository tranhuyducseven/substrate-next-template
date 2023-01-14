import { useAppStore } from "@states/app";
import Image from "next/image";
import { useRouter } from "next/router";

export const ShiftButton: IComponent<{
  route?: string;
}> = ({ route }) => {
  const router = useRouter();
  const { darkMode } = useAppStore();
  return (
    <div
      onClick={() => (route ? router.push(route) : router.push("/"))}
      className={`${
        darkMode === "dark" ? "animate-pulse" : ""
      } z-50 w-[400px]  bg-[#ffdd50] button-connect hover:scale-105 active:scale-90 duration-300 border-8 border-default dark:border-white px-8 pt-8 mt-5 rounded-lg  cursor-pointer`}
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
        <span
          style={{ letterSpacing: "6px" }}
          className="font-thin text-black text-lg pt-2"
        >
          CONNECT TO THE APP
        </span>
      </div>
    </div>
  );
};
