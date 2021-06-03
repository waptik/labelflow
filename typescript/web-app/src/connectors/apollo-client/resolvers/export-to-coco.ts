import { Label, LabelClass } from "../../../types.generated";

/**
 * Query tout les labelclass -> categories (cache: Map<uuid, id>);
 * Query toutes les images avec labels -> annotations + images (reducer (etatCourantDataset, labelClass ou image) -> nouveauDataset);
 */

export type CocoCategory = {
  id: number;
  name: string;
  supercategory: string;
};

type Polygon = number[][];

export type CocoAnnotation = {
  id: number;
  image_id: number;
  category_id: number;
  segmentation: string | Polygon;
  area: number;
  bbox: [x: number, y: number, width: number, height: number];
  iscrowd: 0 | 1;
};

export const exportLabelClassToCoco = (
  labelClass: LabelClass,
  id: number
): CocoCategory => {
  return {
    id,
    name: labelClass.name,
    supercategory: "",
  };
};

export const exportLabelClassesToCoco = (
  labelClasses: LabelClass[]
): CocoCategory[] => {
  return labelClasses.map((value, index) =>
    exportLabelClassToCoco(value, index + 1)
  );
};

export const exportLabelToCoco = (
  { x, y, width, height }: Label,
  id: number,
  imageId: number,
  categoryId: number
): CocoAnnotation => {
  return {
    id,
    image_id: imageId,
    category_id: categoryId,
    segmentation: [],
    area: width * height,
    bbox: [x, y, width, height],
    iscrowd: 0,
  };
};

const exportToCoco = async (_: any): Promise<String | undefined> => {
  return "{}";
};

export default {
  Query: {
    exportToCoco,
  },
};
