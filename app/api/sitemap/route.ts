import { getSitemapBaseUrl } from '@/lib/sitemap/getBaseUrl';
import { INVENTORY_HOST_REWRITES } from '@/lib/sitemap/config';

export const dynamic = 'force-dynamic';

// This endpoint returns JSON for the HTML sitemap page to parse
export async function GET() {
  try {
    const baseUrl = await getSitemapBaseUrl();
    
    const response = await fetch(
      'https://gediroute.zopsoftware.com/api/website/sitemap',
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch sitemap' },
        { status: 500 }
      );
    }

    let xml = await response.text();

    // Replace hardcoded domain with environment-aware base URL
    for (const host of INVENTORY_HOST_REWRITES) {
      xml = xml.replaceAll(host, baseUrl);
    }

    // Reformat inventory URLs from /inventory/{slug}/{id}/ to /inventory/{id}-{slug}
    // This changes URLs like: /inventory/2025-toyota-camry-hybrid-se-upgrade-awd/2578/
    // To: /inventory/2578-2025-toyota-camry-hybrid-se-upgrade-awd
    xml = xml.replace(
      /<loc>(.*?\/inventory\/)([^\/]+)\/(\d+)\/<\/loc>/g,
      (_match, baseWithPath, slug, id) => {
        return `<loc>${baseWithPath}${id}-${slug}</loc>`;
      }
    );

    return Response.json({ xml });
  } catch (error) {
    console.error('Sitemap fetch error:', error);

    return Response.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}


