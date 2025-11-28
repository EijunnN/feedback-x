// import { auth } from "@clerk/nextjs/server";
// import { and, desc, eq } from "drizzle-orm";
// import { Settings } from "lucide-react";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { FeedbackList } from "@/components/feedback-list";
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
// import { feedbacks, projects } from "@/db/schema";

// export default async function ProjectPage({
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

//   const projectFeedbacks = await db
//     .select()
//     .from(feedbacks)
//     .where(eq(feedbacks.projectId, id))
//     .orderBy(desc(feedbacks.createdAt));

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
//               <BreadcrumbPage>{project.name}</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <div className="ml-auto">
//           <Button variant="outline" size="sm" asChild>
//             <Link href={`/projects/${id}/settings`}>
//               <Settings className="mr-2 h-4 w-4" />
//               Settings
//             </Link>
//           </Button>
//         </div>
//       </header>
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         <FeedbackList projectId={id} initialFeedbacks={projectFeedbacks} />
//       </div>
//     </>
//   );
// }





import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { Settings, Terminal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeedbackList } from "@/components/feedback-list";
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
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button variant="outline" size="sm" asChild className="bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 font-mono text-xs uppercase rounded-sm h-8">
            <Link href={`/projects/${id}/settings`}>
              <Settings className="mr-2 h-3 w-3" />
              Config
            </Link>
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 flex-col gap-6 p-6 bg-black">
        {/* Stats Row could go here */}
        
        <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-800 pb-2">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-xs uppercase">Incoming Stream</span>
            <div className="ml-auto flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono">LIVE</span>
            </div>
        </div>

        <FeedbackList projectId={id} initialFeedbacks={projectFeedbacks} />
      </div>
    </>
  );
}