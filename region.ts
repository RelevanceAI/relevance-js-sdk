export type Region = "bcbe5a" | "d7b62b" | "f1db6c";

export const REGION_US = "bcbe5a";
export const REGION_EU = "d7b62b";
export const REGION_AU = "f1db6c";

export function regionBaseURL(region: Region) {
  return `https://api-${region}.stack.tryrelevance.com`;
}

export function regionStreamingURL(region: Region, token: string) {
  return `https://${region}.streaming.tryrelevance.com/v1/stream?authorization=Bearer+${token}`;
}
