import { useState } from "react";
import TempImage from "../assets/temp-image.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import PatientInformation from "../components/Admin/Patient-Information";
import MedicalHistory from "../components/Admin/MedicalHistory";
import EmergencyContact from "../components/Admin/EmergencyContact";
function PatientDetail() {
  const renderItems = [
    "Patient Information",
    "Medical History",
    "Emergency Contact",
  ];
  const [activeTab, setActiveTab] = useState(renderItems[0]);
  function RenderComponent() {
    switch (activeTab) {
      case renderItems[0]:
        return <PatientInformation />;
        break;
      case renderItems[1]:
        return <MedicalHistory />;
        break;
      case renderItems[2]:
        return <EmergencyContact />;
        break;
      default:
        <PatientInformation />;
        break;
    }
  }
  return (
    <div>
      <header className="sticky shadow-lg p-4 w-full ">
        <div className="flex gap-5">
          <Avatar className={"h-16 w-16"}>
            <AvatarImage src={TempImage} alt="CareNow" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-2xl">Mukesh Kumar</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-10  justify-between">
          {renderItems.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-2 font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </header>
      <main className="p-6">{RenderComponent()}</main>
    </div>
  );
}
export default PatientDetail;
