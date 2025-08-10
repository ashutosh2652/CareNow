import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

function AdminLayout() {
  <div className="h-screen w-full flex">
    <div className="h-full">
      <AdminSidebar />
    </div>
    <div className="flex flex-col flex-1 ">
      <AdminHeader />
      <Outlet />
    </div>
  </div>;
}
export default AdminLayout;
