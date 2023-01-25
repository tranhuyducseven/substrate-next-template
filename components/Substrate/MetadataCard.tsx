import { ComponentLoading } from "@components/ComponentLoading";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Metadata } from "@polkadot/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSubstrateConnection } from "ts-substrate-lib";

const ShowMetadata = dynamic(
  () => import("./ShowMetadata").then((data) => data.ShowMetadata),
  {
    loading: () => <LoadingSVG width={72} height={72} />,
  }
);

export const MetadataCard: IComponent<{ className?: string }> = ({
  className,
}) => {
  const { substrateConnection } = useSubstrateConnection();
  const { api } = substrateConnection;
  const [metadata, setMetadata] = useState<{
    data?: Metadata;
    version?: number;
  }>({});

  useEffect(() => {
    const getMetadata = async () => {
      try {
        if (api) {
          const data = await api.rpc.state.getMetadata();
          setMetadata({ data, version: data.version });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getMetadata();
  }, [api?.rpc.state]);

  return api && api.rpc && api.rpc.state ? (
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
          className="flex flex-col gap-2 px-0 grow"
        >
          <Typography variant="h5">Metadata</Typography>
          <Typography variant="h6" className="text-gray-600 dark:text-gray-400">
            v{metadata.version}
          </Typography>
        </CardBody>
        <CardFooter
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          divider
          className="border-gray-400 px-0"
        >
          {metadata?.data && <ShowMetadata content={metadata.data} />}
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <ComponentLoading />
    </div>
  );
};
