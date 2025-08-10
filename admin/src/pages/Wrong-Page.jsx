import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../store/auth";

function WrongPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LogoutUser());
  }, [dispatch]);
  return <div>You are not allowed to access this page! </div>;
}
export default WrongPage;
