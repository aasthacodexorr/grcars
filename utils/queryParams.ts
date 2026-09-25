import { buildUrlWithQueryParams } from "./urlHelpers";

export function setQueryParams(url: string): string {
  return buildUrlWithQueryParams(url);
}

export { buildUrlWithQueryParams };
