import MainHeader from "@/components/layout/MianHeader";
import SideMenu from "@/components/layout/SideMenu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex bg-indigo-100/25 dark:bg-white w-screen h-screen">
      <SideMenu />
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        <MainHeader />
        <div className="flex-1 overflow-auto scrollbar-hide">{children}</div>
      </div>
    </div>
  );
}
