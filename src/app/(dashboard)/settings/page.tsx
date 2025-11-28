import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-8 p-4 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <section>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-4">
              {user?.imageUrl && (
                // biome-ignore lint/performance/noImgElement: external clerk avatar
                <img
                  src={user.imageUrl}
                  alt="Avatar"
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{user?.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
          <div className="rounded-lg border border-destructive/50 p-4">
            <SignOutButton>
              <Button variant="destructive">Sign Out</Button>
            </SignOutButton>
          </div>
        </section>
      </div>
    </>
  );
}
