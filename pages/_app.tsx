import "@styles/globals.scss";

import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { MainLayout } from "@layouts/MainLayout";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

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
    <SubstrateConnectionLayout>
      <MainLayout>{getLayout(<PageContent {...pageProps} />)}</MainLayout>
    </SubstrateConnectionLayout>
  );
}

export default MyApp;
