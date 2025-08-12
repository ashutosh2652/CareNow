import { Mail, Phone, User, Pill, Heart, Calendar } from "lucide-react";

// --- Reusable component for each piece of information ---
const InfoField = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// --- Main Patient Information Component ---
function PatientInformation() {
  // You can replace this with your actual patient data from an API
  const patientData = {
    email: "mukesh@gmail.com",
    gender: "Male",
    phone: "123-456-7890",
    dob: "15 August, 1985",
    bloodType: "O+",
  };

  const currentMedication = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once a day" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice a day" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at night" },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 bg-gray-50">
      {/* --- Patient Data Card --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">
          Patient Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          <InfoField
            icon={<Mail size={18} />}
            label="Email Address"
            value={patientData.email}
          />
          <InfoField
            icon={<User size={18} />}
            label="Gender"
            value={patientData.gender}
          />
          <InfoField
            icon={<Phone size={18} />}
            label="Phone Number"
            value={patientData.phone}
          />
          <InfoField
            icon={<Calendar size={18} />}
            label="Date of Birth"
            value={patientData.dob}
          />
          <InfoField
            icon={<Heart size={18} />}
            label="Blood Type"
            value={patientData.bloodType}
          />
        </div>
      </div>

      {/* --- Current Medication Card --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">
          Current Medication
        </h3>
        <div className="space-y-4">
          {currentMedication.map((med, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-50 p-4 rounded-lg"
            >
              <div className="flex-shrink-0 mr-4">
                <Pill className="text-blue-500" size={24} />
              </div>
              <div className="flex-grow grid grid-cols-3 gap-4 items-center">
                <p className="font-bold text-gray-900">{med.name}</p>
                <p className="text-gray-600">{med.dosage}</p>
                <p className="text-gray-600">{med.frequency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientInformation;
