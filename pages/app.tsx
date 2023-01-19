import { ScreenLayout } from "@layouts/ScreenLayout";
import dynamic from "next/dynamic";

const AppScreen = dynamic(
  () => import("@screens/app").then((data) => data.AppScreen),
  {
    ssr: false,
  }
);

const App: IPageComponent = () => {
  return <AppScreen />;
};

App.getLayout = (screen) => <ScreenLayout>{screen}</ScreenLayout>;

export default App;
