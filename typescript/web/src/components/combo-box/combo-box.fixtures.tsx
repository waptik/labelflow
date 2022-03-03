import { HStack, Text } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { Tools } from "../../connectors/labeling-state";
import { AppIcon, getToolIcon, Icon } from "../icons";
import { ComboBoxItemComponent } from ".";

export type ToolDefinition = { id: string; tool: Tools; icon: AppIcon };

export const TestItem: ComboBoxItemComponent<ToolDefinition, "icon"> = ({
  tool,
  icon,
}) => (
  <HStack>
    <Icon name={icon} fontSize="md" />
    <Text>{tool}</Text>
  </HStack>
);

export const TestItemTooltip: ComboBoxItemComponent<ToolDefinition, "icon"> = ({
  tool,
}) => <>{tool}</>;

export const TEST_ITEMS: ToolDefinition[] = Object.values(Tools).map(
  (tool) => ({
    id: uuid(),
    tool,
    icon: getToolIcon(tool),
  })
);
