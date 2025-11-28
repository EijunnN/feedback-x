import { type NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("products");
  const userId = searchParams.get("metadata[userId]");
  const plan = searchParams.get("metadata[plan]");

  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  const checkout = await polar.checkouts.create({
    products: [productId],
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
    metadata: {
      userId: userId || "",
      plan: plan || "pro",
    },
  });

  return NextResponse.redirect(checkout.url);
}
