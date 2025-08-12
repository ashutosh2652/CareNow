import DoctorCard from "../components/Admin/Doctors-Card";
import { StatCard } from "../components/Admin/StatCard";
import { motion } from "framer-motion";
import { Users, HeartPulse, UserCheck, UserX } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Dialog } from "../components/ui/dialog";
import DoctorDialog from "../components/Admin/DoctorDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import AddDoctorForm from "../components/Admin/Add-Doctor-Form";
const initialState = {
  email: "",
  specializations: [],
  qualifications: [{ degree: "", institution: "", year: "" }],
  experienceInYears: 0,
  clinicInfo: {
    name: "",
    address: "",
  },
};
function Doctors() {
  const [opendialog, setopendialog] = useState(false);
  const [opensheet, setopensheet] = useState(false);
  const [formData, setformData] = useState(initialState);
  const statsData = [
    {
      title: "Total Users",
      // value: AllUser?.length,
      Icon: Users,
      color: "#3b82f6",
    },
    {
      title: "Total Patients",
      // value: AllUser?.length,
      Icon: HeartPulse,
      color: "#22c55e",
    },
    {
      title: "Active Patients",
      // value: AllUser?.filter((u) => u.accountStatus === "active").length,
      Icon: UserCheck,
      color: "#f97316",
    },
    {
      title: "Blocked Patients",
      // value: AllUser?.filter((u) => u.accountStatus === "banned").length,
      Icon: UserX,
      color: "#ef4444",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const doctorData = {
    fullName: "Dr. Vikram Rao",
    specializations: [
      "Neurologist",
      "Neurologist",
      "Neurologist",
      "Neurologist",
    ],
    averageRating: 3,
    experienceInYears: 15,
    imageUrl: "https://i.pravatar.cc/150?img=68", // Example image
  };
  function onSubmit(event) {
    event.preventDefault();
  }
  return (
    <>
      <Sheet
        open={opensheet}
        onOpenChange={() => {
          setopensheet(false);
          setformData(initialState);
        }}
      >
        <SheetContent side="right" className={" bg-white"}>
          <SheetHeader>
            <SheetTitle>
              <p className="text-2xl font-bold p-0">Add New Doctor</p>
            </SheetTitle>
          </SheetHeader>
          <AddDoctorForm
            onSubmit={onSubmit}
            formData={formData}
            setformData={setformData}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
          <DoctorCard doctor={doctorData} />
        </div>
        <Dialog open={opendialog} onOpenChange={setopendialog}>
          <DoctorDialog />
        </Dialog>
      </div>
    </>
  );
}
export default Doctors;
