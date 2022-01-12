import {
  Tab as ChakraTab,
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  TabListProps,
  TabPanels as ChakraTabPanels,
  TabPanelProps,
  TabPanel as ChakraTabPanel,
  TabPanelsProps,
  TabProps,
  TabsProps,
} from "@chakra-ui/react";

export const Tab = (props: TabProps) => <ChakraTab {...props} />;

export const TabList = (props: TabListProps) => <ChakraTabList {...props} />;

export const TabPanel = (props: TabPanelProps) => <ChakraTabPanel {...props} />;

export const TabPanels = (props: TabPanelsProps) => (
  <ChakraTabPanels {...props} />
);

export const Tabs = (props: TabsProps) => (
  <ChakraTabs variant="enclosed" {...props} />
);
