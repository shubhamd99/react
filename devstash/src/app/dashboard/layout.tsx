import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getSidebarCollections } from "@/lib/db/collections";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [itemTypes, sidebarCollections, session] = await Promise.all([
    getItemTypesWithCounts(),
    getSidebarCollections(),
    auth(),
  ]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          itemTypes={itemTypes}
          favoriteCollections={sidebarCollections.favorites}
          recentCollections={sidebarCollections.recents}
          totalCollections={sidebarCollections.totalCount}
          user={session?.user ?? null}
        />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
