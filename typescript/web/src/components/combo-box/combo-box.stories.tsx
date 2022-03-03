import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComboBox, ComboBoxProps } from ".";
import { chakraDecorator, storybookTitle } from "../../utils/stories";
import {
  TestItem,
  TestItemTooltip,
  TEST_ITEMS,
  ToolDefinition,
} from "./combo-box.fixtures";

export default {
  title: storybookTitle(ComboBox),
  component: ComboBox,
  decorators: [chakraDecorator],
} as ComponentMeta<typeof ComboBox>;

type TemplateProps = ComboBoxProps<ToolDefinition, "tool">;

const Template: ComponentStory<(props: TemplateProps) => JSX.Element> = (
  props
) => (
  <ComboBox
    {...props}
    items={TEST_ITEMS}
    compareProp="tool"
    item={TestItem}
    itemTooltip={TestItemTooltip}
  />
);

export const Default = Template.bind({});
Default.args = {};

export const WithSelectedItem = Template.bind({});
WithSelectedItem.args = { selectedItem: TEST_ITEMS[3] };

export const Opened = Template.bind({});
Opened.args = {
  selectedItem: TEST_ITEMS[3],
  isOpen: true,
};
