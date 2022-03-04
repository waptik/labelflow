import { useControllableState } from "@chakra-ui/react";
import {
  useCombobox as useDownshift,
  UseComboboxProps as DownshiftProps,
  UseComboboxReturnValue as DownshiftReturnValue,
  UseComboboxStateChange as DownshiftStateChange,
} from "downshift";
import { isEmpty } from "lodash/fp";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { compareTwoStrings } from "string-similarity";

export type DefaultComboBoxCompareKey = "text";

export type ObjectKey = string | number | symbol;

export type ComboBoxItem<TKey extends ObjectKey = DefaultComboBoxCompareKey> = {
  [key in TKey | "id"]: string;
};

export type ComboBoxItemComponent<
  TValue extends ComboBoxItem<TCompareKey>,
  TCompareKey extends keyof TValue
> = (value: TValue) => JSX.Element;

export type CoreComboBoxProps<
  TValue extends ComboBoxItem<TCompareKey>,
  TCompareKey extends keyof TValue
> = Omit<
  DownshiftProps<TValue>,
  "selectedItem" | "inputValue" | "onInputValueChange"
>;

export type ComboBoxProps<
  TValue extends ComboBoxItem<TCompareKey>,
  TCompareKey extends keyof TValue
> = CoreComboBoxProps<TValue, TCompareKey> & {
  item: ComboBoxItemComponent<TValue, TCompareKey>;
  itemTooltip?: ComboBoxItemComponent<TValue, TCompareKey>;
  selectedItem?: TValue;
  compareProp: keyof TValue;
  onChange?: (value?: TValue) => void;
};

export type ComboBoxState<
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
> = Omit<DownshiftReturnValue<TValue>, "selectedItem"> &
  Pick<
    ComboBoxProps<TValue, TCompareKey>,
    "items" | "onChange" | "item" | "itemTooltip" | "selectedItem"
  >;

const ComboBoxContext = createContext({} as ComboBoxState);

export const useComboBox = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>() =>
  useContext(ComboBoxContext) as unknown as ComboBoxState<TValue, TCompareKey>;

type FilterValuesOptions<
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
> = Pick<ComboBoxState<TValue, TCompareKey>, "inputValue"> &
  Pick<ComboBoxProps<TValue, TCompareKey>, "items" | "compareProp"> & {};

const filterValues = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  items,
  compareProp,
  inputValue,
}: FilterValuesOptions<TValue, TCompareKey>) => {
  const lowerSearchText = inputValue.toLowerCase();
  return items
    .filter((item) => {
      const text = item[compareProp];
      return text.toLowerCase().includes(lowerSearchText);
    })
    .map<[TValue, number]>((item) => {
      const score = compareTwoStrings(item[compareProp], inputValue);
      return [item, score];
    })
    .sort(([, aScore], [, bScore]) => bScore - aScore)
    .map(([item]) => item);
};

type UseFilterOptions<
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
> = Pick<ComboBoxProps<TValue, TCompareKey>, "items" | "compareProp">;

type UseFilterResult<
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
> = Pick<ComboBoxState<TValue, TCompareKey>, "inputValue" | "items"> & {
  setInputValue: (value: string) => void;
};

const useFilter = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  items,
  compareProp,
}: UseFilterOptions<TValue, TCompareKey>): UseFilterResult<
  TValue,
  TCompareKey
> => {
  const [inputValue, setInputValue] = useState("");
  const filtered = useMemo(() => {
    return isEmpty(inputValue)
      ? items
      : filterValues<TValue, TCompareKey>({
          items,
          compareProp,
          inputValue,
        });
  }, [items, compareProp, inputValue]);
  return { inputValue, setInputValue, items: filtered };
};

type UseDownshiftStateOptions<
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
> = Pick<ComboBoxProps<TValue, TCompareKey>, "compareProp" | "selectedItem"> &
  Required<Pick<ComboBoxProps<TValue, TCompareKey>, "onChange">> &
  Pick<ComboBoxState, "setInputValue" | "inputValue" | "items"> &
  CoreComboBoxProps<TValue, TCompareKey>;

const useDownshiftState = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  inputValue,
  setInputValue,
  onChange,
  compareProp,
  ...props
}: UseDownshiftStateOptions<TValue, TCompareKey>) => {
  const handleInputValueChange = useCallback(
    ({ inputValue: newValue, isOpen }: DownshiftStateChange<TValue>) =>
      setInputValue(isOpen ? newValue ?? "" : ""),
    [setInputValue]
  );
  const handleSelectedItemChange = useCallback(
    ({ selectedItem: selected }: DownshiftStateChange<TValue>) => {
      onChange(selected ?? undefined);
    },
    [onChange]
  );
  return useDownshift<TValue>({
    ...props,
    inputValue,
    itemToString: (value: TValue | null) => value?.[compareProp] ?? "",
    onInputValueChange: handleInputValueChange,
    onSelectedItemChange: handleSelectedItemChange,
  });
};

const useProvider = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  selectedItem: propSelectedItem,
  onChange: propOnChange,
  items,
  item,
  compareProp,
  defaultSelectedItem,
  ...props
}: ComboBoxProps<TValue, TCompareKey>): ComboBoxState<TValue, TCompareKey> => {
  const [selectedItem, onChange] = useControllableState<TValue | undefined>({
    defaultValue: defaultSelectedItem ?? undefined,
    value: propSelectedItem,
    onChange: propOnChange,
  });
  const filterState = useFilter<TValue, TCompareKey>({ items, compareProp });
  const comboBoxState = useDownshiftState<TValue>({
    ...props,
    compareProp,
    selectedItem,
    onChange,
    ...filterState,
  });
  return {
    ...filterState,
    ...comboBoxState,
    selectedItem,
    onChange,
    item,
  };
};

export const ComboBoxProvider = <
  TValue extends ComboBoxItem<ObjectKey> = Record<ObjectKey, string>,
  TCompareKey extends keyof TValue = ObjectKey
>({
  children,
  ...props
}: PropsWithChildren<ComboBoxProps<TValue, TCompareKey>>) => (
  <ComboBoxContext.Provider
    value={useProvider<TValue, TCompareKey>(props) as unknown as ComboBoxState}
  >
    {children}
  </ComboBoxContext.Provider>
);
