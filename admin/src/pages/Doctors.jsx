import DoctorCard from "../components/Admin/Doctors-Card";
import { StatCard } from "../components/Admin/StatCard";
import { motion } from "framer-motion";
import { Users, HeartPulse, UserCheck, UserX } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { Dialog } from "../components/ui/dialog";
import DoctorDialog from "../components/Admin/DoctorDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import AddDoctorForm from "../components/Admin/Add-Doctor-Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctor,
  changeDoctorDetail,
  getAllDoctor,
  suspendDoctor,
} from "../store/doctor";
import { toast } from "sonner";
import { containerVariants, itemVariants } from "../config";
const initialState = {
  email: "",
  specializations: [],
  qualifications: [{ degree: "", institution: "", year: "" }],
  experienceInYears: 0,
  clinicInfo: {
    name: "",
    address: "",
    location: {
      type: "Point",
      coordinates: [],
    },
  },
};
function Doctors() {
  const [opendialog, setopendialog] = useState(false);
  const [opensheet, setopensheet] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [editable, seteditable] = useState(false);
  const dispatch = useDispatch();
  const { DoctorList } = useSelector((state) => state.doctor);
  console.log(DoctorList, "doctorlist");
  useEffect(() => {
    dispatch(getAllDoctor({}));
  }, [dispatch]);

  const statsData = [
    {
      title: "Total Doctors",
      value: DoctorList?.length,
      Icon: Users,
      color: "#3b82f6",
    },
    {
      title: "Active Doctors",
      value: DoctorList?.filter((u) => u.status === "approved").length,
      Icon: UserCheck,
      color: "#4f5",
    },
    {
      title: "Blocked Doctors",
      value: DoctorList?.filter((u) => u.status === "suspended").length,
      Icon: UserX,
      color: "#ef4444",
    },
  ];

  function onSubmit(event) {
    event.preventDefault();

    {
      editable
        ? dispatch(changeDoctorDetail(formData)).then((data) => {
            if (data.payload?.success) {
              setopensheet(false);
              dispatch(getAllDoctor({}));
              toast.success("Details uploaded successfully!");
              seteditable(false);
              setformData(initialState);
            }
          })
        : dispatch(addDoctor(formData)).then((data) => {
            if (data.payload?.success) {
              setopensheet(false);
              setformData(initialState);
              dispatch(getAllDoctor({}));
              toast.success("Doctor added successfully");
            }
          });
    }
  }
  function SuspendCurrentDoctor(doctorId) {
    dispatch(suspendDoctor(doctorId)).then((data) => {
      if (data.payload?.success) {
        dispatch(getAllDoctor({}));
        toast.success("Doctor banned!");
      }
    });
  }

  return (
    <>
      <Sheet
        open={opensheet}
        onOpenChange={() => {
          setopensheet(false);
          setformData(initialState);
          seteditable(false);
        }}
      >
        <SheetContent side="right" className={" bg-white"}>
          <SheetHeader>
            <SheetTitle>
              <p className="text-2xl font-bold p-0">
                {editable ? "Edit" : "Add New"} Doctor
              </p>
            </SheetTitle>
          </SheetHeader>
          <AddDoctorForm
            onSubmit={onSubmit}
            formData={formData}
            setformData={setformData}
            edit={editable}
          />
        </SheetContent>
      </Sheet>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        {/* Statistics Cards */}

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statsData.map((stat) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-end mb-3">
          <Button
            className={
              "px-6 py-2 bg-gradient-to-br from-indigo-500 to-green-400 cursor-pointer"
            }
            onClick={() => setopensheet(true)}
          >
            Add Doctor
          </Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {DoctorList && DoctorList.length > 0 ? (
            DoctorList.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                SuspendCurrentDoctor={SuspendCurrentDoctor}
                seteditable={seteditable}
                setformData={setformData}
                setopensheet={setopensheet}
              />
            ))
          ) : (
            <h1 className="text-5xl mt-3 font-extrabold">NO DOCTOR FOUND!</h1>
          )}
        </div>
        <Dialog open={opendialog} onOpenChange={setopendialog}>
          <DoctorDialog />
        </Dialog>
      </div>
    </>
  );
}
export default Doctors;
