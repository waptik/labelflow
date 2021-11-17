const universalBtoa = (str: string) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str, "binary").toString("base64");
  }
};

const universalAtob = (b64Encoded: string) => {
  try {
    return atob(b64Encoded);
  } catch (err) {
    return Buffer.from(b64Encoded, "base64").toString("binary");
  }
};

export const jsonToDataUri = (json: string): string =>
  `data:application/json;base64,${universalBtoa(json)}`;
// `data:application/json;base64,${Buffer.from(json, "binary").toString(
//   "base64"
// )}`;

export const dataUriToJson = (dataUri: string): string =>
  universalAtob(dataUri.split(",")[1]);
// Buffer.from(dataUri.split(",")[1], "base64").toString("binary");
