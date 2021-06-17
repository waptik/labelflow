import { useContext } from "react";
import { IconButton } from "@chakra-ui/react";
import { useLabellingStore } from "../../../connectors/labelling-state";
import { LabellingContext } from "../labelling-context";

export const RightToolbar = () => {
  const { zoomByDelta, zoomFactor } = useContext(LabellingContext);
  const canZoomIn = useLabellingStore((state) => state.canZoomIn);
  const canZoomOut = useLabellingStore((state) => state.canZoomOut);

  return (
    <>
      <IconButton
        icon={<span>-</span>}
        backgroundColor="white"
        aria-label="Zoom out"
        pointerEvents="initial"
        isDisabled={!canZoomOut}
        onClick={() => {
          zoomByDelta(-zoomFactor);
        }}
      />
      <IconButton
        icon={<span>+</span>}
        backgroundColor="white"
        aria-label="Zoom in"
        pointerEvents="initial"
        isDisabled={!canZoomIn}
        onClick={() => {
          zoomByDelta(zoomFactor);
        }}
      />
    </>
  );
};
