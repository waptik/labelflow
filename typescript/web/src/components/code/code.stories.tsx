import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Code } from ".";
import { chakraDecorator } from "../../utils/chakra-decorator";
import { CODE_BLOCK_EXAMPLE, SINGLE_LINE_CODE_EXAMPLE } from "./code.fixtures";

export default {
  title: `web/${Code.name}`,
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

export const Block = () => (
  <Wrapper>
    <Code {...CODE_BLOCK_EXAMPLE} />
  </Wrapper>
);

export const SingleLineBlock = () => (
  <Wrapper>
    <Code {...SINGLE_LINE_CODE_EXAMPLE} />
  </Wrapper>
);

export const Inline = () => (
  <Wrapper>
    <p>
      {"To call hello, use "}
      <Code inline {...SINGLE_LINE_CODE_EXAMPLE} />
      {" and a message should print..."}
    </p>
  </Wrapper>
);
