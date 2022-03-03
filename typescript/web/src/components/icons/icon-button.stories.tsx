import { chakraDecorator, storybookTitle } from "../../utils/stories";
import { IconButton as IconButtonComponent } from ".";

export default {
  title: storybookTitle(IconButtonComponent),
  component: IconButtonComponent,
  decorators: [chakraDecorator],
};

export const IconButton = () => {
  return <IconButtonComponent icon="search" label="Search" />;
};
