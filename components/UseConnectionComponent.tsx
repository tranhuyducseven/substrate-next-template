import { useSubstrateConnection } from "ts-substrate-lib";

export const UseConnectionComponent: IComponent = ({ children }) => {
  const { substrateConnection } = useSubstrateConnection();
  console.log({ substrateConnection });
  return <div>{children}</div>;
};
