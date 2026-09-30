export const DEFAULT_BLOG_SUBDOMAIN = "https://blog.grcars.ca";

export function getBlogBaseUrl(host?: string): string {
  return DEFAULT_BLOG_SUBDOMAIN;
}

export function getBlogUrl(slug?: string, host?: string): string {
  const base = getBlogBaseUrl(host);
  if (!slug) return `${base}/`;
  const cleanSlug = slug.replace(/^\/?blogs\//, "").replace(/^\/+|\/+$/g, "");
  return `${base}/${cleanSlug}/`;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  year: number;
}

export const BLOG_POSTS_LIST: BlogPostItem[] = [
  // 2026
  {
    slug: "how-to-keep-10-year-old-car-engine-running-smoothly",
    title: "How to Keep a 10-Year-Old Car Engine Running Smoothly",
    year: 2026,
  },
  {
    slug: "the-role-of-engine-oil-in-vehicle-safety",
    title: "The Role of Engine Oil in Vehicle Safety",
    year: 2026,
  },
  {
    slug: "credit-score-good-you-may-still-qualify-for-car-financing-in-canada",
    title: "Credit Score Good: You May Still Qualify for Car Financing in Canada",
    year: 2026,
  },
  {
    slug: "top-mistakes-canadians-make-when-applying-for-a-used-car-loan",
    title: "Top Mistakes Canadians Make When Applying for a Used Car Loan",
    year: 2026,
  },
  {
    slug: "how-to-improve-fuel-efficiency-of-an-old-engine",
    title: "How to Improve Fuel Efficiency of an Old Engine",
    year: 2026,
  },
  {
    slug: "2026-best-mid-size-suv-toyota-grand-highlander-hybrid",
    title: "2026 Best Mid-Size SUV: Toyota Grand Highlander Hybrid",
    year: 2026,
  },
  {
    slug: "2026-best-family-sedan-honda-accord",
    title: "2026 Best Family Sedan: Honda Accord",
    year: 2026,
  },
  {
    slug: "2026-best-large-luxury-car-bmw-5-series-i5-canada-buyers-guide-trims-and-rivals",
    title: "2026 Best Large Luxury Car: BMW 5 Series / i5 Canada Buyer's Guide, Trims and Rivals",
    year: 2026,
  },
  {
    slug: "gedi-route-cars-2026-best-full-size-truck-ford-f-150",
    title: "Gedi Route Cars: 2026 Best Full-Size Truck - Ford F-150",
    year: 2026,
  },
  {
    slug: "2026-best-full-size-suv-chevrolet-suburban-tahoe",
    title: "2026 Best Full-Size SUV: Chevrolet Suburban / Tahoe",
    year: 2026,
  },
  {
    slug: "how-to-prepare-a-used-car-engine-for-long-road-trips",
    title: "How to Prepare a Used Car Engine for Long Road Trips",
    year: 2026,
  },
  {
    slug: "how-engine-maintenance-impacts-resale-value-of-a-used-car",
    title: "How Engine Maintenance Impacts Resale Value of a Used Car",
    year: 2026,
  },
  {
    slug: "used-car-maintenance-tips-keep-your-pre-owned-vehicle-running-like-new",
    title: "Used Car Maintenance Tips: Keep Your Pre-Owned Vehicle Running Like New",
    year: 2026,
  },
  {
    slug: "the-role-of-ai-and-smart-tech-in-smooth-luxury-sedan-driving",
    title: "The Role of AI and Smart Tech in Smooth Luxury Sedan Driving",
    year: 2026,
  },
  {
    slug: "smart-buyers-guide-best-used-cars-in-canada-for-2026",
    title: "Smart Buyer's Guide: Best Used Cars in Canada for 2026",
    year: 2026,
  },

  // 2025
  {
    slug: "ac-compressor-issues-symptoms-causes-and-solutions",
    title: "AC Compressor Issues: Symptoms, Causes, and Solutions",
    year: 2025,
  },
  {
    slug: "how-temperature-changes-affect-your-tire-pressure",
    title: "How Temperature Changes Affect Your Tire Pressure",
    year: 2025,
  },
  {
    slug: "finance-options-for-part-time-workers-or-gig-workers",
    title: "Finance Options for Part-Time Workers or Gig Workers",
    year: 2025,
  },
  {
    slug: "how-to-finance-a-used-car-as-a-single-parent",
    title: "How to Finance a Used Car as a Single Parent",
    year: 2025,
  },
  {
    slug: "top-5-used-jaguar-sedans-you-can-still-afford",
    title: "Top 5 Used Jaguar Sedans You Can Still Afford",
    year: 2025,
  },
  {
    slug: "everything-you-need-to-know-about-buying-a-used-hatchback",
    title: "Everything You Need to Know About Buying a Used Hatchback",
    year: 2025,
  },
  {
    slug: "the-ultimate-checklist-for-used-hatchback-buyers",
    title: "The Ultimate Checklist for Used Hatchback Buyers",
    year: 2025,
  },
  {
    slug: "top-reasons-to-buy-a-used-hatchback-car-in-2026",
    title: "Top Reasons to Buy a Used Hatchback Car in 2026",
    year: 2025,
  },
  {
    slug: "why-bmw-performance-sedans-are-worth-every-dollar-used",
    title: "Why BMW Performance Sedans Are Worth Every Dollar Used",
    year: 2025,
  },
  {
    slug: "top-luxury-cars-with-high-resale-value-in-canada",
    title: "Top Luxury Cars with High Resale Value in Canada",
    year: 2025,
  },
  {
    slug: "top-5-used-suvs-for-growing-families-in-2025",
    title: "Top 5 Used SUVs for Growing Families in 2025",
    year: 2025,
  },
  {
    slug: "the-impact-of-inflation-on-auto-loan-rates-in-canada",
    title: "The Impact of Inflation on Auto Loan Rates in Canada",
    year: 2025,
  },
  {
    slug: "your-trade-in-or-junk-car-in-brampton",
    title: "Your Trade-In or Junk Car in Brampton",
    year: 2025,
  },
  {
    slug: "best-used-pickup-trucks-in-ontario",
    title: "Best Used Pickup Trucks in Ontario",
    year: 2025,
  },
  {
    slug: "can-you-get-a-car-loan-with-bad-credit-in-ontario",
    title: "Can You Get a Car Loan with Bad Credit in Ontario?",
    year: 2025,
  },
  {
    slug: "what-documents-are-needed-for-used-car-financing",
    title: "What Documents Are Needed for Used Car Financing?",
    year: 2025,
  },
  {
    slug: "how-to-improve-your-credit-while-driving-the-luxury-car-you-love",
    title: "How to Improve Your Credit While Driving the Luxury Car You Love",
    year: 2025,
  },
  {
    slug: "how-to-finance-a-luxury-used-car-with-bad-or-average-credit",
    title: "How to Finance a Luxury Used Car with Bad or Average Credit",
    year: 2025,
  },
  {
    slug: "how-to-finance-a-luxury-used-car-without-breaking-the-bank",
    title: "How to Finance a Luxury Used Car Without Breaking the Bank",
    year: 2025,
  },

  // 2024
  {
    slug: "the-ultimate-checklist-for-buying-a-used-car",
    title: "The Ultimate Checklist for Buying a Used Car",
    year: 2024,
  },
  {
    slug: "how-to-prepare-for-buying-a-used-car-on-orenda-rd-brampton-on",
    title: "How to Prepare for Buying a Used Car on Orenda Rd Brampton ON",
    year: 2024,
  },
  {
    slug: "how-to-get-the-best-financing-for-a-used-car",
    title: "How to Get the Best Financing for a Used Car",
    year: 2024,
  },
  {
    slug: "how-to-extend-the-life-of-your-used-cars-tires",
    title: "How to Extend the Life of Your Used Car's Tires",
    year: 2024,
  },
  {
    slug: "how-to-increase-the-resale-value-of-your-used-car",
    title: "How to Increase the Resale Value of Your Used Car",
    year: 2024,
  },
  {
    slug: "see-what-your-vehicle-is-worth-get-an-instant-cash-offer-in-minutes",
    title: "See What Your Vehicle Is Worth: Get an Instant Cash Offer in Minutes",
    year: 2024,
  },
  {
    slug: "finding-the-best-used-car-dealership-in-brampton-for-your-next-vehicle",
    title: "Finding the Best Used Car Dealership in Brampton for Your Next Vehicle",
    year: 2024,
  },
  {
    slug: "top-5-off-road-vehicles-for-adventure-seekers",
    title: "Top 5 Off-Road Vehicles for Adventure Seekers",
    year: 2024,
  },
  {
    slug: "how-to-buy-a-car-online-safely-and-securely",
    title: "How to Buy a Car Online Safely and Securely",
    year: 2024,
  },
  {
    slug: "top-tips-for-finding-the-best-used-cars-and-suvs-for-sale-in-brampton-on",
    title: "Top Tips for Finding the Best Used Cars and SUVs for Sale in Brampton ON",
    year: 2024,
  },
  {
    slug: "why-choosing-the-right-car-dealership-makes-all-the-difference",
    title: "Why Choosing the Right Car Dealership Makes All the Difference",
    year: 2024,
  },
  {
    slug: "maximizing-your-vehicles-resale-value",
    title: "Maximizing Your Vehicle's Resale Value",
    year: 2024,
  },
  {
    slug: "top-tips-for-maintaining-your-pre-owned-vehicle",
    title: "Top Tips for Maintaining Your Pre-Owned Vehicle",
    year: 2024,
  },
  {
    slug: "the-importance-of-routine-vehicle-inspections",
    title: "The Importance of Routine Vehicle Inspections",
    year: 2024,
  },
  {
    slug: "discovering-gedi-route-your-gateway-to-quality-cars-in-brampton",
    title: "Discovering Gedi Route: Your Gateway to Quality Cars in Brampton",
    year: 2024,
  },
];
