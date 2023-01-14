import { DefaultLayout } from "@layouts/DefaultLayout";
import { HomeScreen } from "@screens/home";

const Home: IPageComponent = () => {
  return <HomeScreen />;
};

Home.getLayout = (screen) => <DefaultLayout>{screen}</DefaultLayout>;

export default Home;
