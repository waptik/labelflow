import { useState, useEffect, useCallback } from "react";
import { isEmpty } from "lodash/fp";
import {
  Heading,
  ModalHeader,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";
import { useApolloClient, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Dropzone } from "./dropzone";
import { FilesStatuses } from "./file-statuses";
import { DroppedFile, UploadInfos } from "../types";

import { importDroppedFiles } from "./import-dropped-files";
import { flushPaginatedImagesCache } from "../../../dataset-images-list";

const getDataset = gql`
  query getDataset($slug: String!, $workspaceSlug: String!) {
    dataset(where: { slugs: { slug: $slug, workspaceSlug: $workspaceSlug } }) {
      id
    }
  }
`;

const getWorkspaceIdQuery = gql`
  query getWorkspaceId($workspaceSlug: String) {
    workspace(where: { slug: $workspaceSlug }) {
      id
    }
  }
`;

export const ImportImagesModalDropzone = ({
  setMode,
  onUploadStart = () => {},
  onUploadEnd = () => {},
}: {
  setMode?: (mode: "url-list", updateType?: "replaceIn") => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}) => {
  const apolloClient = useApolloClient();

  const router = useRouter();
  const { datasetSlug, workspaceSlug } = router?.query;

  /*
   * We need a state with the accepted and reject files to be able to reset the list
   * when we close the modal because react-dropzone doesn't provide a way to reset its
   * internal state
   */
  const [files, setFiles] = useState<Array<DroppedFile>>([]);
  const [fileUploadInfos, setFileUploadInfos] = useState<UploadInfos>({});

  const { data: datasetResult } = useQuery(getDataset, {
    variables: { slug: datasetSlug, workspaceSlug },
    skip: typeof datasetSlug !== "string" || typeof workspaceSlug !== "string",
  });
  const { data: getWorkspaceIdData } = useQuery(getWorkspaceIdQuery, {
    variables: { workspaceSlug },
    skip: workspaceSlug == null,
  });

  const datasetId = datasetResult?.dataset.id;
  const workspaceId = getWorkspaceIdData?.workspace.id;

  const handleImport = useCallback(
    async (filesToImport: DroppedFile[]) => {
      onUploadStart();
      await flushPaginatedImagesCache(apolloClient, datasetId);
      await importDroppedFiles({
        files: filesToImport,
        workspaceId,
        datasetId,
        setFileUploadInfos,
        apolloClient,
      });
      onUploadEnd();
    },
    [
      workspaceId,
      datasetId,
      setFileUploadInfos,
      apolloClient,
      onUploadStart,
      onUploadEnd,
    ]
  );

  useEffect(() => {
    if (isEmpty(files) || !datasetId) return;

    handleImport(files);
  }, [files, datasetId]);

  return (
    <>
      <ModalHeader textAlign="center" padding="6">
        <Heading as="h2" size="lg" pb="2">
          Import
        </Heading>
        <Text fontSize="lg" fontWeight="medium">
          Start working with your images and annotation files.
          <Button
            colorScheme="brand"
            variant="link"
            fontSize="lg"
            fontWeight="medium"
            onClick={() => setMode?.("url-list", "replaceIn")}
          >
            Import from a list of URLs instead
          </Button>
        </Text>
      </ModalHeader>

      <ModalBody
        display="flex"
        pt="0"
        pb="6"
        pr="6"
        pl="6"
        flexDirection="column"
      >
        {isEmpty(files) ? (
          <Dropzone onDropEnd={setFiles} />
        ) : (
          <FilesStatuses files={files} fileUploadInfos={fileUploadInfos} />
        )}
      </ModalBody>
    </>
  );
};
