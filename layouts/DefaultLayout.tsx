import DarkModeButton from "@components/DarkModeButton";

export const DefaultLayout: IComponent = ({ children }) => {
  return (
    <div className="w-full h-screen relative">
      <DarkModeButton />
      <>{children}</>
    </div>
  );
};
