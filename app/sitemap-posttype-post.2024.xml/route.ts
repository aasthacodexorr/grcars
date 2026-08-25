import { GET_SITEMAP_POSTS_2024 } from '@/lib/sitemap/handlers';

export const dynamic = 'force-dynamic';

export async function GET() {
  return GET_SITEMAP_POSTS_2024();
}
