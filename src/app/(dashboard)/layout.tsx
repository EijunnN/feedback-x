// import { AppSidebar } from "@/components/app-sidebar";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>{children}</SidebarInset>
//     </SidebarProvider>
//   );
// }


import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark bg-black min-h-screen font-sans">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-black border-l border-zinc-800">
            {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}