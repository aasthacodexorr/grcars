export interface LocationBenefit {
  title: string;
  description: string;
}

export interface LocationTradeOff {
  title: string;
  description: string;
}

export interface LocationSEOContentData {
  guideHeading: string;
  overview?: {
    heading?: string;
    paragraphs: string[];
  };
  keyBenefits?: {
    heading?: string;
    leadText?: string;
    items: LocationBenefit[];
    summary?: string;
  };
  tradeOffs?: {
    heading?: string;
    leadText?: string;
    items: LocationTradeOff[];
    closingNote?: string;
  };
}

export interface LocationPageConfig {
  city: string;
  province: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  heading: string;
  seoContent?: LocationSEOContentData;
}

export const locationPages: Record<string, LocationPageConfig> = {
  brampton: {
    city: "Brampton",
    province: "Ontario",
    slug: "/used-car-dealership-brampton",
    primaryKeyword: "used car dealership Brampton",
    secondaryKeywords: [
      "best used car dealership Brampton",
      "car dealers in Brampton",
      "cheap used cars Brampton",
    ],
    title: "Used Car Dealership Brampton | Best Car Dealers & Cheap Used Cars | GR Cars",
    description:
      "Looking for the best used car dealership Brampton has to offer? Explore cheap used cars and top-rated vehicles from trusted car dealers in Brampton at GR Cars.",
    heading: "Used Car Dealership in Brampton, Ontario",
    seoContent: {
      guideHeading: "Brampton Used Car Guide",
      // Client will provide the final SEO content for this city.
      overview: {
        heading: "Overview",
        paragraphs: [],
      },
      keyBenefits: {
        heading: "Key benefits",
        leadText: "Buying a used car in Brampton comes with several advantages, including:",
        items: [],
        summary: "",
      },
      tradeOffs: {
        heading: "Potential trade-offs",
        leadText: "While buying a used car in Brampton offers great value, consider these trade-offs:",
        items: [],
        closingNote: "",
      },
    },
  },
  mississauga: {
    city: "Mississauga",
    province: "Ontario",
    slug: "/used-car-dealership-mississauga",
    primaryKeyword: "used car dealer Mississauga",
    secondaryKeywords: [
      "affordable used cars Mississauga",
      "cheap used cars Mississauga",
      "sell my car Mississauga",
    ],
    title: "Used Car Dealer Mississauga | Affordable & Cheap Used Cars | GR Cars",
    description:
      "Visit GR Cars, your premier used car dealer Mississauga. Browse affordable and cheap used cars in Mississauga or get top dollar when you sell my car Mississauga.",
    heading: "Used Car Dealer in Mississauga, Ontario",
    seoContent: {
      guideHeading: "Mississauga Used Car Guide",
      // Client will provide the final SEO content for this city.
      overview: {
        heading: "Overview",
        paragraphs: [],
      },
      keyBenefits: {
        heading: "Key benefits",
        leadText: "Buying a used car in Mississauga comes with several advantages, including:",
        items: [],
        summary: "",
      },
      tradeOffs: {
        heading: "Potential trade-offs",
        leadText: "While buying a used car in Mississauga offers great value, consider these trade-offs:",
        items: [],
        closingNote: "",
      },
    },
  },
  toronto: {
    city: "Toronto",
    province: "Ontario",
    slug: "/used-car-dealership-toronto",
    primaryKeyword: "used car dealership Toronto",
    secondaryKeywords: [
      "cheap used cars Toronto",
      "sell my car Toronto",
      "affordable used cars Toronto",
    ],
    title: "Used Car Dealership Toronto | Affordable & Cheap Used Cars | GR Cars",
    description:
      "Find quality vehicles at GR Cars, the top used car dealership Toronto. Shop affordable & cheap used cars in Toronto, or sell my car Toronto for top value.",
    heading: "Used Car Dealership in Toronto, Ontario",
    seoContent: {
      guideHeading: "Toronto Used Car Guide",
      overview: {
        heading: "Overview",
        paragraphs: [
          "In a city as dynamic as Toronto, used cars are a practical and popular choice for drivers seeking affordability, variety, and reliability. Whether navigating the busy downtown streets, commuting on the Gardiner Expressway, or braving snowy winters, used cars provide versatility for Toronto's diverse driving needs.",
          "Compared to new cars, used vehicles offer significant cost savings and better value retention. While new cars depreciate quickly within the first few years, used cars have already undergone most of their depreciation, making them a smart investment. From fuel-efficient sedans to family-friendly SUVs, Toronto's used car market caters to a range of lifestyles.",
          "For those new to the process, understanding Ontario's unique buying process is key. Researching vehicle history and choosing a reputable dealership helps you navigate your purchase with confidence.",
        ],
      },
      keyBenefits: {
        heading: "Key benefits",
        leadText: "Buying a used car in Toronto comes with several advantages, including:",
        items: [
          {
            title: "Cost Savings",
            description:
              "Used cars are often significantly cheaper than new models, helping offset Toronto's high cost of living.",
          },
          {
            title: "Diverse Inventory",
            description:
              "Toronto's large and dynamic population ensures a wide variety of used cars for sale, from compact city vehicles to family SUVs.",
          },
          {
            title: "Lower Insurance Rates",
            description:
              "Ontario insurance premiums are typically lower for used vehicles, especially for experienced drivers.",
          },
          {
            title: "Eco-Friendly Choice",
            description:
              "Extending the life of a pre-owned vehicle reduces waste and environmental impact.",
          },
          {
            title: "Adaptability",
            description:
              "With the flexibility to choose vehicles that fit Toronto's specific needs—whether for downtown commutes or weekend road trips to Niagara or Muskoka—you can find a car that works for your lifestyle.",
          },
        ],
        summary:
          "Toronto's used car market balances affordability and variety, making it ideal for anyone.",
      },
      tradeOffs: {
        heading: "Potential trade-offs",
        leadText: "While buying a used car in Toronto offers great value, consider these trade-offs:",
        items: [
          {
            title: "Parking Challenges",
            description:
              "Compact cars are ideal for navigating Toronto, but parking spaces can still be scarce and expensive, especially downtown.",
          },
          {
            title: "Higher Mileage",
            description:
              "Many used cars in Toronto see heavy urban use, which may lead to more wear and tear.",
          },
          {
            title: "Limited Customization",
            description:
              "The pre-owned market depends on available inventory, so finding your preferred trim or features might take longer.",
          },
          {
            title: "Maintenance Needs",
            description:
              "Older vehicles may require more frequent servicing, especially in harsh winter conditions typical of Toronto.",
          },
          {
            title: "Urban Driving History",
            description:
              "Cars from Toronto's traffic-heavy streets might show signs of frequent stop-and-go driving.",
          },
        ],
        closingNote:
          "Understanding these considerations will help you find the best used car to meet your Toronto-specific needs.",
      },
    },
  },
  milton: {
    city: "Milton",
    province: "Ontario",
    slug: "/used-car-dealership-milton",
    primaryKeyword: "used cars for sale in Milton",
    secondaryKeywords: [
      "used car dealership Milton Ontario",
      "cheap used cars Milton",
    ],
    title: "Used Cars for Sale in Milton | Used Car Dealership Milton Ontario | GR Cars",
    description:
      "Explore reliable used cars for sale in Milton at GR Cars. Your trusted used car dealership Milton Ontario offering cheap used cars with transparent pricing.",
    heading: "Used Cars for Sale in Milton, Ontario",
    seoContent: {
      guideHeading: "Milton Used Car Guide",
      // Client will provide the final SEO content for this city.
      overview: {
        heading: "Overview",
        paragraphs: [],
      },
      keyBenefits: {
        heading: "Key benefits",
        leadText: "Buying a used car in Milton comes with several advantages, including:",
        items: [],
        summary: "",
      },
      tradeOffs: {
        heading: "Potential trade-offs",
        leadText: "While buying a used car in Milton offers great value, consider these trade-offs:",
        items: [],
        closingNote: "",
      },
    },
  },
  caledon: {
    city: "Caledon",
    province: "Ontario",
    slug: "/used-car-dealership-caledon",
    primaryKeyword: "used cars for sale Caledon",
    secondaryKeywords: [
      "affordable used cars Caledon",
      "used car dealer near Caledon",
    ],
    title: "Used Cars for Sale Caledon | Used Car Dealer Near Caledon | GR Cars",
    description:
      "Discover top-quality used cars for sale Caledon at GR Cars. Your premier used car dealer near Caledon offering affordable used cars and flexible financing.",
    heading: "Used Cars for Sale in Caledon, Ontario",
    seoContent: {
      guideHeading: "Caledon Used Car Guide",
      // Client will provide the final SEO content for this city.
      overview: {
        heading: "Overview",
        paragraphs: [],
      },
      keyBenefits: {
        heading: "Key benefits",
        leadText: "Buying a used car in Caledon comes with several advantages, including:",
        items: [],
        summary: "",
      },
      tradeOffs: {
        heading: "Potential trade-offs",
        leadText: "While buying a used car in Caledon offers great value, consider these trade-offs:",
        items: [],
        closingNote: "",
      },
    },
  },
};

export function getLocationPage(cityKey: string): LocationPageConfig | undefined {
  const normalizedKey = cityKey?.toLowerCase().trim();
  return locationPages[normalizedKey];
}

export function getAllLocationSlugs(): string[] {
  return Object.values(locationPages).map((loc) => loc.slug);
}
