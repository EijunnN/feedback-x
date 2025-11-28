import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
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

async function createProject(formData: FormData) {
  "use server";

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

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
          </form>
        </div>
      </div>
    </>
  );
}
