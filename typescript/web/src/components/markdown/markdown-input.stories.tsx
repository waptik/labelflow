import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import {
  MarkdownInput,
  MarkdownInputEditor,
  MarkdownInputPreview,
  MarkdownInputProvider,
} from ".";
import { chakraDecorator } from "../../utils/chakra-decorator";

export default {
  title: `web/${MarkdownInput.name}`,
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

const README_URL =
  "https://gist.githubusercontent.com/roshith-balendran/d50b32f8f7d900c34a7dc00766bcfb9c/raw/71094e6d0c877a6e0fe40ca7899bb4c5e211ff07/GitHub%2520Flavoured%2520MarkDown%2520(GFM)%2520Cheat%2520Sheet.md";

const useReadme = (): [string, (value: string) => void] => {
  const [value, setValue] = useState("");
  useEffect(
    () => {
      fetch(README_URL).then(async (response) => {
        const md = await response.text();
        return setValue(md);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [README_URL]
  );
  return [value, setValue];
};

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const handleUploadFiles = async (files: File[]): Promise<string[]> =>
  await Promise.all(files.map((file) => toBase64(file)));

export const Default = () => {
  // const [value, setValue] = useReadme();
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <MarkdownInput
        value={value}
        onChange={setValue}
        uploadFiles={handleUploadFiles}
      />
    </Wrapper>
  );
};

const useResizerStyle = (): CSSProperties => ({
  // The resizer is slightly wider since we need it to be wide-enough for
  // being grabbed but we also want it to not be displayed too-wide
  width: ".5em",
  borderLeftWidth: ".25em",
  borderLeftStyle: "solid",
  borderColor: useColorModeValue(
    "var(--chakra-colors-gray-200)",
    "var(--chakra-colors-whiteAlpha-200)"
  ),
  cursor: "col-resize",
});

export const Split = () => {
  const [value, setValue] = useReadme();
  return (
    <MarkdownInputProvider
      value={value}
      onChange={setValue}
      uploadFiles={handleUploadFiles}
    >
      <Wrapper>
        <Box h="600px">
          {/* TODO - Build or find a chakra version */}
          <SplitPane
            minSize={300}
            defaultSize={300}
            resizerStyle={useResizerStyle()}
          >
            <MarkdownInputEditor
              resize="none"
              height="100%"
              background="#f00"
            />
            <MarkdownInputPreview p=".5em" />
          </SplitPane>
        </Box>
      </Wrapper>
    </MarkdownInputProvider>
  );
};
