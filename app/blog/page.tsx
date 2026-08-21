// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/layout";

const POSTS = [
  {
    id: "450374",
    title: "How to Keep a 10-Year-Old Car Engine Running Smoothly",
    slug: "how-to-keep-10-year-old-car-engine-running-smoothly",
    date: "Aug 10, 2026",
    categories: ["Maintenance"],
    excerpt:
      "10-year-old car maintenance, older car engine maintenance, high-mileage car maintenance, extend car engine life, car maintenance tips. A 10-year-old car does not automatically mean an unreliable car. With consistent maintenance and attention to...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/08/Gloved-Hands-Service-Technician-Engine1-400x250.jpg",
  },
  {
    id: "450309",
    title: "Credit Score: Good? You May Still Qualify for Car Financing in Canada",
    slug: "credit-score-good-you-may-still-qualify-for-car-financing-in-canada",
    date: "Jun 8, 2026",
    categories: ["Car Finance", "Car Loans"],
    excerpt:
      "Many Canadians assume they need a perfect credit score to get approved for vehicle financing. If your credit score is only 'good' rather than excellent, you might wonder whether purchasing your next vehicle is realistic. The good news is that...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/06/image.avif",
  },
  {
    id: "450244",
    title: "How to Improve Fuel Efficiency of an Old Engine",
    slug: "how-to-improve-fuel-efficiency-of-an-old-engine",
    date: "Jun 5, 2026",
    categories: ["Car Guides", "Maintenance"],
    excerpt:
      "Owning an older vehicle doesn't mean you have to settle for poor fuel economy. With the right maintenance habits and smart upgrades, you can significantly improve how efficiently your engine consumes fuel. Whether you're trying to save money on...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/04/tips-to-increase-diesel-engine-efficiency-400x250.jpg",
  },
  {
    id: "450200",
    title: "2026 Best Family Sedan: Honda Accord",
    slug: "2026-best-family-sedan-honda-accord",
    date: "May 9, 2026",
    categories: ["Car Finance", "Car Guides"],
    excerpt:
      "You're shopping SUV midsize? The Accord earns our 2026 Best Family Sedan pick for its roomier back seat, stellar driver tech, and lower Canadian ownership costs; total 7-ways interior trim and year-18 year window tinting, car seats, and badges—then set...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/05/1-Major-Auto-Finance-Scandal-UK-400x250.jpg",
  },
  {
    id: "450188",
    title: "Gedi Route Cars 2026 Best Full-Size Truck: Ford F-150",
    slug: "gedi-route-cars-2026-best-full-size-truck-ford-f150",
    date: "May 7, 2026",
    categories: ["Maintenance"],
    excerpt:
      "We named our 2026 Best Full-Size Truck pick the Ford F-150. Overwhelmed by specs, tow ratings, and payments? No spin: in plain English, we know why the F-150 keeps running for Ontario drivers who do 12,000 km or cross-sheet field tasks...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/03/grcars-400x250.png",
  },
  {
    id: "450362",
    title: "The Role of Engine Oil in Vehicle Safety",
    slug: "the-role-of-engine-oil-in-vehicle-safety",
    date: "Jul 15, 2026",
    categories: ["Car Guides", "Car Loans"],
    excerpt:
      "When people think about vehicle safety, features like airbags, anti-lock brakes, and advanced driver assistance systems usually come to mind. However, one of the most important components to safety & driving in harsh conditions—engine oil—is often...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/04/tips-to-increase-diesel-engine-efficiency-400x250.jpg",
  },
  {
    id: "450267",
    title: "Top Mistakes Canadians Make When Applying for a Used Car Loan",
    slug: "top-mistakes-canadians-make-when-applying-for-a-used-car-loan",
    date: "May 14, 2026",
    categories: ["Driving Tips", "Maintenance"],
    excerpt:
      "Buying a used car is one of the smartest financial decisions many Canadians make. It allows drivers to enjoy reliable transportation without the steep depreciation that comes with buying brand-new vehicles. However, while shopping the used car market...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/05/1-Major-Auto-Finance-Scandal-UK-400x250.jpg",
  },
  {
    id: "449999",
    title: "2026 Best Mid-Size SUV: Toyota Grand Highlander / Hybrid",
    slug: "2026-best-mid-size-suv-toyota-grand-highlander-hybrid",
    date: "May 6, 2026",
    categories: ["Car Guides", "Maintenance"],
    excerpt:
      "The family SUV that doesn't force compromises. Awards are nice, but your Tuesday 7 a.m. shuffle in ice and sleet + hockey bag by the door, three car seats, backpack, coffee in the cupholder, and plain showing up Highway 401—is the real test of your family...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/03/grcars-400x250.png",
  },
  {
    id: "449980",
    title: "2026 Best Large Luxury Car: BMW 5 Series / i5 — Canada Buyer's Guide, Trims, and Rivals",
    slug: "2026-best-large-luxury-car-bmw-5-series-i5-canada-buyers-guide",
    date: "May 5, 2026",
    categories: ["Car Loans", "Maintenance"],
    excerpt:
      "One buyer guide that moves you. From real-world zero-emission choices to PHEV, with EV plus row seats options up to i5 eDrive40, i5 M60, and 530i xDrive. Why the BMW 5 Series / i5 leads in 2026 Canada styling, performance, PHEV line-up in brand, or the BMW website...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/08/Gloved-Hands-Service-Technician-Engine1-400x250.jpg",
  },
  {
    id: "449970",
    title: "2026 Best Full-Size SUV: Chevrolet Suburban / Tahoe",
    slug: "2026-best-full-size-suv-chevrolet-suburban-tahoe",
    date: "May 5, 2026",
    categories: ["Car Finance", "Car Guides", "Maintenance"],
    excerpt:
      "Our verdict for 2026: the Chevrolet Suburban and Tahoe are the best full-size SUVs for real Canadian families and towing. They combine sit-anywhere cabin space with robust engine options, and generous cargo capacity with room to grow. Get experience... Third bench...",
    image: "https://grcars.b-cdn.net/wp-content/uploads/2026/06/image.avif",
  },
];

