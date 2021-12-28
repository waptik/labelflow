import {
  Button,
  ButtonProps,
  chakra,
  Flex,
  HStack,
  Kbd,
  TableCellProps,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { createContext, useCallback, useContext } from "react";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import {
  ReorderableTableCell,
  ReorderableTableRow,
} from "../reorderable-table";
import { useLabelClasses } from "./label-classes.context";
import { LabelClassWithShortcut } from "./types";

const CircleIcon = chakra(RiCheckboxBlankCircleFill);

const RowContext = createContext({} as LabelClassWithShortcut);

const useRow = () => useContext(RowContext);

const TableCell = (props: TableCellProps) => (
  <ReorderableTableCell whiteSpace="nowrap" {...props} />
);

const ColorField = () => {
  const { color } = useRow();
  return (
    <Tooltip placement="top" label={color} shouldWrapChildren>
      <CircleIcon
        flexShrink={0}
        flexGrow={0}
        color={color}
        fontSize="4xl"
        ml="2"
        mr="2"
      />
    </Tooltip>
  );
};

const NameField = () => {
  const { name } = useRow();
  return (
    <Tooltip placement="top" label={name}>
      <Text isTruncated>{name}</Text>
    </Tooltip>
  );
};

const NameAndColorCell = () => (
  <TableCell>
    <Flex alignItems="center">
      <ColorField />
      <NameField />
    </Flex>
  </TableCell>
);

const OccurrencesCell = () => {
  const { labelsAggregates } = useRow();
  return (
    <TableCell alignItems="center">{labelsAggregates.totalCount}</TableCell>
  );
};

const ShortcutCell = () => {
  const { shortcut } = useRow();
  return (
    <TableCell alignItems="center">
      {shortcut && (
        <Kbd flexShrink={0} flexGrow={0} justifyContent="center" mr="1">
          {shortcut}
        </Kbd>
      )}
    </TableCell>
  );
};

const ActionButton = (props: ButtonProps) => (
  <Button variant="link" colorScheme="blue" {...props} />
);

const EditButton = () => {
  const item = useRow();
  const { setEditClass } = useLabelClasses();
  const handleEdit = useCallback(
    () => setEditClass(item),
    [setEditClass, item]
  );
  return (
    <ActionButton aria-label="Edit class" onClick={handleEdit}>
      Edit
    </ActionButton>
  );
};

const DeleteButton = () => {
  const { id } = useRow();
  const { setDeleteClassId } = useLabelClasses();
  const handleDelete = useCallback(
    () => setDeleteClassId(id),
    [setDeleteClassId, id]
  );
  return (
    <ActionButton aria-label="Delete class" onClick={handleDelete}>
      Delete
    </ActionButton>
  );
};

const ActionsCell = () => (
  <TableCell alignItems="center">
    <HStack justify="flex-end">
      <EditButton />
      <DeleteButton />
    </HStack>
  </TableCell>
);

const RowBody = () => (
  <>
    <NameAndColorCell />
    <OccurrencesCell />
    <ShortcutCell />
    <ActionsCell />
  </>
);

export const LabelClassesTableRow = (props: LabelClassWithShortcut) => {
  const { id, index } = props;
  return (
    <ReorderableTableRow draggableId={id} index={index}>
      <RowContext.Provider value={props}>
        <RowBody />
      </RowContext.Provider>
    </ReorderableTableRow>
  );
};
