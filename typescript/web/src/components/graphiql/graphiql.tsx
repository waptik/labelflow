import GraphiQLOriginal from "graphiql";
import "graphiql/graphiql.css";
import { createGraphiQLFetcher } from "@graphiql/toolkit";

export const GraphiQL = () => {
  const fetcher = createGraphiQLFetcher({
    url:
      process.env.NEXT_PUBLIC_ENDPOINT ??
      `${window.location.origin}/api/worker/graphql`,
  });

  return (
    <GraphiQLOriginal
      fetcher={fetcher}
      editorTheme="dracula"
      defaultVariableEditorOpen
      defaultSecondaryEditorOpen
      headerEditorEnabled
      shouldPersistHeaders
    />
  );
};
