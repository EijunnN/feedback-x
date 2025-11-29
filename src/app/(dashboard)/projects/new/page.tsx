// import { auth } from "@clerk/nextjs/server";
// import { AlertCircle } from "lucide-react";
// import { nanoid } from "nanoid";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { db } from "@/db";
// import { projects } from "@/db/schema";
// import { canCreateProject, getUserUsage, PLANS } from "@/lib/plans";

// async function createProject(formData: FormData) {
//   "use server";

//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const canCreate = await canCreateProject(userId);
//   if (!canCreate) {
//     throw new Error("Project limit reached. Please upgrade your plan.");
//   }

//   const name = formData.get("name") as string;
//   const domain = formData.get("domain") as string;

//   if (!name) throw new Error("Name is required");

//   const id = nanoid();
//   const apiKey = `pk_${nanoid(32)}`;

//   await db.insert(projects).values({
//     id,
//     userId,
//     name,
//     domain: domain || null,
//     apiKey,
//   });

//   redirect(`/projects/${id}`);
// }

// export default async function NewProjectPage() {
//   const { userId } = await auth();
//   if (!userId) return null;

//   const canCreate = await canCreateProject(userId);
//   const usage = await getUserUsage(userId);

//   return (
//     <>
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <SidebarTrigger className="-ml-1" />
//         <Separator orientation="vertical" className="mr-2 h-4" />
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>New Project</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </header>
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         <div className="mx-auto w-full max-w-md">
//           <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

//           {!canCreate ? (
//             <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
//                 <div>
//                   <h3 className="font-semibold text-destructive">
//                     Project limit reached
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     You have {usage.projects.used} of{" "}
//                     {usage.projects.limit === Infinity
//                       ? "unlimited"
//                       : usage.projects.limit}{" "}
//                     projects on the {PLANS[usage.plan].name} plan.
//                   </p>
//                   <Button asChild className="mt-4" size="sm">
//                     <Link href="/billing">Upgrade Plan</Link>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <form action={createProject} className="space-y-4">
//               <div className="space-y-2">
//                 <label htmlFor="name" className="text-sm font-medium">
//                   Project Name
//                 </label>
//                 <Input id="name" name="name" placeholder="My App" required />
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="domain" className="text-sm font-medium">
//                   Domain (optional)
//                 </label>
//                 <Input id="domain" name="domain" placeholder="example.com" />
//                 <p className="text-xs text-muted-foreground">
//                   Restrict widget to this domain only
//                 </p>
//               </div>
//               <Button type="submit" className="w-full">
//                 Create Project
//               </Button>
//               <p className="text-xs text-center text-muted-foreground">
//                 {usage.projects.used} of{" "}
//                 {usage.projects.limit === Infinity
//                   ? "unlimited"
//                   : usage.projects.limit}{" "}
//                 projects used
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { auth } from "@clerk/nextjs/server";
import { AlertCircle, Terminal } from "lucide-react";
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
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">
                Initialize
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col p-6 bg-black">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-8 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-5 w-5 text-orange-500" />
              <h1 className="text-xl font-bold text-white tracking-tight">
                Initialize Project
              </h1>
            </div>
            <p className="text-sm text-zinc-500">
              Configure a new feedback endpoint.
            </p>
          </div>

          {!canCreate ? (
            <div className="rounded-sm border border-red-900/50 bg-red-900/10 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-400 font-mono text-xs uppercase">
                    Quota Exceeded
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    You have reached the limit of {usage.projects.limit}{" "}
                    projects.
                  </p>
                  <Button
                    asChild
                    className="mt-4 bg-red-600 hover:bg-red-500 text-white border-0 font-mono text-xs rounded-sm"
                    size="sm"
                  >
                    <Link href="/billing">Upgrade Plan</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form action={createProject} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-mono uppercase text-zinc-400"
                >
                  Project Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="production-app-v1"
                  required
                  className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-700 font-mono rounded-sm focus-visible:ring-orange-500/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="domain"
                  className="text-xs font-mono uppercase text-zinc-400"
                >
                  Allowed Domain
                </label>
                <Input
                  id="domain"
                  name="domain"
                  placeholder="app.example.com"
                  className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-700 font-mono rounded-sm focus-visible:ring-orange-500/50"
                />
                <p className="text-[10px] text-zinc-600 font-mono">
                  Optional. Restricts widget execution to this origin.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase font-bold rounded-sm h-10"
                >
                  Create Resource
                </Button>
                <p className="text-[10px] text-center text-zinc-600 font-mono mt-4">
                  Usage: {usage.projects.used} /{" "}
                  {usage.projects.limit === Infinity
                    ? "∞"
                    : usage.projects.limit}{" "}
                  slots
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
