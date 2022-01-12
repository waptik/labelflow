import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "./tabs";
import { chakraDecorator } from "../../utils/chakra-decorator";

export default {
  title: `web/${Tabs.name}`,
  decorators: [chakraDecorator],
};

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex direction="column" h="100%">
      <Button onClick={toggleColorMode} mb="5">
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      {children}
    </Flex>
  );
};

export const Default = () => (
  <Wrapper>
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>1</TabPanel>
        <TabPanel>2</TabPanel>
      </TabPanels>
    </Tabs>
  </Wrapper>
);
