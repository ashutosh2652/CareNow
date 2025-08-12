import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllUser, SuspendUser } from "../store/patient";

import {
  Users,
  HeartPulse,
  UserCheck,
  UserX,
  Download,
  Search,
  CircleCheck,
  CircleX,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { StatCard } from "../components/Admin/StatCard";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { toast } from "sonner";

function Patient() {
  const dispatch = useDispatch();
  const { AllUser } = useSelector((state) => state.patient);

  const [filter, setFilter] = useState("all-users");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return (AllUser || [])
      .filter((user) => {
        if (filter === "active-users") return user.accountStatus === "Active";
        if (filter === "blocked-users") return user.accountStatus === "Blocked";
        return true;
      })
      .filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [AllUser, filter, searchQuery]);

  function ExportCsv() {
    if (filteredUsers.length === 0) {
      alert("No users found to export it to csv file!");
      return;
    }
    const headers = [
      "fullName",
      "email",
      "phone",
      "Verified",
      "status",
      "avatar",
    ];
    const filteredheaders =
      filteredUsers &&
      filteredUsers.map((user) =>
        [
          user.fullName,
          user.email,
          user.phone,
          user.isEmailVerified,
          user.accountStatus,
          user.avatar,
        ].join(",")
      );
    const csvData = [headers.join(","), ...filteredheaders].join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset='utf-8'" });
    const link = document.createElement("a");
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    link.download = `patients-${new Date().toISOString().slice(0, 10)}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function handleBlockUser(userId) {
    dispatch(SuspendUser(userId)).then((data) => {
      if (data.payload.success) {
        toast.success("User banned!");
        dispatch(getAllUser());
      }
    });
  }

  const statsData = [
    {
      title: "Total Users",
      value: AllUser?.length,
      Icon: Users,
      color: "#3b82f6",
    },
    {
      title: "Total Patients",
      value: AllUser?.length,
      Icon: HeartPulse,
      color: "#22c55e",
    },
    {
      title: "Active Patients",
      value: AllUser?.filter((u) => u.accountStatus === "active").length,
      Icon: UserCheck,
      color: "#f97316",
    },
    {
      title: "Blocked Patients",
      value: AllUser?.filter((u) => u.accountStatus === "banned").length,
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

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Statistics Cards */}
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
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

      {/* Filters and Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
        {/* Filter Bar */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-users">All Users</SelectItem>
                <SelectItem value="active-users">Active Users</SelectItem>
                <SelectItem value="blocked-users">Blocked Users</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              onClick={ExportCsv}
            >
              <Download size={18} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>fullName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead className="text-center">Block User</TableHead>
              </TableRow>
            </TableHeader>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredUsers && filteredUsers.length > 0
                ? filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={itemVariants}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={user.avatar.url}
                            alt={user.fullName}
                            className={"h-8 w-8"}
                          />
                          <AvatarFallback>
                            {user.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.fullName}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.accountStatus === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.accountStatus === "active" ? (
                            <CircleCheck size={16} />
                          ) : (
                            <CircleX size={16} />
                          )}
                          {user.accountStatus}
                        </div>
                      </TableCell>

                      {/* VERIFICATION FIELD */}
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.isEmailVerified
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.isEmailVerified ? (
                            <BadgeCheck size={16} />
                          ) : (
                            <Clock size={16} />
                          )}
                          {user.isEmailVerified ? "Verified" : "Pending"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={user.accountStatus === "banned"}
                          className={`${
                            user.accountStatus === "banned"
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() => handleBlockUser(user._id)}
                        >
                          <UserX size={16} className="mr-2" />
                          Block
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                : null}
            </motion.tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Patient;
