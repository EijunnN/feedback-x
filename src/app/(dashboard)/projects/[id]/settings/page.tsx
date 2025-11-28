// import { auth } from "@clerk/nextjs/server";
// import { and, eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
// import { notFound, redirect } from "next/navigation";
// import { CopyButton } from "@/components/copy-button";
// import { ProjectSettingsForm } from "@/components/project-settings-form";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { db } from "@/db";
// import { projects } from "@/db/schema";
// import { getUserPlanDetails } from "@/lib/plans";

// async function updateProject(formData: FormData) {
//   "use server";

//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const id = formData.get("id") as string;
//   const name = formData.get("name") as string;
//   const domain = formData.get("domain") as string;

//   const planDetails = await getUserPlanDetails(userId);

//   const updateData: Record<string, unknown> = {
//     name,
//     domain: domain || null,
//   };

//   if (planDetails.allowCustomization) {
//     updateData.widgetColor = formData.get("widgetColor") as string;
//     updateData.widgetPosition = formData.get("widgetPosition") as string;
//     updateData.widgetText = formData.get("widgetText") as string;
//     updateData.notifyEmail = (formData.get("notifyEmail") as string) || null;
//   }

//   if (planDetails.allowRemoveBranding) {
//     updateData.showBranding = formData.get("showBranding") === "true";
//   }

//   updateData.enableBugs = formData.get("enableBugs") === "true";
//   updateData.enableIdeas = formData.get("enableIdeas") === "true";
//   updateData.enableOther = formData.get("enableOther") === "true";

//   await db
//     .update(projects)
//     .set(updateData)
//     .where(and(eq(projects.id, id), eq(projects.userId, userId)));

//   revalidatePath(`/projects/${id}/settings`);
// }

// async function deleteProject(formData: FormData) {
//   "use server";

//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const id = formData.get("id") as string;

//   await db
//     .delete(projects)
//     .where(and(eq(projects.id, id), eq(projects.userId, userId)));

//   redirect("/projects");
// }

// export default async function ProjectSettingsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const { userId } = await auth();
//   if (!userId) return null;

//   const project = await db
//     .select()
//     .from(projects)
//     .where(and(eq(projects.id, id), eq(projects.userId, userId)))
//     .then((rows) => rows[0]);

//   if (!project) notFound();

//   const planDetails = await getUserPlanDetails(userId);

//   const widgetScript = `<script src="${process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com"}/widget/feedback-widget.js" data-project-key="${project.apiKey}"></script>`;

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
//               <BreadcrumbLink href={`/projects/${id}`}>
//                 {project.name}
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Settings</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </header>
//       <div className="flex flex-1 flex-col gap-8 p-4 max-w-2xl">
//         <section>
//           <h2 className="text-lg font-semibold mb-4">Widget Installation</h2>
//           <p className="text-sm text-muted-foreground mb-2">
//             Add this script to your website to enable the feedback widget:
//           </p>
//           <div className="relative">
//             <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
//               {widgetScript}
//             </pre>
//             <CopyButton
//               text={widgetScript}
//               className="absolute top-2 right-2"
//             />
//           </div>
//         </section>

//         <ProjectSettingsForm
//           project={project}
//           planDetails={planDetails}
//           updateAction={updateProject}
//         />

//         <section>
//           <h2 className="text-lg font-semibold mb-4">API Key</h2>
//           <div className="flex items-center gap-2">
//             <code className="bg-muted px-3 py-2 rounded text-sm flex-1">
//               {project.apiKey}
//             </code>
//             <CopyButton text={project.apiKey} />
//           </div>
//         </section>

//         <section className="border-t pt-8">
//           <h2 className="text-lg font-semibold mb-4 text-destructive">
//             Danger Zone
//           </h2>
//           <form action={deleteProject}>
//             <input type="hidden" name="id" value={project.id} />
//             <Button type="submit" variant="destructive">
//               Delete Project
//             </Button>
//           </form>
//         </section>
//       </div>
//     </>
//   );
// }









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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { getUserPlanDetails } from "@/lib/plans";
import { Terminal } from "lucide-react";

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
  }
  updateData.enableBugs = formData.get("enableBugs") === "true";
  updateData.enableIdeas = formData.get("enableIdeas") === "true";
  updateData.enableOther = formData.get("enableOther") === "true";

  await db.update(projects).set(updateData).where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath(`/projects/${id}/settings`);
}

async function deleteProject(formData: FormData) {
  "use server";
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const id = formData.get("id") as string;
  await db.delete(projects).where(and(eq(projects.id, id), eq(projects.userId, userId)));
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
  const widgetScript = `<script src="${process.env.NEXT_PUBLIC_APP_URL || "https://annya.io"}/widget/feedback-widget.js" data-project-key="${project.apiKey}"></script>`;

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
        <div className="h-4 w-px bg-zinc-800 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects" className="font-mono text-xs uppercase text-zinc-500 hover:text-zinc-300">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-zinc-600" />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${id}`} className="font-mono text-xs uppercase text-zinc-500 hover:text-zinc-300">{project.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-zinc-600" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">Config</BreadcrumbPage>
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
                 <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Installation Script</h2>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded-sm bg-black">READONLY</div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-sm blur opacity-20" />
            <div className="relative">
                <pre className="bg-black border border-zinc-800 p-6 rounded-sm text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all shadow-inner">
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
          project={project}
          planDetails={planDetails}
          updateAction={updateProject}
        />

        <div className="grid md:grid-cols-2 gap-8">
            <section className="border border-zinc-800 rounded-sm bg-zinc-950/50 p-8 h-full">
                <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4">API Credentials</h2>
                <div className="flex items-center gap-2">
                    <code className="bg-black border border-zinc-800 px-4 py-3 rounded-sm text-xs font-mono text-zinc-300 flex-1 truncate">
                    {project.apiKey}
                    </code>
                    <CopyButton text={project.apiKey} className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-sm h-10 w-10" />
                </div>
            </section>

            <section className="border border-red-900/30 rounded-sm bg-red-950/5 p-8 h-full">
                <h2 className="text-sm font-bold text-red-500 uppercase font-mono tracking-wider mb-4">
                    Danger Zone
                </h2>
                <div className="flex flex-col gap-4">
                    <p className="text-xs text-zinc-500">Irreversibly delete this project and all its collected data.</p>
                    <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <Button type="submit" variant="destructive" size="sm" className="w-full font-mono text-xs uppercase bg-red-900/20 hover:bg-red-900 border border-red-900 text-red-400 hover:text-white rounded-sm">
                        Delete Project
                        </Button>
                    </form>
                </div>
            </section>
        </div>
      </div>
    </>
  );
}