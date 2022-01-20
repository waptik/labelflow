import React from "react";
import {
  apolloDecorator,
  chakraDecorator,
  queryParamsDecorator,
  storybookTitle,
} from "../../../utils/stories";
import { CookieBanner } from "../cookie-banner";

export default {
  title: storybookTitle(CookieBanner),
  decorators: [chakraDecorator, apolloDecorator, queryParamsDecorator],
};

export const Open = () => <CookieBanner />;
