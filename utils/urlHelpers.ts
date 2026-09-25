"use client";

import { useState, useEffect } from "react";

/**
 * Builds a target URL merging query parameters from:
 * 1. The baseUrl's existing search parameters.
 * 2. Any additional parameters provided (e.g. inventory_id).
 * 3. The current page's search parameters (from window.location.search or provided searchString).
 *
 * It preserves flag query params (e.g., `?sjhfsd`), handles decoding/encoding properly,
 * and avoids duplicating keys.
 */
export function buildUrlWithQueryParams(
  baseUrl: string,
  extraParams?: Record<string, string | number | undefined | null>,
  searchString?: string
): string {
  if (!baseUrl) return "";

  // Separate path and query from baseUrl
  const [basePath, baseQuery = ""] = baseUrl.split("?");

  // Get search string from argument or browser window
  let pageSearch = "";
  if (typeof searchString === "string") {
    pageSearch = searchString.startsWith("?") ? searchString.slice(1) : searchString;
  } else if (typeof window !== "undefined" && window.location && window.location.search) {
    pageSearch = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;
  }

  // Helper to parse query string preserving flags without values (valueless keys)
  const parseQueryTokens = (query: string): Array<{ key: string; value: string | null }> => {
    if (!query) return [];
    return query
      .split("&")
      .filter(Boolean)
      .map((token) => {
        const eqIdx = token.indexOf("=");
        if (eqIdx === -1) {
          return { key: decodeURIComponent(token), value: null };
        }
        return {
          key: decodeURIComponent(token.slice(0, eqIdx)),
          value: decodeURIComponent(token.slice(eqIdx + 1)),
        };
      });
  };

  const baseTokens = parseQueryTokens(baseQuery);
  const pageTokens = parseQueryTokens(pageSearch);

  // Map to store combined query params: key -> value (value is null for boolean flag)
  const paramMap = new Map<string, string | null>();

  // 1. Base tokens
  for (const item of baseTokens) {
    paramMap.set(item.key, item.value);
  }

  // 2. Extra params (if any)
  if (extraParams) {
    for (const [key, val] of Object.entries(extraParams)) {
      if (val !== undefined && val !== null) {
        paramMap.set(key, String(val));
      }
    }
  }

  // 3. Page tokens (add new or update existing, keeping extraParams as priority)
  for (const item of pageTokens) {
    if (extraParams && extraParams[item.key] !== undefined && extraParams[item.key] !== null) {
      // extraParams already set
      continue;
    }
    paramMap.set(item.key, item.value);
  }

  // Reconstruct query string
  const queryParts: string[] = [];
  paramMap.forEach((value, key) => {
    if (!key) return;
    if (value === null || value === undefined) {
      queryParts.push(encodeURIComponent(key));
    } else {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  if (queryParts.length === 0) {
    return basePath;
  }

  return `${basePath}?${queryParts.join("&")}`;
}

/**
 * React hook to automatically compute the full URL with current page search params
 * for embedded iframes and dynamic links on client hydration.
 */
export function useIframeUrl(
  baseUrl: string | undefined,
  extraParams?: Record<string, string | number | undefined | null>
): string {
  const extraParamsKey = JSON.stringify(extraParams || {});
  const [url, setUrl] = useState(() => (baseUrl ? buildUrlWithQueryParams(baseUrl, extraParams) : ""));

  useEffect(() => {
    if (!baseUrl) {
      setUrl("");
      return;
    }

    const updateUrl = () => {
      const liveUrl = buildUrlWithQueryParams(baseUrl, extraParams);
      setUrl(liveUrl);
    };

    updateUrl();
    window.addEventListener("popstate", updateUrl);
    return () => window.removeEventListener("popstate", updateUrl);
  }, [baseUrl, extraParamsKey]);

  if (typeof window !== "undefined" && baseUrl) {
    return buildUrlWithQueryParams(baseUrl, extraParams);
  }

  return url || (baseUrl ? buildUrlWithQueryParams(baseUrl, extraParams) : "");
}

export const setQueryParams = (url: string) => buildUrlWithQueryParams(url);
