import { gql } from "@apollo/client";

import { client } from "../../typescript/web/src/connectors/apollo-client/schema-client";

const createDataset = async (name: string) => {
  const mutationResult = await client.mutate({
    mutation: gql`
      mutation createDataset($name: String) {
        createDataset(data: { name: $name, workspaceSlug: "local" }) {
          id
          slug
        }
      }
    `,
    variables: {
      name,
    },
  });

  const {
    data: {
      createDataset: { id, slug },
    },
  } = mutationResult;

  return { id, slug };
};

async function createImage(url: string, datasetId: string) {
  const mutationResult = await client.mutate({
    mutation: gql`
      mutation createImage($url: String, $datasetId: ID!) {
        createImage(data: { url: $url, datasetId: $datasetId }) {
          id
          name
          width
          height
          url
        }
      }
    `,
    variables: {
      datasetId,
      url,
    },
  });

  const {
    data: { createImage: image },
  } = mutationResult;

  return image;
}

const createLabelClass = async (
  name: String,
  color = "#ffffff",
  datasetId: string
) => {
  const {
    data: {
      createLabelClass: { id },
    },
  } = await client.mutate({
    mutation: gql`
      mutation createLabelClass(
        $name: String!
        $color: String!
        $datasetId: ID!
      ) {
        createLabelClass(
          data: { name: $name, color: $color, datasetId: $datasetId }
        ) {
          id
          name
          color
        }
      }
    `,
    variables: {
      name,
      color,
      datasetId,
    },
  });

  return id;
};

describe("Classification", () => {
  let datasetId: string;
  let datasetSlug: string;
  let imageId: string;
  beforeEach(() => {
    cy.setCookie("consentedCookies", "true");
    cy.window().then(async () => {
      const createResult = await createDataset("cypress test dataset");
      datasetId = createResult.id;
      datasetSlug = createResult.slug;

      const { id } = await createImage(
        "https://images.unsplash.com/photo-1579513141590-c597876aefbc?auto=format&fit=crop&w=882&q=80",
        datasetId
      );
      imageId = id;

      await createLabelClass("Rocket", "#F87171", datasetId);
    });
  });

  it("switches between drawing tools", () => {
    // See https://docs.cypress.io/guides/core-concepts/conditional-testing#Welcome-wizard
    cy.visit(
      `/local/datasets/${datasetSlug}/images/${imageId}?modal-welcome=closed&modal-update-service-worker=update`
    );
    cy.get('[aria-label="loading indicator"]').should("not.exist");
    cy.get('[aria-label="Drawing classification tool"]').should("not.exist");
    cy.get('[aria-label="Drawing box tool"]').should("exist").click();
    cy.get('[aria-label="Change Drawing tool"]').click();
    cy.get('[aria-label="Bounding box tool"]').should(
      "have.attr",
      "aria-checked",
      "true"
    );
    cy.get('[aria-label="Classification tool"]')
      .should("have.attr", "aria-checked", "false")
      .click();

    cy.get('[aria-label="Drawing classification tool"]').should("exist");
    cy.get('[aria-label="Drawing box tool"]').should("not.exist");
  });

  it("add classses and remove them", () => {
    // See https://docs.cypress.io/guides/core-concepts/conditional-testing#Welcome-wizard
    cy.visit(
      `/local/datasets/${datasetSlug}/images/${imageId}?modal-welcome=closed&modal-update-service-worker=update`
    );

    // Switch to classification tool
    cy.get('[aria-label="loading indicator"]').should("not.exist");
    cy.get('[aria-label="Change Drawing tool"]').should("exist").click();
    cy.get('[aria-label="Classification tool"]').click();

    // Create a classification tag with the existing class "rocket"
    cy.get("main").rightclick(475, 100);
    cy.get('[aria-label="Class selection popover"]')
      .contains("Rocket")
      .closest('[role="option"]')
      .should("have.attr", "aria-current", "false")
      .click();

    // // Reopen the menu just to test
    // cy.get("main").rightclick(475, 100);
    // cy.get('[aria-label="Class selection popover"]')
    //   .contains("Rocket")
    //   .closest('[role="option"]')
    //   .should("have.attr", "aria-current", "true");
    // cy.get("main").click(475, 95);

    // Create a classification tag with the existing class "rocket"
    cy.get("main").rightclick(475, 100);
    cy.get('[aria-label="Class selection popover"]').within(() => {
      cy.get('[name="class-selection-search"]').type("My new class{enter}");
    });
  });
});
