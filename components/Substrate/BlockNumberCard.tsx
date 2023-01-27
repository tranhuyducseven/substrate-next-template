import { ComponentLoading } from "@components/ComponentLoading";
import { ClockSVG } from "@components/SVGIcons/ClockSVG";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSubstrateConnection } from "ts-substrate-lib";

export const BlockNumberCard: IComponent<{
  finalized?: boolean;
  className?: string;
}> = ({ finalized, className }) => {
  const { substrateConnection } = useSubstrateConnection();
  const { api } = substrateConnection;
  const [blockNumber, setBlockNumber] = useState(0);
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  const bestNumber = finalized
    ? api?.derive.chain.bestNumberFinalized
    : api?.derive.chain.bestNumber;

  useEffect(() => {
    let unSubscribeAll: any = null;

    bestNumber?.((number) => {
      // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
      setBlockNumber(number.toNumber());
      setBlockNumberTimer(0);
    })
      .then((unSub) => {
        unSubscribeAll = unSub;
      })
      .catch(console.error);

    return () => unSubscribeAll && unSubscribeAll();
  }, [bestNumber]);

  const timer = () => {
    setBlockNumberTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  return api && api.derive && api.derive.chain ? (
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
          className="flex flex-col justify-center gap-2 px-0 grow "
        >
          <Typography variant="h2" className="text-center">
            {blockNumber.toLocaleString("en-US")}
          </Typography>
          <Typography
            variant="h5"
            className="text-gray-600 dark:text-gray-400 text-center"
          >
            {(finalized ? "FINALIZED" : "CURRENT") + " BLOCK"}
          </Typography>
        </CardBody>
        <CardFooter
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          divider
          className="border-gray-400 px-0 flex gap-2 items-center text-gray-700 dark:text-gray-500"
        >
          <ClockSVG width={18} height={18} />
          {blockNumberTimer}
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <ComponentLoading />
    </div>
  );
};
