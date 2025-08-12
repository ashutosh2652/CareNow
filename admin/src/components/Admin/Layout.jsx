import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";
import { useState } from "react";

function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-screen w-full flex bg-custom-white-1">
      <div className="h-full">
        <AdminSidebar open={open} setOpen={setOpen} />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <AdminHeader setOpen={setOpen} />
        <main className="flex flex-col flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default AdminLayout;
