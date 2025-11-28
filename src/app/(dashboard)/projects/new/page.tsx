import { auth } from "@clerk/nextjs/server";
import { AlertCircle } from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { canCreateProject, getUserUsage, PLANS } from "@/lib/plans";

async function createProject(formData: FormData) {
  "use server";

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const canCreate = await canCreateProject(userId);
  if (!canCreate) {
    throw new Error("Project limit reached. Please upgrade your plan.");
  }

  const name = formData.get("name") as string;
  const domain = formData.get("domain") as string;

  if (!name) throw new Error("Name is required");

  const id = nanoid();
  const apiKey = `pk_${nanoid(32)}`;

  await db.insert(projects).values({
    id,
    userId,
    name,
    domain: domain || null,
    apiKey,
  });

  redirect(`/projects/${id}`);
}

export default async function NewProjectPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const canCreate = await canCreateProject(userId);
  const usage = await getUserUsage(userId);

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
              <BreadcrumbPage>New Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

          {!canCreate ? (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive">
                    Project limit reached
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have {usage.projects.used} of{" "}
                    {usage.projects.limit === Infinity
                      ? "unlimited"
                      : usage.projects.limit}{" "}
                    projects on the {PLANS[usage.plan].name} plan.
                  </p>
                  <Button asChild className="mt-4" size="sm">
                    <Link href="/billing">Upgrade Plan</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form action={createProject} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Project Name
                </label>
                <Input id="name" name="name" placeholder="My App" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="domain" className="text-sm font-medium">
                  Domain (optional)
                </label>
                <Input id="domain" name="domain" placeholder="example.com" />
                <p className="text-xs text-muted-foreground">
                  Restrict widget to this domain only
                </p>
              </div>
              <Button type="submit" className="w-full">
                Create Project
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {usage.projects.used} of{" "}
                {usage.projects.limit === Infinity
                  ? "unlimited"
                  : usage.projects.limit}{" "}
                projects used
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
