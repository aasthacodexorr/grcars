export type SitemapIndexItem = {
  path: string;
  lastmod?: string;
};

// URLs are now environment-aware via getSitemapBaseUrl()
// These constants are kept for reference but should not be used directly in URL generation

export const SITEMAP_INDEX: SitemapIndexItem[] = [
  {
    path: '/sitemap-posttype-post.2026.xml',
    lastmod: '2026-08-11T15:23:01+00:00',
  },
  {
    path: '/sitemap-posttype-post.2025.xml',
    lastmod: '2025-12-30T07:26:30+00:00',
  },
  {
    path: '/sitemap-posttype-post.2024.xml',
    lastmod: '2024-12-23T16:59:14+00:00',
  },
  {
    path: '/sitemap-posttype-page.xml',
    lastmod: '2026-07-24T10:05:54+00:00',
  },
  {
    path: '/website/sitemap',
  },
];

export const SITE_PAGES = [
  '/used-volkswagen-brampton/',
  '/used-nissan-brampton/',
  '/used-jeep-brampton/',
  '/used-hyundai-brampton/',
  '/used-bmw-brampton/',
  '/used-audi-brampton/',
  '/used-gmc-brampton/',
  '/used-ford-brampton/',
  '/used-dodge-brampton/',
  '/used-chrysler-brampton/',
  '/used-toyota-brampton/',
  '/used-honda-brampton/',
  '/internal-trade',
  '/test-form',
  '/vehicle-financing/',
  '/about-us/',
  '/payment-calculator/',
  '/thank-you/',
  '/sitemap/',
  '/privacy-policy/',
  '/terms-conditions/',
  '/contact-us/',
  '/book-an-appointment/',
  '/finance/',
  '/inventory/',
  '/lowest-price-guaranteed/'
];

export const SITE_POSTS_2026 = [
  '/how-to-keep-10-year-old-car-engine-running-smoothly/',
  '/the-role-of-engine-oil-in-vehicle-safety/',
  '/credit-score-good-you-may-still-qualify-for-car-financing-in-canada/',
  '/top-mistakes-canadians-make-when-applying-for-a-used-car-loan/',
  '/how-to-improve-fuel-efficiency-of-an-old-engine/',
  '/2026-best-mid-size-suv-toyota-grand-highlander-hybrid/',
  '/2026-best-family-sedan-honda-accord/',
  '/2026-best-large-luxury-car-bmw-5-series-i5-canada-buyers-guide-trims-and-rivals/',
  '/gedi-route-cars-2026-best-full-size-truck-ford-f-150/',
  '/2026-best-full-size-suv-chevrolet-suburban-tahoe/',
  '/how-to-prepare-a-used-car-engine-for-long-road-trips/',
  '/how-engine-maintenance-impacts-resale-value-of-a-used-car/',
  '/used-car-maintenance-tips-keep-your-pre-owned-vehicle-running-like-new/',
  '/the-role-of-ai-and-smart-tech-in-smooth-luxury-sedan-driving/',
  '/smart-buyers-guide-best-used-cars-in-canada-for-2026/',
];

export const SITE_POSTS_2025 = [
  '/ac-compressor-issues-symptoms-causes-and-solutions/',
  '/how-temperature-changes-affect-your-tire-pressure/',
  '/finance-options-for-part-time-workers-or-gig-workers/',
  '/how-to-finance-a-used-car-as-a-single-parent/',
  '/top-5-used-jaguar-sedans-you-can-still-afford/',
  '/everything-you-need-to-know-about-buying-a-used-hatchback/',
  '/the-ultimate-checklist-for-used-hatchback-buyers/',
  '/top-reasons-to-buy-a-used-hatchback-car-in-2026/',
  '/why-bmw-performance-sedans-are-worth-every-dollar-used/',
  '/top-luxury-cars-with-high-resale-value-in-canada/',
  '/top-5-used-suvs-for-growing-families-in-2025/',
  '/the-impact-of-inflation-on-auto-loan-rates-in-canada/',
  '/your-trade-in-or-junk-car-in-brampton/',
  '/best-used-pickup-trucks-in-ontario/',
  '/can-you-get-a-car-loan-with-bad-credit-in-ontario/',
  '/what-documents-are-needed-for-used-car-financing/',
  '/how-to-improve-your-credit-while-driving-the-luxury-car-you-love/',
  '/how-to-finance-a-luxury-used-car-with-bad-or-average-credit/',
  '/how-to-finance-a-luxury-used-car-without-breaking-the-bank/',
];

export const SITE_POSTS_2024 = [
  '/the-ultimate-checklist-for-buying-a-used-car/',
  '/how-to-prepare-for-buying-a-used-car-on-orenda-rd-brampton-on/',
  '/how-to-get-the-best-financing-for-a-used-car/',
  '/how-to-extend-the-life-of-your-used-cars-tires/',
  '/how-to-increase-the-resale-value-of-your-used-car/',
  '/see-what-your-vehicle-is-worth-get-an-instant-cash-offer-in-minutes/',
  '/finding-the-best-used-car-dealership-in-brampton-for-your-next-vehicle/',
  '/top-5-off-road-vehicles-for-adventure-seekers/',
  '/how-to-buy-a-car-online-safely-and-securely/',
  '/top-tips-for-finding-the-best-used-cars-and-suvs-for-sale-in-brampton-on/',
  '/why-choosing-the-right-car-dealership-makes-all-the-difference/',
  '/maximizing-your-vehicles-resale-value/',
  '/top-tips-for-maintaining-your-pre-owned-vehicle/',
  '/the-importance-of-routine-vehicle-inspections/',
  '/discovering-gedi-route-your-gateway-to-quality-cars-in-brampton/',
];

export const INVENTORY_SITEMAP_API =
  'https://gediroute.zopsoftware.com/api/website/sitemap';

export const INVENTORY_HOST_REWRITES = [
  'https://www.grcars.ca',
  'https://grcars.ca',
  'https://gediroute.zopsoftware.com',
  'http://localhost:3000',
  'http://localhost:3001',
] as const;

export const SITEMAP_LOGO_SRC =
  'data:image/gif;base64,R0lGODlhUAAPAJEAAGZmZv////9mAImOeSwAAAAAUAAPAAACoISPqcvtD0+YtNqLs968myCE4kiW5jkGw8q27gvDwYfWdq3G+i7T9w/M8Ya7GQAUoiSTEyYSKYA2nSKhdXUdCIlaXzRVDVdB0+dS2lJZ1bkt0Sgti6NysvM5jbq2ai2WywJHYrZUaEhIWJXm99foNiRI9XUoV4g4GJjJyEgBGAkEivIIyPUZeppCqorlheo6ulr00UFba3uLEaG7y9urUAAAOw==';

export function formatSitemapLastmod(iso: string) {
  if (!iso) return '';
  return `${iso.slice(0, 10)} ${iso.slice(11, 19)} (${iso.slice(19, 25)})`;
}
