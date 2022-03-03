import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  AiAssistantToolbar,
  AiAssistantToolbarComponent,
} from "./ai-assistant-toolbar";
import { chakraDecorator, storybookTitle } from "../../../utils/stories";

export default {
  title: storybookTitle(AiAssistantToolbar),
  component: AiAssistantToolbarComponent,
  decorators: [chakraDecorator],
} as ComponentMeta<typeof AiAssistantToolbarComponent>;

const Template: ComponentStory<typeof AiAssistantToolbarComponent> = () => (
  <AiAssistantToolbarComponent />
);

export const Default = Template.bind({});
Default.args = {};

export const Opened = Template.bind({});
Opened.args = {
  isOpen: true,
};
