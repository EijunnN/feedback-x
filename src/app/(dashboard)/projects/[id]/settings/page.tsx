import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { Terminal } from "lucide-react";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { getUserPlanDetails } from "@/lib/plans";
import { toast } from "sonner";
import { DangerModal } from "@/components/danger-modal";
import { Suspense } from "react";

async function updateProject(formData: FormData) {
  "use server";
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const domain = formData.get("domain") as string;
  const planDetails = await getUserPlanDetails(userId);

  const updateData: Record<string, unknown> = { name, domain: domain || null };
  if (planDetails.allowCustomization) {
    updateData.widgetColor = formData.get("widgetColor") as string;
    updateData.widgetPosition = formData.get("widgetPosition") as string;
    updateData.widgetText = formData.get("widgetText") as string;
    updateData.notifyEmail = (formData.get("notifyEmail") as string) || null;
  }
  if (planDetails.allowRemoveBranding) {
    updateData.showBranding = formData.get("showBranding") === "true";
    updateData.brandingText =
      (formData.get("brandingText") as string) || "Powered by Annya";
    updateData.brandingLink =
      (formData.get("brandingLink") as string) || "https://annya.io";
  }
  updateData.enableBugs = formData.get("enableBugs") === "true";
  updateData.enableIdeas = formData.get("enableIdeas") === "true";
  updateData.enableOther = formData.get("enableOther") === "true";

  // Capture matrix customization (all plans)
  updateData.bugLabel = (formData.get("bugLabel") as string) || "Bug";
  updateData.bugEmoji = (formData.get("bugEmoji") as string) || "";
  updateData.ideaLabel = (formData.get("ideaLabel") as string) || "Idea";
  updateData.ideaEmoji = (formData.get("ideaEmoji") as string) || "";
  updateData.otherLabel = (formData.get("otherLabel") as string) || "Other";
  updateData.otherEmoji = (formData.get("otherEmoji") as string) || "";
  updateData.feedbackPlaceholder =
    (formData.get("feedbackPlaceholder") as string) ||
    "Describe your issue or idea...";

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
  const widgetScript = `<script src="${
    process.env.NEXT_PUBLIC_APP_URL || "https://annya.io"
  }/widget/feedback-widget.js" data-project-key="${project.apiKey}"></script>`;

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
        <div className="h-4 w-px bg-zinc-800 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/projects"
                className="font-mono text-xs uppercase text-zinc-500 hover:text-zinc-300"
              >
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-zinc-600" />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/projects/${id}`}
                className="font-mono text-xs uppercase text-zinc-500 hover:text-zinc-300"
              >
                {project.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-zinc-600" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">
                Config
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-10 p-8 bg-black w-full">
        {/* Installation Section */}
        <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-orange-500" />
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Installation Script
              </h2>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded-sm bg-black">
              READONLY
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500/50 to-purple-500/20 rounded-sm blur opacity-20" />
            <div className="relative">
              <pre className=" bg-black border border-zinc-800 p-6 rounded-sm text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all shadow-inner">
                {widgetScript}
              </pre>
              <CopyButton
                text={widgetScript}
                className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 h-8 w-8 rounded-sm"
              />
            </div>
          </div>
        </section>

        <ProjectSettingsForm
          key={`${project.id}-${project.enableBugs}-${project.enableIdeas}-${project.enableOther}-${project.showBranding}`}
          project={project}
          planDetails={planDetails}
          updateAction={updateProject}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8 h-full">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4">
              API Credentials
            </h2>
            <div className="flex items-center gap-2">
              <code className="bg-black border border-zinc-800 px-4 py-3 rounded-sm text-xs font-mono text-zinc-300 flex-1 truncate">
                {project.apiKey}
              </code>
              <CopyButton
                text={project.apiKey}
                className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-sm h-10 w-10"
              />
            </div>
          </section>

         <section className="border border-red-900/30 rounded-sm bg-red-950/5 p-8 h-full">
            <h2 className="text-sm font-bold text-red-500 uppercase font-mono tracking-wider mb-4">
              Danger Zone
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-xs text-zinc-500">
                Irreversibly delete this project and all its collected data.
              </p>
              <DangerModal
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone and all feedback data will be permanently deleted."
                formAction={deleteProject}
                projectId={project.id}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
