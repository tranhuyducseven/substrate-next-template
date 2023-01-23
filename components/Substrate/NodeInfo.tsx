import { ComponentLoading } from "@components/ComponentLoading";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { SettingSVG } from "@components/SVGIcons/SettingSVG";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Text } from "@polkadot/types";
import { useEffect, useState } from "react";
import { useSubstrateConnection } from "ts-substrate-lib";

export const NodeInfo: IComponent<{
  className?: string;
}> = ({ className }) => {
  const { substrateConnection } = useSubstrateConnection();
  const { api, socket } = substrateConnection;
  const [nodeInfo, setNodeInfo] = useState<{
    chain?: Text;
    nodeName?: Text;
    nodeVersion?: Text;
  }>({});

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (api) {
          const [chain, nodeName, nodeVersion] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version(),
          ]);
          setNodeInfo({ chain, nodeName, nodeVersion });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
  }, [api?.rpc.system]);

  return api && api.rpc && api.rpc.system ? (
    <div>
      <Card
        className={className}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <CardBody
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="flex flex-col gap-2 px-0"
        >
          <Typography variant="h5">{nodeInfo.nodeName}</Typography>
          <Typography variant="h6" className="text-gray-600 dark:text-gray-400">
            {nodeInfo.chain}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-gray-700 dark:text-gray-300"
          >
            {socket}
          </Typography>
        </CardBody>
        <CardFooter
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          divider
          className="border-gray-400 px-0"
        >
          <Typography
            variant="small"
            className="text-gray-700 dark:text-gray-500 flex items-center gap-2"
          >
            <SettingSVG width={18} height={18} />
            {nodeInfo.nodeVersion}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <ComponentLoading />
    </div>
  );
};
