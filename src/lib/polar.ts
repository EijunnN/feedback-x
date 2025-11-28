import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    projects: 1,
    feedbacksPerMonth: 50,
    allowImages: false,
  },
  pro: {
    name: "Pro",
    price: 9,
    projects: 5,
    feedbacksPerMonth: 500,
    allowImages: true,
    polarProductId: process.env.POLAR_PRO_PRODUCT_ID,
  },
  max: {
    name: "Max",
    price: 29,
    projects: Infinity,
    feedbacksPerMonth: Infinity,
    allowImages: true,
    polarProductId: process.env.POLAR_MAX_PRODUCT_ID,
  },
} as const;
