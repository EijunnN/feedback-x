import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import { ProjectSettingsForm } from "@/components/project-settings-form";
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
import { projects } from "@/db/schema";
import { getUserPlanDetails } from "@/lib/plans";

async function updateProject(formData: FormData) {
  "use server";

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const domain = formData.get("domain") as string;

  const planDetails = await getUserPlanDetails(userId);

  const updateData: Record<string, unknown> = {
    name,
    domain: domain || null,
  };

  if (planDetails.allowCustomization) {
    updateData.widgetColor = formData.get("widgetColor") as string;
    updateData.widgetPosition = formData.get("widgetPosition") as string;
    updateData.widgetText = formData.get("widgetText") as string;
    updateData.notifyEmail = (formData.get("notifyEmail") as string) || null;
  }

  if (planDetails.allowRemoveBranding) {
    updateData.showBranding = formData.get("showBranding") === "true";
  }

  updateData.enableBugs = formData.get("enableBugs") === "true";
  updateData.enableIdeas = formData.get("enableIdeas") === "true";
  updateData.enableOther = formData.get("enableOther") === "true";

  await db
    .update(projects)
    .set(updateData)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));

  revalidatePath(`/projects/${id}/settings`);
}

async function deleteProject(formData: FormData) {
  "use server";

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));

  redirect("/projects");
}

export default async function ProjectSettingsPage({
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

  const planDetails = await getUserPlanDetails(userId);

  const widgetScript = `<script src="${process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com"}/widget/feedback-widget.js" data-project-key="${project.apiKey}"></script>`;

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
              <BreadcrumbLink href={`/projects/${id}`}>
                {project.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-8 p-4 max-w-2xl">
        <section>
          <h2 className="text-lg font-semibold mb-4">Widget Installation</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Add this script to your website to enable the feedback widget:
          </p>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {widgetScript}
            </pre>
            <CopyButton
              text={widgetScript}
              className="absolute top-2 right-2"
            />
          </div>
        </section>

        <ProjectSettingsForm
          project={project}
          planDetails={planDetails}
          updateAction={updateProject}
        />

        <section>
          <h2 className="text-lg font-semibold mb-4">API Key</h2>
          <div className="flex items-center gap-2">
            <code className="bg-muted px-3 py-2 rounded text-sm flex-1">
              {project.apiKey}
            </code>
            <CopyButton text={project.apiKey} />
          </div>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4 text-destructive">
            Danger Zone
          </h2>
          <form action={deleteProject}>
            <input type="hidden" name="id" value={project.id} />
            <Button type="submit" variant="destructive">
              Delete Project
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
