import "@styles/globals.scss";

import { MainLayout } from "@layouts/MainLayout";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const SubstrateContextProvider = dynamic(
  () =>
    import("ts-substrate-lib").then((data) => data.SubstrateContextProvider),
  {
    ssr: false,
  }
);
/**
 * Default layout for page component
 */
const DefaultLayout: IComponent = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as IPageComponent).getLayout ||
    ((children) => <DefaultLayout>{children}</DefaultLayout>);

  const PageContent = Component as IPageComponent;

  return (
    <SubstrateContextProvider>
      <MainLayout>{getLayout(<PageContent {...pageProps} />)}</MainLayout>
    </SubstrateContextProvider>
  );
}

export default MyApp;
