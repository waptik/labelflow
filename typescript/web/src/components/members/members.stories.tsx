import { SessionProvider } from "next-auth/react";
import { Members } from ".";
import { BASIC_DATASET_DATA, WORKSPACE_DATA } from "../../dev/fixtures";
import { createTestWrapperDecorator, storybookTitle } from "../../dev/stories";
import { TEST_MEMBERSHIPS } from "./members.fixtures";

export default {
  title: storybookTitle(Members),
  component: Members,
  decorators: [
    createTestWrapperDecorator({
      auth: { withWorkspaces: true },
      apollo: true,
      router: {
        query: {
          workspaceSlug: WORKSPACE_DATA.slug,
          datasetSlug: BASIC_DATASET_DATA.slug,
        },
      },
    }),
  ],
};

export const MembersList = () => {
  return (
    <SessionProvider session={undefined}>
      <Members
        memberships={TEST_MEMBERSHIPS}
        changeMembershipRole={({ id, role }) => {
          console.log(`Will change membership ${id} to ${role}`);
        }}
        removeMembership={(id) => {
          console.log(`Will remove membership with id ${id}`);
        }}
      />
    </SessionProvider>
  );
};

MembersList.parameters = {
  nextRouter: {
    query: {
      workspaceSlug: "local",
    },
  },
};
