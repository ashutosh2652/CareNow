import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../store/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    dispatch(LoginUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success("Logged Out Successfull!");
        navigate("/auth/login");
      }
    });
  }
  return (
    <header className="flex justify-between w-full lg:justify-end px-4 py-3 ">
      <Button className={"lg:hidden sm:block"} onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Button className={"px-8 text-lg"} onClick={handleClick}>
        Logout
      </Button>
    </header>
  );
}
export default AdminHeader;
