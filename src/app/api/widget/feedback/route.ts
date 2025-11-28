import { and, eq, gte, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { feedbacks, projects, subscriptions } from "@/db/schema";

const PLAN_LIMITS = {
  free: { feedbacksPerMonth: 50, allowImages: false },
  pro: { feedbacksPerMonth: 500, allowImages: true },
  max: { feedbacksPerMonth: Infinity, allowImages: true },
};

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await request.json();
    const { projectKey, type, message, image, metadata, userEmail } = body;

    if (!projectKey || !type || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
        { status: 401, headers: corsHeaders },
      );
    }

    if (project.domain && origin) {
      const originHost = new URL(origin).hostname;
      if (!originHost.endsWith(project.domain)) {
        return NextResponse.json(
          { error: "Domain not allowed" },
          { status: 403, headers: corsHeaders },
        );
      }
    }

    const subscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, project.userId))
      .then((rows) => rows[0]);

    const plan = (subscription?.plan as keyof typeof PLAN_LIMITS) || "free";
    const limits = PLAN_LIMITS[plan];

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const feedbackCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(feedbacks)
      .where(
        and(
          eq(feedbacks.projectId, project.id),
          gte(feedbacks.createdAt, startOfMonth),
        ),
      )
      .then((rows) => Number(rows[0].count));

    if (feedbackCount >= limits.feedbacksPerMonth) {
      return NextResponse.json(
        { error: "Monthly feedback limit reached" },
        { status: 429, headers: corsHeaders },
      );
    }

    let imageUrl: string | null = null;
    if (image && limits.allowImages) {
      imageUrl = await uploadToImageKit(image);
    }

    await db.insert(feedbacks).values({
      id: nanoid(),
      projectId: project.id,
      type,
      message,
      imageUrl,
      userEmail: userEmail || null,
      metadata: metadata || null,
    });

    return NextResponse.json(
      { success: true },
      { status: 201, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

async function uploadToImageKit(base64Image: string): Promise<string | null> {
  try {
    const response = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64Image,
          fileName: `feedback-${nanoid()}.png`,
          folder: "/feedback",
        }),
      },
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.url;
  } catch {
    return null;
  }
}