const CATEGORIES = [
  "Car Finance",
  "Car Guides",
  "Car Loans",
  "Driving Tips",
  "Maintenance",
  "Resources",
  "Uncategorized",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />

      {/* Main Container */}
      <main className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area (3 Columns) */}
          <section className="lg:col-span-3 space-y-8">
            <div className="divide-y divide-gray-100 space-y-8">
              {POSTS.map((post) => (
                <article
                  key={post.id}
                  className="pt-8 first:pt-0 flex flex-col md:flex-row gap-6 items-start"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/${post.slug}`}
                    className="relative w-full md:w-80 shrink-0 aspect-[16/10] overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl text-gray-900 leading-snug mb-2 hover:text-blue-600">
                      <Link href={`/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <div className="text-sm text-gray-700 mb-3 space-x-1">
                      <span>{post.date}</span>
                      <span>|</span>
                      {post.categories.map((cat, idx) => (
                        <span key={cat}>
                          <Link
                            href={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                            className="hover:underline"
                          >
                            {cat}
                          </Link>
                          {idx < post.categories.length - 1 && ", "}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Older Entries Pagination Link */}
            {/* <div className="pt-6">
              <Link
                href="/blog/page/2"
                className="text-xs font-semibold text-blue-500 hover:text-blue-700 hover:underline"
              >
                « Older Entries
              </Link>
            </div> */}
          </section>

          {/* Sidebar Area (1 Column) */}
          <aside className="lg:col-span-1">
            <div className="bg-[#e2e2e2] p-5 shadow-sm">
              <h3 className="text-base font-bold text-gray-800 mb-3">
                Browse by Category
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {CATEGORIES.map((category) => (
                  <li key={category} className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-[14px]">»</span>
                    <Link
                      href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Call To Action Section */}
      <section className="bg-[#212121] text-white py-12 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Car Image Overlay */}
          <div className="relative w-80 md:w-96 h-36 mx-auto -mt-20 mb-4">
            <Image
              src="https://grcars.b-cdn.net/wp-content/uploads/2022/07/car-1.png"
              alt="Red Sports Car"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Find Your Next Car
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/inventory"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0066cc] hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              SEARCH ALL VEHICLES
            </Link>
            <span className="text-xs text-gray-400 font-bold uppercase py-1">
              OR
            </span>
            <Link
              href="/finance"
              className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-gray-100 text-[#0066cc] font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              GET PRE-APPROVED
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}