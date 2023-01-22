import { CoinSVG } from "@components/SVGIcons/CoinSVG";
import { useAppStore } from "@states/app";
import { getAccountAddress } from "@utils/app";
import { useEffect, useState } from "react";
import { useSubstrateConnection } from "ts-substrate-lib";

export const BalanceAnnotation: IComponent = () => {
  const { darkMode } = useAppStore();
  const { substrateConnection } = useSubstrateConnection();
  const { api, currentAccount } = substrateConnection;
  const [accountBalance, setAccountBalance] = useState(0);

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe: any = null;

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api &&
      api.query.system
        .account(getAccountAddress(currentAccount), (balance: any) =>
          setAccountBalance(balance.data.free.toHuman())
        )
        .then((unSub) => (unsubscribe = unSub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount]);

  return currentAccount ? (
    <div className="w-[220px] flex items-center gap-2 text-sm font-bold dark:text-black bg-gray-300 p-2 rounded-lg">
      <div className="grow text-right">{accountBalance}</div>
      <CoinSVG
        color={darkMode === "dark" ? "#ff005e" : "#000"}
        width={24}
        height={24}
      />
    </div>
  ) : null;
};
