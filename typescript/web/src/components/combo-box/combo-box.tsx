import {
  Button,
  Flex,
  HStack,
  Input,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Kbd,
  KbdProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip,
  TooltipProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { isEmpty, isNil } from "lodash/fp";
import { forwardRef, PropsWithChildren, ReactNode, useCallback } from "react";
import { OptionalParent } from "../../utils";
import { Icon, IconButton } from "../icons";
import {
  ObjectKey,
  ComboBoxProps,
  ComboBoxProvider,
  ComboBoxItem,
  useComboBox,
} from "./combo-box.context";

const KeyboardShortcut = ({ children, ...props }: KbdProps) => (
  <Kbd {...props} justifySelf="flex-end" fontSize="md">
    {children}
  </Kbd>
);

const ReturnKeyShortcut = (props: KbdProps) => (
  <KeyboardShortcut {...props}>↩</KeyboardShortcut>
);

const SearchInputLeft = forwardRef<HTMLInputElement, InputElementProps>(
  (props: InputElementProps, ref) => (
    <InputLeftElement ref={ref} {...props} pointerEvents="none">
      <Icon name="search" fontSize="xl" />
    </InputLeftElement>
  )
);

const SearchInputMeta = () => {
  const { getLabelProps } = useComboBox();
  // Visually hidden accessible label. See: https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
  return (
    <Text
      as="label"
      {...getLabelProps()}
      border={0}
      clip="rect(0 0 0 0)"
      height="1px"
      margin="-1px"
      overflow="hidden"
      padding={0}
      position="absolute"
      width="1px"
    >
      Search in class selection popover
    </Text>
  );
};

const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { getInputProps } = useComboBox();
    return (
      <Input
        ref={ref}
        {...props}
        {...getInputProps()}
        placeholder="Search..."
      />
    );
  }
);

const ClearSearchButton = () => {
  const { setInputValue } = useComboBox();
  const iconColor = useColorModeValue("gray.300", "gray.500");
  const handleClick = useCallback(() => setInputValue(""), [setInputValue]);
  return (
    <IconButton
      icon="closeCircle"
      label="Clear search"
      size="2xl"
      onClick={handleClick}
      cursor="pointer"
      color={iconColor}
      variant="unstyled"
    />
  );
};

const NotEmptySearchInputRight = () => {
  const { highlightedIndex } = useComboBox();
  return (
    <HStack>
      <ClearSearchButton />
      <ReturnKeyShortcut
        visibility={highlightedIndex > -1 ? "visible" : "hidden"}
      />
    </HStack>
  );
};

const SearchInputRight = forwardRef<HTMLDivElement, InputElementProps>(
  (props, ref) => {
    const { inputValue } = useComboBox();
    return (
      <InputRightElement ref={ref} {...props} justifyContent="flex-end" mr="2">
        {isEmpty(inputValue) ? <Kbd>/</Kbd> : <NotEmptySearchInputRight />}
      </InputRightElement>
    );
  }
);

// https://github.com/chakra-ui/chakra-ui/issues/2269#issuecomment-712935052
Object.assign(SearchInputLeft, { id: "InputLeftElement" });
Object.assign(SearchInput, { id: "Input" });
Object.assign(SearchInputRight, { id: "InputRightElement" });

const SearchInputGroup = () => (
  <InputGroup size="sm">
    <SearchInputLeft />
    <SearchInputMeta />
    <SearchInput />
    <SearchInputRight />
  </InputGroup>
);

// Tooltip children is required but it's options in OptionalParent["parent"] so
// we have use a default one if needed
const TooltipProxy = ({
  children,
  ...props
}: PropsWithChildren<Omit<TooltipProps, "children">>) => (
  <Tooltip {...props}>{children ?? <div />}</Tooltip>
);

type ValueItemProps<
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
> = { value: ComboBoxItem<TCompareKey>; index: number };

const ValueItemTooltip = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  value,
  children,
}: PropsWithChildren<Pick<ValueItemProps<TValue, TCompareKey>, "value">>) => {
  const { itemTooltip: ItemTooltip } = useComboBox();
  const tooltipProps: Omit<TooltipProps, "children"> = {
    label: isNil(ItemTooltip) ? undefined : <ItemTooltip {...value} />,
    openDelay: 500,
  };
  return (
    <OptionalParent
      enabled={!isNil(ItemTooltip)}
      parent={TooltipProxy}
      parentProps={tooltipProps}
    >
      {children}
    </OptionalParent>
  );
};

const ValueItem = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  value,
  index,
  ...props
}: ValueItemProps<TValue, TCompareKey>) => {
  const { highlightedIndex, item: Item, getItemProps } = useComboBox();
  const selected = index === highlightedIndex;
  const selectedBg = useColorModeValue("gray.300", "gray.500");
  return (
    <ValueItemTooltip value={value}>
      <Flex
        direction="row"
        justify="stretch"
        cursor="pointer"
        bg={selected ? selectedBg : "transparent"}
        {...props}
        {...getItemProps({ item: value, index })}
        borderRadius="md"
        borderStyle="none"
        p={0}
        m={0}
        border={0}
      >
        <Flex flexGrow={1} direction="row" px=".5em" py=".25em">
          <Flex flexGrow={1} direction="row">
            <Item key={value.id} {...value} />
          </Flex>
          <ReturnKeyShortcut visibility={selected ? "visible" : "hidden"} />
        </Flex>
      </Flex>
    </ValueItemTooltip>
  );
};

const ValuesList = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>() => {
  const { items, getMenuProps } = useComboBox<TValue, TCompareKey>();
  return (
    <Flex {...getMenuProps()} flexGrow={1} direction="column" overflowY="auto">
      {items.map((item, index) => (
        <ValueItem key={item.id} value={item} index={index} />
      ))}
    </Flex>
  );
};

const SearchableList = () => {
  const { getComboboxProps } = useComboBox();
  return (
    <Flex
      {...getComboboxProps()}
      flexGrow={1}
      direction="column"
      align="stretch"
    >
      <SearchInputGroup />
      <ValuesList />
    </Flex>
  );
};

type ListPopoverProps = { trigger: ReactNode };

const ListPopover = ({ trigger }: ListPopoverProps) => {
  const { isOpen, closeMenu, openMenu } = useComboBox();
  return (
    <Popover isOpen={isOpen} onClose={closeMenu} onOpen={openMenu}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        borderColor={useColorModeValue("gray.200", "gray.600")}
        cursor="default"
        pointerEvents="initial"
      >
        <PopoverBody p={0}>
          <SearchableList />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const MainButton = forwardRef<HTMLButtonElement | null>((props, ref) => {
  const { item: Item, selectedItem } = useComboBox();
  // Labeling view breaks default background
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Tooltip label="Click to select a value" placement="bottom" openDelay={500}>
      <Button
        ref={ref}
        aria-label="Select value"
        rightIcon={<Icon name="selector" fontSize="md" />}
        minW={100}
        bg={bg}
        {...props}
      >
        {isNil(selectedItem) ? <Spacer /> : <Item {...selectedItem} />}
      </Button>
    </Tooltip>
  );
});

export const ComboBox = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  ...props
}: ComboBoxProps<TValue, TCompareKey>) => (
  <ComboBoxProvider {...props}>
    <ListPopover trigger={<MainButton />} />
  </ComboBoxProvider>
);
