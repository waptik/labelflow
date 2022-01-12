import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { chakraDecorator } from "../../utils/chakra-decorator";
import { Markdown } from "./markdown";
import { MARKDOWN_EXAMPLE } from "./markdown.fixtures";

export default {
  title: `web/${Markdown.name}`,
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
    <Markdown value={MARKDOWN_EXAMPLE} />
  </Wrapper>
);
export const WithHeadingLinks = () => (
  <Wrapper>
    <Markdown value={MARKDOWN_EXAMPLE} headingLinks />
  </Wrapper>
);
