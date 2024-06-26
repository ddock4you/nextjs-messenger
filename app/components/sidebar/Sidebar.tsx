import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

import getCurrentUser from "@/app/actions/getCurrentUser";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;

// export default async function Sidebar({ children }: { children: React.ReactNode }) {
//   return <div className="h-full">{children}</div>;
// }
