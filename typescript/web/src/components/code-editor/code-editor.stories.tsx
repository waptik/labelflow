import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { CodeEditor, CodeEditorProvider } from ".";
import { chakraDecorator } from "../../utils/chakra-decorator";

export default {
  title: `web/${CodeEditor.name}`,
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

export const Default = () => {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <CodeEditorProvider value={value} onChange={setValue}>
        <CodeEditor />
      </CodeEditorProvider>
    </Wrapper>
  );
};

export const Responsive = () => {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <Box
        height="300px"
        width="300px"
        resize="both"
        overflow="hidden"
        padding="2em"
        background="blue.500"
      >
        <CodeEditorProvider value={value} onChange={setValue}>
          <CodeEditor w="100%" h="100%" resize="none" />
        </CodeEditorProvider>
      </Box>
    </Wrapper>
  );
};
