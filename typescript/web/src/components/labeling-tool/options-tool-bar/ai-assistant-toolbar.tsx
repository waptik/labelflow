import { gql, useMutation } from "@apollo/client";
import {
  Button,
  ButtonGroup,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Text,
  Tooltip,
  useBoolean,
} from "@chakra-ui/react";
import { AiAssistant, AI_ASSISTANTS } from "@labelflow/common-resolvers";
import { isEmpty, isNil } from "lodash/fp";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Tools, useLabelingStore } from "../../../connectors/labeling-state";
import {
  RunAiAssistantMutation,
  RunAiAssistantMutationVariables,
} from "../../../graphql-types";
import { useDatasetImage } from "../../../hooks";
import { keymap } from "../../../keymap";
import { trackEvent } from "../../../utils/google-analytics";
import { ComboBox } from "../../combo-box";
import { useApolloErrorToast } from "../../toast";
import { GET_IMAGE_LABELS_QUERY } from "../openlayers-map/queries";

const RUN_AI_ASSISTANT_MUTATION = gql`
  mutation RunAiAssistantMutation(
    $assistantId: ID!
    $imageId: ID!
    $useAutoPolygon: Boolean
  ) {
    runAiAssistant(
      data: {
        assistantId: $assistantId
        imageId: $imageId
        useAutoPolygon: $useAutoPolygon
      }
    ) {
      labels
      labelClasses
    }
  }
`;

export type AiAssistantState = {
  aiAssistant: AiAssistant;
  setAiAssistant: (value: AiAssistant) => void;
  useAutoPolygon: boolean;
  toggleUseAutoPolygon: () => void;
  runAiAssistant: () => void;
  loading: boolean;
};

export const AiAssistantContext = createContext({} as AiAssistantState);

export const useAiAssistant = () => useContext(AiAssistantContext);

export type AiAssistantProviderProps = PropsWithChildren<{}>;

const useRunAiAssistant = ({
  assistantId = "",
  useAutoPolygon,
}: RunAiAssistantOptions): [() => void, boolean] => {
  const { id: imageId } = useDatasetImage();
  const [runAiAssistant, { loading }] = useMutation<
    RunAiAssistantMutation,
    RunAiAssistantMutationVariables
  >(RUN_AI_ASSISTANT_MUTATION, {
    variables: { assistantId, imageId, useAutoPolygon },
    refetchQueries: [GET_IMAGE_LABELS_QUERY],
    onError: useApolloErrorToast(),
    update: (cache) => cache.evict({ id: `Image:${imageId}` }),
  });
  const handleRun = useCallback(async () => {
    if (isEmpty(assistantId)) return;
    trackEvent("runAiAssistant", { assistantId, imageId });
    await runAiAssistant();
  }, [assistantId, imageId, runAiAssistant]);
  return [handleRun, loading];
};

const useProvider = (): AiAssistantState => {
  const [aiAssistant, setAiAssistant] = useState<AiAssistant>(AI_ASSISTANTS[0]);
  const [useAutoPolygon, { toggle: toggleUseAutoPolygon }] = useBoolean(false);
  const [runAiAssistant, loading] = useRunAiAssistant({
    assistantId: aiAssistant.id,
    useAutoPolygon,
  });
  useHotkeys(keymap.runAiAssistant.key, runAiAssistant, {}, []);
  return {
    aiAssistant,
    setAiAssistant,
    useAutoPolygon,
    toggleUseAutoPolygon,
    runAiAssistant,
    loading,
  };
};

const AiAssistantProvider = ({ children }: AiAssistantProviderProps) => (
  <AiAssistantContext.Provider value={useProvider()}>
    {children}
  </AiAssistantContext.Provider>
);

type RunAiAssistantOptions = Partial<
  Pick<RunAiAssistantMutationVariables, "assistantId" | "useAutoPolygon">
>;

const AnnotateButton = () => {
  const { runAiAssistant, loading } = useAiAssistant();
  return (
    <Tooltip
      label={`Run Ai Assistant [${keymap.runAiAssistant.key}]`}
      placement="bottom"
      openDelay={500}
      disabled={loading}
    >
      <Button
        onClick={runAiAssistant}
        isLoading={loading}
        loadingText="Running..."
      >
        Annotate
      </Button>
    </Tooltip>
  );
};

type ToggleOptionsButtonProps = {
  showOptions: boolean;
};

const ToggleOptionsButton = ({ showOptions }: ToggleOptionsButtonProps) => {
  const { loading } = useAiAssistant();
  return (
    <Tooltip label="Show options" placement="bottom" openDelay={500}>
      <MenuButton as={Button} isActive={showOptions} disabled={loading}>
        ...
      </MenuButton>
    </Tooltip>
  );
};

const OptionsMenuList = () => {
  const { useAutoPolygon, toggleUseAutoPolygon } = useAiAssistant();
  return (
    <MenuList>
      <MenuItemOption isChecked={useAutoPolygon} onClick={toggleUseAutoPolygon}>
        Post-process with auto-polygon
      </MenuItemOption>
    </MenuList>
  );
};

type AnnotateBodyProps = { showOptions: boolean };

const AnnotateBody = ({ showOptions }: AnnotateBodyProps) => {
  const { loading } = useAiAssistant();
  return (
    <>
      <ButtonGroup isAttached colorScheme="brand" disabled={loading}>
        <AnnotateButton />
        <ToggleOptionsButton showOptions={showOptions} />
      </ButtonGroup>
    </>
  );
};

const Annotate = () => (
  <Menu>
    {({ isOpen }) => (
      <>
        <AnnotateBody showOptions={isOpen} />
        <OptionsMenuList />
      </>
    )}
  </Menu>
);

const AiAssistantItem = ({ name, iconUrl }: AiAssistant) => (
  <HStack>
    <Image src={iconUrl} h={4} w={4} />
    <Text>{name}</Text>
  </HStack>
);

const AiAssistantTooltip = ({ summary }: AiAssistant) => <Text>{summary}</Text>;

export const AiAssistantToolbarComponent = () => {
  const { aiAssistant, setAiAssistant, loading } = useAiAssistant();
  return (
    <HStack pointerEvents="initial" disabled={loading}>
      <ComboBox
        items={AI_ASSISTANTS}
        compareProp="name"
        item={AiAssistantItem}
        itemTooltip={AiAssistantTooltip}
        selectedItem={aiAssistant}
        onChange={(value) => {
          if (isNil(value)) return;
          setAiAssistant(value);
        }}
      />
      <Annotate />
    </HStack>
  );
};

export const AiAssistantToolbar = () => {
  const selectedTool = useLabelingStore((state) => state.selectedTool);
  return (
    <>
      {selectedTool === Tools.AI_ASSISTANT && (
        <AiAssistantProvider>
          <AiAssistantToolbarComponent />
        </AiAssistantProvider>
      )}
    </>
  );
};
