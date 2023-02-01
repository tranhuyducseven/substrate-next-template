import { ComponentLoading } from "@components/ComponentLoading";
import { ScreenLayout } from "@layouts/ScreenLayout";
import dynamic from "next/dynamic";

const AppScreen = dynamic(
  () => import("@screens/app").then((data) => data.AppScreen),
  {
    ssr: false,
    loading: () => <div className="h-screen"></div>,
  }
);

const App: IPageComponent = () => {
  return <AppScreen />;
};

App.getLayout = (screen) => <ScreenLayout>{screen}</ScreenLayout>;

export default App;
