import { Button, useDisclosure } from "@chakra-ui/react";
import { withNextRouter } from "storybook-addon-next-router";

import { DeleteProjectModal } from "../delete-project-modal";
import { chakraDecorator } from "../../../utils/chakra-decorator";
import { apolloDecorator } from "../../../utils/apollo-decorator";
import { queryParamsDecorator } from "../../../utils/query-params-decorator";

export default {
  title: "web-app/Delete project dialog",
  decorators: [
    chakraDecorator,
    apolloDecorator,
    queryParamsDecorator,
    withNextRouter,
  ],
};

export const Default = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>Display</Button>
      <DeleteProjectModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export const OpenedByDefault = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <div>
      <Button onClick={onOpen}>Display</Button>
      <DeleteProjectModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
