import { ScreenLayout } from "@layouts/ScreenLayout";
import { AppScreen } from "@screens/app";

const App: IPageComponent = () => {
  return <AppScreen />;
};

App.getLayout = (screen) => <ScreenLayout>{screen}</ScreenLayout>;

export default App;
