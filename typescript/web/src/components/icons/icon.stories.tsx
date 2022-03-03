import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { chakraDecorator, storybookTitle } from "../../utils/stories";
import { AppIcon, APP_ICONS, Icon as IconComponent } from ".";

export default {
  title: storybookTitle(IconComponent),
  component: IconComponent,
  decorators: [chakraDecorator],
};

export const Icon = () => (
  <SimpleGrid minChildWidth="120px">
    {Object.keys(APP_ICONS).map((name) => (
      <VStack key={name}>
        <IconComponent name={name as AppIcon} />
        <Text>{name}</Text>
      </VStack>
    ))}
  </SimpleGrid>
);
