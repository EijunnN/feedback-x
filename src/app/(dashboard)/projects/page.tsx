// import { auth } from "@clerk/nextjs/server";
// import { eq } from "drizzle-orm";
// import { Folder, Plus } from "lucide-react";
// import Link from "next/link";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbList,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { db } from "@/db";
// import { projects } from "@/db/schema";

// export default async function ProjectsPage() {
//   const { userId } = await auth();
//   if (!userId) return null;

//   const userProjects = await db
//     .select()
//     .from(projects)
//     .where(eq(projects.userId, userId));

//   return (
//     <>
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <SidebarTrigger className="-ml-1" />
//         <Separator orientation="vertical" className="mr-2 h-4" />
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbPage>Projects</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <div className="ml-auto">
//           <Button asChild>
//             <Link href="/projects/new">
//               <Plus className="mr-2 h-4 w-4" />
//               New Project
//             </Link>
//           </Button>
//         </div>
//       </header>
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         {userProjects.length === 0 ? (
//           <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
//             <Folder className="h-12 w-12 text-muted-foreground" />
//             <div>
//               <h2 className="text-xl font-semibold">No projects yet</h2>
//               <p className="text-muted-foreground">
//                 Create your first project to start collecting feedback
//               </p>
//             </div>
//             <Button asChild>
//               <Link href="/projects/new">
//                 <Plus className="mr-2 h-4 w-4" />
//                 Create Project
//               </Link>
//             </Button>
//           </div>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {userProjects.map((project) => (
//               <Link
//                 key={project.id}
//                 href={`/projects/${project.id}`}
//                 className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
//               >
//                 <h3 className="font-semibold">{project.name}</h3>
//                 {project.domain && (
//                   <p className="text-sm text-muted-foreground">
//                     {project.domain}
//                   </p>
//                 )}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }



import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Folder, Plus, Activity } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { projects } from "@/db/schema";

export default async function ProjectsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
        <div className="h-4 w-px bg-zinc-800 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">Projects</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button asChild size="sm" className="bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase rounded-sm h-8">
            <Link href="/projects/new">
              <Plus className="mr-2 h-3 w-3" />
              New Project
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6 bg-black">
        {userProjects.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center border border-dashed border-zinc-800 rounded-sm p-12 bg-zinc-900/20">
            <div className="h-12 w-12 bg-zinc-900 rounded-sm flex items-center justify-center border border-zinc-800">
               <Folder className="h-6 w-6 text-zinc-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">No projects found</h2>
              <p className="text-sm text-zinc-500 font-mono mt-1">
                Initialize a project to start collecting data.
              </p>
            </div>
            <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 font-mono text-xs uppercase rounded-sm">
              <Link href="/projects/new">
                <Plus className="mr-2 h-3 w-3" />
                Create Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative rounded-sm border border-zinc-800 bg-zinc-950 p-5 transition-all hover:border-zinc-600 hover:bg-zinc-900"
              >
                <div className="flex justify-between items-start mb-4">
                    <div className="h-8 w-8 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600">
                        <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500" />
                    </div>
                </div>
                
                <h3 className="font-bold text-white tracking-tight mb-1">{project.name}</h3>
                <p className="text-xs font-mono text-zinc-500 truncate">
                  {project.domain || "No domain configured"}
                </p>
                
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/50 transition-all" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}