import { useSubstrateConnection } from "ts-substrate-lib";

export const AppScreen: IComponent = () => {
  const { substrateConnection } = useSubstrateConnection();
  return <div>Hello world</div>;
};
