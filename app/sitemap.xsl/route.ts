import { GET_SITEMAP_XSL } from '@/lib/sitemap/handlers';

export const dynamic = 'force-dynamic';

export async function GET() {
  return GET_SITEMAP_XSL();
}
