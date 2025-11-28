import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { projects } from "@/db/schema";

async function updateProject(formData: FormData) {
  "use server";

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const domain = formData.get("domain") as string;

  await db
    .update(projects)
    .set({ name, domain: domain || null })
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

        <section>
          <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
          <form action={updateProject} className="space-y-4">
            <input type="hidden" name="id" value={project.id} />
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="name"
                name="name"
                defaultValue={project.name}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="domain" className="text-sm font-medium">
                Domain
              </label>
              <Input
                id="domain"
                name="domain"
                defaultValue={project.domain || ""}
                placeholder="example.com"
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </section>

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
