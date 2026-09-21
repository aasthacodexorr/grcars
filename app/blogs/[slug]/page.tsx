import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/layout";
import { generateMetadata as generateMetadataHelper } from "@/lib/metadataHelper";
import {
  formatWordPressDate,
  getAuthor,
  getFeaturedImage,
  getImageUrl,
  getPostBySlug,
  getWordPressPostSlugFromUrl,
  normalizeWordPressContent,
  stripHtml,
  WORDPRESS_SITE_URL,
} from "@/lib/wordpress";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested GRCars blog post could not be found.",
    };
  }

  const featuredImage = await getFeaturedImage(post.featured_media);
  const featuredImageUrl = getImageUrl(featuredImage) ?? undefined;
  const description = stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 200);
  const canonicalPath = `/blogs/${slug}`;

  const baseMetadata = await generateMetadataHelper({
    title: stripHtml(post.title.rendered),
    description,
    canonicalPath,
    images: featuredImageUrl ? [featuredImageUrl] : undefined,
  });

  const published = post.date ? new Date(post.date) : undefined;
  const modified = post.modified ? new Date(post.modified) : undefined;

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      title: stripHtml(post.title.rendered),
      description,
      url: `https://www.grcars.ca${canonicalPath}`,
      type: "article",
      images: featuredImageUrl ? [{ url: featuredImageUrl, width: 1200, height: 630, alt: stripHtml(post.title.rendered) }] : baseMetadata.openGraph?.images,
      publishedTime: published?.toISOString(),
      modifiedTime: modified?.toISOString(),
    },
    twitter: {
      ...baseMetadata.twitter,
      card: "summary_large_image",
      title: stripHtml(post.title.rendered),
      description,
      images: featuredImageUrl ? [featuredImageUrl] : baseMetadata.twitter?.images,
    },
    alternates: {
      canonical: `https://www.grcars.ca${canonicalPath}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = await getFeaturedImage(post.featured_media);
  const featuredImageUrl = getImageUrl(featuredImage);
  const author = post.author ? await getAuthor(post.author) : null;
  const publishedDate = formatWordPressDate(post.date);
  const modifiedDate = formatWordPressDate(post.modified);
  const richContent = normalizeWordPressContent(post.content.rendered);
  const description = stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 200);
  const canonicalUrl = `https://www.grcars.ca/blogs/${slug}`;
  const authorName = author?.name ?? "GRCars";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: stripHtml(post.title.rendered),
    description,
    image: featuredImageUrl ? [featuredImageUrl] : undefined,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Gedi Route Cars Inc.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.grcars.ca/favicon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-3xl bg-white">
          {featuredImageUrl ? (
            <div className="relative h-[220px] overflow-hidden sm:h-[320px] lg:h-[420px]">
              <Image
                src={featuredImageUrl}
                alt={stripHtml(post.title.rendered)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <time dateTime={post.date}>{publishedDate}</time>
              {modifiedDate && modifiedDate !== publishedDate && (
                <>
                  <span>•</span>
                  <time dateTime={post.modified}>Updated {modifiedDate}</time>
                </>
              )}
              {authorName && (
                <>
                  <span>•</span>
                  <span>By {authorName}</span>
                </>
              )}
            </div>

            <h1 className="mb-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {stripHtml(post.title.rendered)}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              <Link href="/blogs" className="transition-colors hover:text-brand-green-dark">
                Blog
              </Link>
              <span>/</span>
              <span>{slug}</span>
            </div>

            <div className="blog-content prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-brand-green prose-a:no-underline hover:prose-a:text-brand-green-dark prose-strong:text-slate-900 prose-blockquote:border-l-brand-green prose-blockquote:text-slate-600 prose-img:rounded-xl prose-table:border prose-table:border-slate-200 prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3" dangerouslySetInnerHTML={{ __html: richContent }} />
          </div>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Footer />
    </div>
  );
}
