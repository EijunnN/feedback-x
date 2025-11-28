import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects, subscriptions } from "@/db/schema";
import { PLANS, type PlanType } from "@/lib/plans";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const projectKey = searchParams.get("key");
  const origin = request.headers.get("origin");

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (!projectKey) {
    return NextResponse.json(
      { error: "Missing project key" },
      { status: 400, headers: corsHeaders },
    );
  }

  const project = await db
    .select()
    .from(projects)
    .where(eq(projects.apiKey, projectKey))
    .then((rows) => rows[0]);

  if (!project) {
    return NextResponse.json(
      { error: "Invalid project key" },
      { status: 404, headers: corsHeaders },
    );
  }

  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, project.userId))
    .then((rows) => rows[0]);

  const plan: PlanType =
    subscription?.status === "active"
      ? (subscription.plan as PlanType) || "free"
      : "free";
  const planLimits = PLANS[plan];

  const config = {
    position: project.widgetPosition || "bottom-right",
    color: planLimits.allowCustomization
      ? project.widgetColor || "#6366f1"
      : "#6366f1",
    text: planLimits.allowCustomization
      ? project.widgetText || "Feedback"
      : "Feedback",
    showBranding: planLimits.allowRemoveBranding
      ? (project.showBranding ?? true)
      : true,
    enableBugs: project.enableBugs ?? true,
    enableIdeas: project.enableIdeas ?? true,
    enableOther: project.enableOther ?? true,
    allowImages: planLimits.allowImages,
  };

  return NextResponse.json(config, { headers: corsHeaders });
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
