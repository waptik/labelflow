import { useEffect, useState } from "react";
import {
  Box,
  Popover,
  PopoverContent,
  PopoverBody,
  Kbd,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  chakra,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { RiCloseCircleFill } from "react-icons/ri";
import { useCombobox, UseComboboxStateChange } from "downshift";
import { ClassListItem } from "../class-list-item";
import { LabelClass } from "../../graphql-types.generated";

export type CreateClassInput = { name: string; type: string };

const MagnifierIcon = chakra(IoSearch);
const CloseCircleIcon = chakra(RiCloseCircleFill);

export const ClassSelectionPopover = ({
  isOpen = false,
  onClose = () => {},
  onSelectedClassChange,
  createNewClass,
  labelClasses,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectedClassChange: (item: LabelClass) => void;
  labelClasses: LabelClass[];
  createNewClass: (name: string) => void;
}) => {
  const [inputItems, setInputItems] =
    useState<(LabelClass | CreateClassInput)[]>(labelClasses);
  const {
    reset,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    itemToString: (item: { name: string } | null): string => item?.name ?? "",
    items: inputItems,
    onInputValueChange: ({ inputValue: inputValueCombobox }) => {
      const createClassItem =
        inputValueCombobox &&
        labelClasses.filter(
          (labelClass: LabelClass) => labelClass.name === inputValueCombobox
        ).length === 0
          ? [{ name: inputValueCombobox, type: "CreateClassItem" }]
          : [];

      const filteredLabelClasses = labelClasses.filter(
        (labelClass: LabelClass) => {
          return labelClass.name
            .toLowerCase()
            .startsWith((inputValueCombobox ?? "").toLowerCase());
        }
      );
      return setInputItems([...filteredLabelClasses, ...createClassItem]);
    },
    onSelectedItemChange: ({
      selectedItem,
    }: UseComboboxStateChange<LabelClass | CreateClassInput>): void => {
      if (
        selectedItem != null &&
        "type" in selectedItem &&
        selectedItem?.type === "CreateClassItem"
      ) {
        return createNewClass(selectedItem.name);
      }
      if (selectedItem != null && "id" in selectedItem) {
        return onSelectedClassChange(selectedItem);
      }
      return undefined;
    },
    defaultHighlightedIndex: 0,
  });
  // We reset the combobox state when opening it because if we do it on close there is a flash visible due to the fact that the reset happens before the popover is closed
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverContent borderColor="gray.200">
        <PopoverBody pl="0" pr="0">
          <Box>
            <Box {...getComboboxProps()} pl="3" pr="3">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MagnifierIcon fontSize="2xl" />
                </InputLeftElement>
                <Input {...getInputProps()} placeholder="Search..." />
                <InputRightElement>
                  {inputValue ? (
                    <Flex mr="5">
                      <CloseCircleIcon
                        fontSize="2xl"
                        onClick={reset}
                        color="gray.300"
                      />
                      <Kbd fontSize="md">↩</Kbd>
                    </Flex>
                  ) : (
                    <Kbd>/</Kbd>
                  )}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box pt="1" {...getMenuProps()}>
              {inputItems.map(
                (item: LabelClass | CreateClassInput, index: number) => (
                  <ClassListItem
                    itemProps={getItemProps({ item, index })}
                    item={item}
                    highlight={highlightedIndex === index}
                    index={index}
                    key={`${item.name}`}
                  />
                )
              )}
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
