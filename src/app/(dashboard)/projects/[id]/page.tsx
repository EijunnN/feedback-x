import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeedbackCard } from "@/components/feedback-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { feedbacks, projects } from "@/db/schema";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) return null;

  const project = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .then((rows) => rows[0]);

  if (!project) notFound();

  const projectFeedbacks = await db
    .select()
    .from(feedbacks)
    .where(eq(feedbacks.projectId, id))
    .orderBy(desc(feedbacks.createdAt));

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/projects/${id}/settings`}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {projectFeedbacks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground" />
            <div>
              <h2 className="text-xl font-semibold">No feedback yet</h2>
              <p className="text-muted-foreground">
                Install the widget to start collecting feedback
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/projects/${id}/settings`}>View Installation</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {projectFeedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
