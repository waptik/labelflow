import { Box } from "@chakra-ui/react";
import { DropZone } from ".";
import { chakraDecorator } from "../../utils/chakra-decorator";

export default {
  title: `web/${DropZone.name}`,
  decorators: [chakraDecorator],
};

export const Default = () => <DropZone onDrop={alert} />;

export const CustomChildren = () => (
  <DropZone onDrop={alert}>
    <Box width="400px" height="150px" bg="#cc5555" />
  </DropZone>
);
