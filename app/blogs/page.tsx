import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/layout";
import { generateMetadata as generateMetadataHelper } from "@/lib/metadataHelper";
import {
  getCategories,
  getFeaturedImage,
  getImageUrl,
  getPostCategories,
  getPosts,
  stripHtml,
  formatWordPressDate,
} from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: "Car Buying Advice & Auto Tips | GRCars Blog",
    description: "Browse GRCars car buying guides, financing tips, maintenance advice, and automotive articles for Canadian drivers.",
    canonicalPath: "/blogs",
  });
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? "1") || 1;

  const [{ data: posts, totalPages }, categories] = await Promise.all([
    getPosts(currentPage, 12),
    getCategories(),
  ]);

  if (!posts.length && currentPage > 1) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-[1180px] px-4 pb-16 pt-28 sm:px-6 lg:px-8 mt-24 lg:mt-0">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-green">GRCars Insights</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">Latest Articles</h1>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-lg font-semibold text-slate-700">No blog posts are available right now.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {await Promise.all(posts.map(async (post) => {
              const featuredMedia = await getFeaturedImage(post.featured_media);
              const featuredImageUrl = getImageUrl(featuredMedia);
              const categoriesForPost = getPostCategories(post, categories);
              const excerpt = stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 180);

              return (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_16px_35px_rgba(15,23,42,0.10)]"
                >
                  <Link href={`/blogs/${post.slug}`} className="block overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {featuredImageUrl ? (
                        <Image
                          src={featuredImageUrl}
                          alt={post.title.rendered}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                          GRCars
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      <time dateTime={post.date}>{formatWordPressDate(post.date)}</time>
                      {categoriesForPost.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{categoriesForPost.slice(0, 2).join(", ")}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-brand-green">
                      <Link href={`/blogs/${post.slug}`}>{post.title.rendered}</Link>
                    </h2>

                    <p className="text-sm leading-7 text-slate-600">{excerpt}{excerpt.length >= 180 ? "..." : ""}</p>

                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              );
            }))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-3" aria-label="Blog pagination">
            {currentPage > 1 && (
              <Link
                href={`/blogs?page=${currentPage - 1}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green hover:text-brand-green"
              >
                Previous
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={`/blogs?page=${pageNumber}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  pageNumber === currentPage
                    ? "bg-brand-green text-white"
                    : "border border-slate-200 text-slate-700 hover:border-brand-green hover:text-brand-green"
                }`}
              >
                {pageNumber}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                href={`/blogs?page=${currentPage + 1}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green hover:text-brand-green"
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}
