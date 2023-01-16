import { TemplateComponent } from "@components/_template";
import AnimationBox from "@components/AnimationBox";
import { ConnectionLogo } from "@components/ConnectionLogo";
import { APP_NAME } from "@env";
import { useAppStore } from "@states/app";
import { cx } from "@utils/tools";

export const HomeScreen: IComponent = () => {
  const { darkMode } = useAppStore();

  return (
    <div className={cx("p-40  relative h-screen py-0 px-8")}>
      <main className="relative z-20 flex flex-col justify-center items-center py-16 px-0">
        <div className="m-0 leading-normal text-[4rem] text-center">
          <TemplateComponent
            text="Welcome to"
            color={darkMode === "dark" ? "white" : "black"}
          />
          <h1>{APP_NAME}</h1>
        </div>
        <ConnectionLogo route="/app" />
      </main>

      {darkMode === "dark" ? <AnimationBox /> : null}
    </div>
  );
};
