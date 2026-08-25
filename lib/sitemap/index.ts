export {
  SITE_BASE_URL,
  CARDORA_POSTS_BASE_URL,
  SITEMAP_INDEX,
  SITE_PAGES,
  SITE_POSTS_2024,
  SITE_POSTS_2025,
  SITE_POSTS_2026,
  INVENTORY_SITEMAP_API,
  INVENTORY_HOST_REWRITES,
} from './config';
export { getSitemapBaseUrl } from './getBaseUrl';
export { xmlResponse, buildIndexXml, buildUrlsetXml, buildPostsXml } from './xml';
