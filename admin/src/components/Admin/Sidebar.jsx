import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CareNowLogo from "../../assets/CareNow-logo.png";
import { Separator } from "../ui/separator";
import {
  BookMarked,
  Calendar,
  Hospital,
  LayoutDashboard,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "doctors",
    label: "Doctor",
    path: "/admin/doctor",
    icon: <Hospital />,
  },
  {
    id: "patient",
    label: "Patient",
    path: "/admin/patient",
    icon: <User />,
  },
  {
    id: "appointment",
    label: "Appointments",
    path: "/admin/appointments",
    icon: <Calendar />,
  },
  {
    id: "blogs",
    label: "All Blogs",
    path: "/admin/blogs",
    icon: <BookMarked />,
  },
];
function MenuItems({ setOpen }) {
  return (
    <nav className="flex flex-col gap-1 mt-5">
      {adminSidebarMenuItems.map((items) => (
        <NavLink
          key={items.id}
          to={items.path}
          className={({ isActive }) =>
            ` ${
              isActive
                ? "text-blue-700 border-r-5 border-blue-700"
                : "text-gray-400"
            } flex gap-5 text-lg justify-cente items-start   hover:bg-pink-200 px-4 py-3 rounded hover:shadow-xl`
          }
          onClick={() => setOpen(false)}
        >
          {items.icon}
          {items.label}
        </NavLink>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-custom-white-1">
          <div className="flex flex-col h-full">
            <SheetHeader className={"border-b"}>
              <SheetTitle
                className={"flex flex-col  gap-10 mt-4  justify-center"}
              >
                <div
                  className="relative"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  <img
                    src={CareNowLogo}
                    alt="CareNow-Logo"
                    className="w-[85%] h-12"
                  />
                </div>
                <Separator />
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-72 lg:flex h-full flex-col border-r">
        <div className="flex flex-col gap-10 mt-4 justify-center ml-4">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/admin/dashboard")}
          >
            <img
              src={CareNowLogo}
              alt="CareNow-Logo"
              className="w-[85%] h-12"
            />
          </div>
          <Separator />
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </>
  );
}
export default AdminSidebar;
