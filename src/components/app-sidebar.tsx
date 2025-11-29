// "use client";

// import { useUser } from "@clerk/nextjs";
// import { CreditCard, Folder, MessageSquare, Settings } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { NavUser } from "@/components/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";

// const navItems = [
//   { title: "Projects", url: "/projects", icon: Folder },
//   { title: "Billing", url: "/billing", icon: CreditCard },
//   { title: "Settings", url: "/settings", icon: Settings },
// ];

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { user } = useUser();
//   const pathname = usePathname();

//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/projects">
//                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
//                   <MessageSquare className="size-4" />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-semibold">Annya</span>
//                   <span className="truncate text-xs">Feedback</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Menu</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     isActive={pathname.startsWith(item.url)}
//                   >
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser
//           user={{
//             name: user?.fullName || "User",
//             email: user?.primaryEmailAddress?.emailAddress || "",
//             avatar: user?.imageUrl || "",
//           }}
//         />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

"use client";

import { useUser } from "@clerk/nextjs";
import { CreditCard, Folder, Settings, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "PROJECTS", url: "/projects", icon: Folder },
  { title: "BILLING", url: "/billing", icon: CreditCard },
  { title: "SETTINGS", url: "/settings", icon: Settings },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-zinc-800 bg-black"
      {...props}
    >
      <SidebarHeader className="border-b border-zinc-800 bg-black py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-zinc-900 active:bg-zinc-900 data-[state=open]:bg-zinc-900"
            >
              <Link href="/projects">
                <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-orange-600 text-white">
                  <Terminal className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold tracking-tight text-white font-mono">
                    ANNYA
                  </span>
                  <span className="truncate text-[10px] text-zinc-500 font-mono uppercase">
                    Console
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-mono uppercase text-zinc-600 tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.url)}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-900 data-[active=true]:bg-zinc-900 data-[active=true]:text-orange-500 font-mono text-xs tracking-wide h-9 rounded-sm"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="bg-zinc-800" />
      <SidebarFooter className="bg-black p-2">
        <NavUser
          user={{
            name: user?.fullName || "User",
            email: user?.primaryEmailAddress?.emailAddress || "",
            avatar: user?.imageUrl || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail className="hover:bg-zinc-800" />
    </Sidebar>
  );
}
