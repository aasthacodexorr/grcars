import { GET_SITEMAP_INDEX } from '@/lib/sitemap/handlers';

export const dynamic = 'force-dynamic';

export async function GET() {
  return GET_SITEMAP_INDEX();
}
