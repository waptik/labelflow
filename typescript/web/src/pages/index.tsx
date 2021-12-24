import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { Cookies, useCookies } from "react-cookie";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { join, map, toPairs, isEmpty } from "lodash/fp";
import { Spinner } from "../components/spinner";
import { Meta } from "../components/meta";
import { Layout } from "../components/layout";
import Website from "./website";
import { ServiceWorkerManagerBackground } from "../components/service-worker-manager";
import { CookieBanner } from "../components/cookie-banner";

const IndexPage = () => {
  const router = useRouter();

  const [cookies] = useCookies(["hasUserTriedApp"]);
  const hasUserTriedApp = cookies.hasUserTriedApp === "true";

  useEffect(() => {
    if (hasUserTriedApp) {
      router.replace({ pathname: "/local/datasets", query: router.query });
    } else {
      router.replace({ pathname: "/website", query: router.query });
    }
  }, [hasUserTriedApp, router]);

  if (!hasUserTriedApp) {
    return <Website previewArticles={[]} />;
  }

  return (
    <>
      <ServiceWorkerManagerBackground />
      <Meta title="LabelFlow: The open standard platform for image labeling." />
      <CookieBanner />
      <Layout>
        <Center h="full">
          <Spinner />
        </Center>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedCookie = new Cookies(context.req.headers.cookie);

  if (parsedCookie.get("hasUserTriedApp") === "true") {
    const workspaceSlug =
      parsedCookie.get("lastVisitedWorkspaceSlug") ?? "local";
    return {
      props: {},
      redirect: {
        // Keep query params after redirect
        destination: `/${workspaceSlug}/datasets${
          isEmpty(context.query)
            ? ""
            : `?${join(
                "&",
                map(([key, value]) => `${key}=${value}`, toPairs(context.query))
              )}`
        }`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
    redirect: {
      // Keep query params after redirect
      destination: `/website${
        isEmpty(context.query)
          ? ""
          : `?${join(
              "&",
              map(([key, value]) => `${key}=${value}`, toPairs(context.query))
            )}`
      }`,
      permanent: false,
    },
  };
};

export default IndexPage;
