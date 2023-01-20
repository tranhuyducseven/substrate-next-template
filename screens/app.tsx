import { AlertTemplate } from "@components/AlertTemplate";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { useCallback } from "react";
import { API_STATES, useSubstrateConnection } from "ts-substrate-lib";

export const AppScreen: IComponent = () => {
  const { substrateConnection } = useSubstrateConnection();
  const { apiState, apiError, keyringState } = substrateConnection;

  const errorMessages = useCallback((errObj) => {
    return (
      <div className="h-full py-8 flex justify-center items-start">
        <AlertTemplate
          type="Info"
          header="Error Connecting to Substrate"
          content={[`Connection to websocket '${errObj?.target?.url}' failed.`]}
        />
      </div>
    );
  }, []);

  const loadingMessages = useCallback((msg: string) => {
    return (
      <div className="h-full flex items-center justify-center pb-20 gap-x-4">
        <LoadingSVG width={40} height={40} />
        <div className="text-xl font-semibold">{msg}, please wait...</div>
      </div>
    );
  }, []);

  if (apiState === API_STATES.ERROR) {
    return errorMessages(apiError);
  } else if (apiState !== API_STATES.READY) {
    return loadingMessages("Connecting to Substrate");
  }

  if (keyringState !== "READY") {
    return loadingMessages(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  return <div>Hello world</div>;
};
