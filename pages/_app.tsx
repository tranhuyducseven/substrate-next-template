import "@styles/globals.scss";

import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { PROVIDER_SOCKET } from "@env";
import { MainLayout } from "@layouts/MainLayout";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ISubstrateConfigs } from "ts-substrate-lib";

const SubstrateConnectionLayout = dynamic(
  () =>
    import("ts-substrate-lib").then((data) => data.SubstrateConnectionLayout),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-default flex items-center justify-center">
        <LoadingSVG width={72} height={72} />
      </div>
    ),
  }
);

const ThemeProvider = dynamic(() =>
  import("@material-tailwind/react/context/theme").then(
    (data) => data.ThemeProvider
  )
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
  const configs: ISubstrateConfigs = {
    providerSocket: PROVIDER_SOCKET,
  };

  return (
    <ThemeProvider value={undefined}>
      <SubstrateConnectionLayout configs={configs}>
        <MainLayout>{getLayout(<PageContent {...pageProps} />)}</MainLayout>
      </SubstrateConnectionLayout>
    </ThemeProvider>
  );
}

export default MyApp;
