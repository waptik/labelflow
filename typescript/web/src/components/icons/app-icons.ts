import { camelCase } from "lodash/fp";
import {
  BiPointer,
  BiPurchaseTagAlt,
  BiShapePolygon,
  BiShapeSquare,
} from "react-icons/bi";
import { BsLightningFill, BsMegaphone } from "react-icons/bs";
import { HiSelector } from "react-icons/hi";
import { IoColorWandOutline, IoSearch } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { RiCloseCircleFill } from "react-icons/ri";
import { CamelCase } from "type-fest";
import { Tools } from "../../connectors/labeling-state";

export type ToolIcon = `${CamelCase<Tools>}Tool`;

export const getToolIcon = (tool: Tools): ToolIcon => {
  const camelCaseTool = camelCase(tool) as CamelCase<Tools>;
  return `${camelCaseTool}Tool`;
};

export type AppIcon =
  | "announcements"
  | "closeCircle"
  | "search"
  | "selector"
  | ToolIcon;

export const APP_ICONS: Record<AppIcon, IconType> = {
  announcements: BsMegaphone,
  closeCircle: RiCloseCircleFill,
  search: IoSearch,
  selector: HiSelector,
  selectTool: BiPointer,
  classificationTool: BiPurchaseTagAlt,
  boxTool: BiShapeSquare,
  polygonTool: BiShapePolygon,
  iogTool: IoColorWandOutline,
  aiAssistantTool: BsLightningFill,
};
