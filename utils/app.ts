import { KeyringPair } from "@polkadot/keyring/types";

const getAccountAddress = (account: KeyringPair) =>
  account ? account.address : "";

export { getAccountAddress };
