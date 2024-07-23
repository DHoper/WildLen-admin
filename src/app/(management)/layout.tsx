import MainHeader from "@/components/layout/MianHeader";
import SideMenu from "@/components/layout/SideMenu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen w-screen bg-indigo-100/25 dark:bg-white">
      <SideMenu />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <MainHeader />
        <div className="scrollbar-hide flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
