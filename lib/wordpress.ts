export const WORDPRESS_SITE_URL = "https://blog.grcars.ca";
export const WORDPRESS_API_BASE = `${WORDPRESS_SITE_URL}/wp-json/wp/v2`;

export interface WordPressImageSize {
  source_url: string;
  width: number;
  height: number;
}

export interface WordPressMedia {
  id: number;
  source_url?: string;
  alt_text?: string;
  caption?: { rendered?: string };
  title?: { rendered?: string };
  media_details?: {
    width?: number;
    height?: number;
    file?: string;
    sizes?: Record<string, WordPressImageSize>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  link?: string;
  count?: number;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
  link?: string;
}

export interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  status: string;
  link: string;
  type: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  author: number;
  featured_media: number;
  categories: number[];
  _embedded?: {
    author?: WordPressAuthor[];
    "wp:featuredmedia"?: WordPressMedia[];
  };
}

export interface WordPressListResponse<T> {
  data: T;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

async function fetchWordPress<T>(endpoint: string): Promise<{ data: T; headers: Headers }> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${WORDPRESS_API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "GRCars-Website/1.0 (+https://www.grcars.ca)",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`WordPress API request failed (${response.status}): ${message}`);
  }

  return {
    data: (await response.json()) as T,
    headers: response.headers,
  };
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function formatWordPressDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getWordPressPostSlugFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.replace(/\/+$/, "");
    if (!pathname || pathname === "/") return null;
    return pathname.split("/").filter(Boolean).at(-1) ?? null;
  } catch {
    return null;
  }
}

export function normalizeWordPressContent(content: string): string {
  return content.replace(
    /https:\/\/blog\.grcars\.ca\/((?!wp-content|wp-json|wp-admin|category|tag|feed)[A-Za-z0-9-]+)(?=\/|[?#"])/g,
    "https://www.grcars.ca/blogs/$1"
  );
}

export async function getPosts(page = 1, perPage = 12): Promise<WordPressListResponse<WordPressPost[]>> {
  const query = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _embed: "true",
  });

  const { data, headers } = await fetchWordPress<WordPressPost[]>(`/posts?${query.toString()}`);

  return {
    data,
    totalItems: Number(headers.get("x-wp-total") ?? data.length),
    totalPages: Number(headers.get("x-wp-totalpages") ?? 1),
    currentPage: page,
  };
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const query = new URLSearchParams({
    slug,
    _embed: "true",
  });

  const { data } = await fetchWordPress<WordPressPost[]>(`/posts?${query.toString()}`);
  return data[0] ?? null;
}

export async function getCategories(): Promise<WordPressCategory[]> {
  const { data } = await fetchWordPress<WordPressCategory[]>("/categories?per_page=100");
  return data;
}

export async function getAuthor(authorId: number): Promise<WordPressAuthor | null> {
  if (!authorId) return null;

  try {
    const { data } = await fetchWordPress<WordPressAuthor>(`/users/${authorId}`);
    return data;
  } catch {
    return null;
  }
}

export async function getFeaturedImage(featuredMediaId?: number | null): Promise<WordPressMedia | null> {
  if (!featuredMediaId) {
    return null;
  }

  try {
    const { data } = await fetchWordPress<WordPressMedia>(`/media/${featuredMediaId}`);
    return data;
  } catch {
    return null;
  }
}

export function getImageUrl(media?: WordPressMedia | null): string | null {
  if (!media) return null;

  const sourceUrl = media.source_url || media.media_details?.sizes?.large?.source_url;
  if (sourceUrl) return sourceUrl;

  const fallback = media.media_details?.sizes;
  if (fallback) {
    const preferred = fallback.large || fallback.medium || fallback.full;
    if (preferred?.source_url) return preferred.source_url;
  }

  return null;
}

export function getPostCategories(post: WordPressPost, categories: WordPressCategory[]): string[] {
  const categoryMap = new Map(categories.map((category) => [category.id, category.name]));

  return post.categories
    .map((categoryId) => categoryMap.get(categoryId))
    .filter((category): category is string => Boolean(category));
}
