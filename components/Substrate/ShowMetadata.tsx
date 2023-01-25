import { CopyToClipboard } from "@components/CopyToClipboard";
import { ClipBoardSVG } from "@components/SVGIcons/ClipBoardSVG";
import { CloseButtonSVG } from "@components/SVGIcons/CloseButtonSVG";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { Metadata } from "@polkadot/types";
import { prettyPrint } from "@utils/tools";
import { useState } from "react";

export const ShowMetadata: IComponent<{
  content: Metadata;
}> = ({ content }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Button
        onClick={handleOpen}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        className="bg-primary text-black"
      >
        Show Metadata
      </Button>
      {open && (
        <div className="fixed left-0 top-0 w-full h-full bg-default bg-opacity-60 p-32 z-50 flex justify-center">
          <div className="dialog w-3/4 relative bg-white shadow-2xl text-blue-gray-500 antialiased font-sans text-base font-light leading-relaxed rounded-xl flex flex-col p-4">
            <div className="control-button flex absolute right-2 top-2 gap-2">
              <CopyToClipboard text={JSON.stringify(content, null, 4)}>
                <Tooltip
                  content="Copy metadata to clipboard"
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                >
                  <div className="cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-500 hover:scale-105  flex">
                    <ClipBoardSVG
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                </Tooltip>
              </CopyToClipboard>

              <div
                className="cursor-pointer rounded-lg bg-red-700 hover:bg-gray-500 hover:scale-105 duration-200 flex"
                onClick={handleOpen}
              >
                <CloseButtonSVG width={24} height={24} className="text-white" />
              </div>
            </div>
            <Typography
              variant="h3"
              color="gray"
              className="py-0 border-gray-400 border-b"
            >
              Runtime Metadata
            </Typography>
            <pre
              className="py-2 w-full h-full grow overflow-scroll"
              dangerouslySetInnerHTML={{ __html: prettyPrint(content) }}
            ></pre>
          </div>
        </div>
      )}
    </div>
  );
};
