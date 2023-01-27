import { AlertTemplate } from "@components/AlertTemplate";
import { AccountSelector } from "@components/Substrate/AccountSelector";
import { BlockNumberCard } from "@components/Substrate/BlockNumberCard";
import { MetadataCard } from "@components/Substrate/MetadataCard";
import { NodeCard } from "@components/Substrate/NodeCard";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { card } from "@configs/styles";
import { useCallback } from "react";
import { API_STATES, useSubstrateConnection } from "ts-substrate-lib";

export const AppScreen: IComponent = () => {
  const { substrateConnection } = useSubstrateConnection();
  const { apiState, apiError, keyringState } = substrateConnection;

  const errorMessages = useCallback((errObj: any) => {
    return (
      <div className="h-full py-8 flex justify-center items-start">
        <AlertTemplate
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj?.target?.url}' failed.`}
          className="w-fit h-fit text-lg text-red-700 bg-red-100  dark:bg-red-700 dark:text-white"
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

  return (
    <main>
      <div className="relative">
        <AccountSelector className="absolute bottom-6 right-0 left-0 flex justify-center" />
      </div>
      <div id="container" className="grid grid-cols-4 gap-4 mx-40">
        <NodeCard className={card} />
        <MetadataCard className={card} />
        <BlockNumberCard className={card} />
        <BlockNumberCard className={card} finalized />
      </div>
    </main>
  );
};
