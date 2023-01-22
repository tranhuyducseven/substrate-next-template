import { AlertTemplate } from "@components/AlertTemplate";
import { ComponentLoading } from "@components/ComponentLoading";
import { CopyToClipboard } from "@components/CopyToClipboard";
import { FilterSelection, ISelectionProps } from "@components/FilterSelection";
import { UserSVG } from "@components/SVGIcons/UserSVG";
import { CHROME_EXT_URL, FIREFOX_ADDON_URL } from "@constants/app";
import { Tooltip } from "@material-tailwind/react";
import { useAppStore } from "@states/app";
import { getAccountAddress } from "@utils/app";
import { useEffect, useState } from "react";
import { useSubstrateConnection } from "ts-substrate-lib";

import { BalanceAnnotation } from "./BalanceAnnotation";

export const AccountSelector: IComponent<{
  className?: string;
}> = ({ className }) => {
  const { darkMode } = useAppStore();
  const { substrateConnection, setCurrentAccount } = useSubstrateConnection();
  const { keyring, api, currentAccount } = substrateConnection;
  const [isHidden, setHidden] = useState(false);

  const keyringOptions = keyring?.getPairs().map((account: any) => ({
    key: account.address,
    value: account.address,
    text: account?.meta?.name.toUpperCase(),
  }));

  const initialAddress =
    keyringOptions && keyringOptions.length > 0 ? keyringOptions[0].value : "";

  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    if (!currentAccount && initialAddress.length > 0 && keyring)
      setCurrentAccount(keyring.getPair(initialAddress));
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  if (!keyring?.getPairs || !api?.query) return <ComponentLoading />;
  return (
    <div className={className}>
      {!currentAccount ? (
        <div>
          <div>
            Create an account with Polkadot-JS Extension (
            <a target="_blank" rel="noreferrer" href={CHROME_EXT_URL}>
              Chrome
            </a>
            ,&nbsp;
            <a target="_blank" rel="noreferrer" href={FIREFOX_ADDON_URL}>
              Firefox
            </a>
            )&nbsp;
          </div>
        </div>
      ) : null}
      {currentAccount ? (
        <div className="flex gap-4">
          <CopyToClipboard text={getAccountAddress(currentAccount)}>
            <Tooltip
              content="Copy address to clipboard"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <div>
                <UserSVG
                  className="cursor-pointer hover:scale-105 duration-150 border border-black dark:border-white rounded-full p-1 hover:shadow hover:shadow-white "
                  color={`${darkMode === "dark" ? "white" : "black"}`}
                  width={28}
                  height={28}
                ></UserSVG>
              </div>
            </Tooltip>
          </CopyToClipboard>
          <FilterSelection
            label="Select an account"
            className="text-gray-800 dark:text-white p-2"
            selections={keyringOptions as ISelectionProps[]}
            onSelect={(v) => {
              setHidden((prev) => (!prev ? true : prev));
              setCurrentAccount(keyring.getPair(v));
            }}
          />
          {isHidden && <BalanceAnnotation />}
        </div>
      ) : (
        <AlertTemplate
          content="No account"
          className="w-fit h-fit text-lg bg-amber-600"
        />
      )}
    </div>
  );
};
