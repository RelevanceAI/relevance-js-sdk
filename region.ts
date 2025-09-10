export type Region = "bcbe5a" | "d7b62b" | "f1db6c";

export const REGION_US = "bcbe5a";
export const REGION_EU = "d7b62b";
export const REGION_AU = "f1db6c";

export function regionBaseURL(region: Region) {
  return `https://api-${region}.stack.tryrelevance.com`;
}
