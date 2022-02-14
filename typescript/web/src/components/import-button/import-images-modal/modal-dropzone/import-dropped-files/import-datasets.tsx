import { ApolloClient, gql } from "@apollo/client";
import { ExportFormat } from "@labelflow/graphql-types";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

import Bluebird from "bluebird";
import { uploadFile } from "../../../../../utils/upload-file";
import { DroppedFile, SetUploadInfos } from "../../types";

import { CONCURRENCY } from "../../constants";

const importDatasetMutation = gql`
  mutation importDataset(
    $where: DatasetWhereUniqueInput!
    $data: DatasetImportInput!
  ) {
    importDataset(where: $where, data: $data) {
      error
      skippedCrowdAnnotations
    }
  }
`;

const importDataset = async ({
  apolloClient,
  datasetId,
  workspaceId,
  file,
}: {
  apolloClient: ApolloClient<object>;
  datasetId: string;
  workspaceId: string;
  file: Blob;
}): Promise<{ skippedCrowdAnnotations: number }> => {
  const id = uuidv4();
  const now = new Date().toISOString();
  const extension = mime.extension(file.type);
  const key = `${workspaceId}/${datasetId}/import-datasets/${id}-${now}.${extension}`;
  const url = await uploadFile({ file, key, apolloClient });

  const dataImportDataset = await apolloClient.mutate({
    mutation: importDatasetMutation,
    variables: {
      where: { id: datasetId },
      data: {
        url,
        format: ExportFormat.Coco,
        options: {
          coco: {
            annotationsOnly: file.type === "application/json",
          },
        },
      },
    },
    refetchQueries: [
      "getDatasetData",
      "getImageLabels",
      "getLabel",
      "countLabelsOfDataset",
      "getDatasetLabelClasses",
    ],
  });
  if (dataImportDataset?.data?.importDataset?.error) {
    throw new Error(dataImportDataset?.data?.importDataset?.error);
  }
  return {
    skippedCrowdAnnotations:
      dataImportDataset?.data?.importDataset?.skippedCrowdAnnotations ?? 0,
  };
};

export const importDatasets = async ({
  datasets,
  datasetId,
  workspaceId,
  apolloClient,
  setFileUploadInfos,
}: {
  datasets: DroppedFile[];
  datasetId: string;
  workspaceId: string;
  apolloClient: ApolloClient<object>;
  setFileUploadInfos: SetUploadInfos;
}) => {
  return await Bluebird.Promise.map(
    datasets,
    async ({ file }) => {
      const { skippedCrowdAnnotations } = await importDataset({
        file,
        datasetId,
        workspaceId,
        apolloClient,
      });

      setFileUploadInfos((infos) => ({
        ...infos,
        [file.name ?? file.path]: {
          status: true,
          datasetSkippedCrowdAnnotations: skippedCrowdAnnotations,
        },
      }));
    },
    { concurrency: CONCURRENCY }
  );
};
