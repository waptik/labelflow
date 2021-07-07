import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Spinner,
  Box,
  Flex,
  chakra,
} from "@chakra-ui/react";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { RiArrowRightSLine } from "react-icons/ri";
import NextLink from "next/link";
import { KeymapButton } from "../../../../components/keymap-button";
import { ImportButton } from "../../../../components/import-button";
import { ExportButton } from "../../../../components/export-button";
import { Meta } from "../../../../components/meta";
import { Layout } from "../../../../components/layout";
import type { Image } from "../../../../graphql-types.generated";
import { Gallery } from "../../../../components/gallery";

const ArrowRightIcon = chakra(RiArrowRightSLine);

// The dynamic import is needed because openlayers use web apis that are not available
// in NodeJS, like `Blob`, so it crashes when rendering in NextJS server side.
// And anyway, it would not make sense to render canvas server side, it would just be a loss.
const LabellingTool = dynamic(
  () => import("../../../../components/labelling-tool"),
  {
    ssr: false,
    loading: ({ error }) => {
      if (error) throw error;
      return (
        <Center h="full">
          <Spinner aria-label="loading indicator" size="xl" />
        </Center>
      );
    },
  }
);

const imageQuery = gql`
  query image($id: ID!) {
    image(where: { id: $id }) {
      id
      name
    }
  }
`;

const projectQuery = gql`
  query project($id: ID!) {
    project(where: { id: $id }) {
      id
      name
    }
  }
`;

type ImageQueryResponse = {
  image: Pick<Image, "id" | "name">;
};

const ImagePage = () => {
  const router = useRouter();
  const { projectId, imageId } = router?.query;

  const { data: imageResult, error } = useQuery<ImageQueryResponse>(
    imageQuery,
    {
      variables: { id: imageId },
      skip: typeof imageId !== "string",
    }
  );

  const { data: projectResult } = useQuery(projectQuery, {
    variables: { id: projectId },
  });

  const imageName = imageResult?.image.name;
  const projectName = projectResult?.project.name;

  useEffect(() => {
    if (error) {
      router.replace({
        pathname: `/projects/${projectId}/images`,
        query: router.query,
      });
    }
  }, [error]);

  return (
    <>
      <Meta title={`Labelflow | Image ${imageName ?? ""}`} />
      <Layout
        topBarLeftContent={
          <Breadcrumb
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            spacing="8px"
            sx={{ "*": { display: "inline !important" } }}
            separator={<ArrowRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <NextLink href="/projects">
                <BreadcrumbLink>Projects</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <NextLink href={`/projects/${projectId}/images`}>
                <Text>{projectName}</Text>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NextLink href={`/projects/${projectId}/images`}>
                <BreadcrumbLink>Images</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Text>{imageName}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        topBarRightContent={
          <>
            <KeymapButton />
            <ImportButton />
            <ExportButton />
          </>
        }
      >
        <Flex height="100%" flexDirection="column">
          <Box flex="1">
            <LabellingTool />
          </Box>
          <Box bg="white" overflow="hidden">
            <Gallery />
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default ImagePage;
