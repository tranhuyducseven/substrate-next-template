import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { LoadingSVG } from "./SVGIcons/LoadingSVG";

const UseConnectionComponent = dynamic(
  () =>
    import("./UseConnectionComponent").then(
      (data) => data.UseConnectionComponent
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-default flex items-center justify-center">
        <LoadingSVG width={72} height={72} />
      </div>
    ),
  }
);
export const LoaderWrapper: IComponent = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <UseConnectionComponent>{children}</UseConnectionComponent>
      )}
      {isLoading && (
        <div className="w-full h-screen bg-default flex items-center justify-center">
          <LoadingSVG width={72} height={72} />
        </div>
      )}
    </>
  );
};
