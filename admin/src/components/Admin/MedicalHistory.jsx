import { useState } from "react";
import { Calendar, Stethoscope, FileText, User, X } from "lucide-react";

// --- 1. Temporary Data (Replace with API call) ---
const tempMedicalHistory = [
  {
    _id: "mh1",
    condition: "Hypertension",
    diagnosedDate: new Date("2024-05-15T00:00:00.000Z"),
    notes:
      "Prescribed lifestyle changes and low-dose medication. Follow-up scheduled in 3 months.",
    doctor: {
      _id: "doc1",
      name: "Dr. Anjali Sharma",
      specialty: "Cardiologist",
      contact: "asharma@hospital.com",
      clinic: "City Heart Care",
    },
  },
  {
    _id: "mh2",
    condition: "Allergic Rhinitis",
    diagnosedDate: new Date("2023-11-20T00:00:00.000Z"),
    notes: "Seasonal allergies, managed with antihistamines as needed.",
    doctor: {
      _id: "doc2",
      name: "Dr. Vikram Singh",
      specialty: "Allergist",
      contact: "vsingh@clinic.com",
      clinic: "Breathe Easy Clinic",
    },
  },
  {
    _id: "mh3",
    condition: "Minor Ligament Sprain",
    diagnosedDate: new Date("2023-01-10T00:00:00.000Z"),
    notes:
      "Right ankle sprain due to sports activity. Advised R.I.C.E. protocol.",
    doctor: {
      _id: "doc3",
      name: "Dr. Priya Patel",
      specialty: "Orthopedic Surgeon",
      contact: "ppatel@medcenter.org",
      clinic: "OrthoPro Medical Center",
    },
  },
];

// --- 2. Doctor Detail Modal Component ---
const DoctorDetailModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 rounded-full p-4 mb-4">
            <User className="text-blue-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-lg text-blue-600 font-semibold">
            {doctor.specialty}
          </p>
          <div className="border-t w-full my-4"></div>
          <p className="text-gray-600">{doctor.clinic}</p>
          <p className="text-sm text-gray-500">{doctor.contact}</p>
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Medical History Component ---
const MedicalHistory = () => {
  // State to manage modal visibility and which doctor is selected
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Later, you'll replace this with a `useEffect` to call your API
  const medicalHistory = tempMedicalHistory;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Medical History
        </h1>

        {/* The Timeline Container */}
        <div className="relative border-l-2 border-blue-200 ml-4">
          <div className="space-y-12">
            {medicalHistory.map((item) => (
              <div key={item._id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[1.3rem] top-1 h-8 w-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
                  <Stethoscope size={16} className="text-white" />
                </div>

                {/* Timeline Card */}
                <div className="ml-10 bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {item.condition}
                  </h2>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      Diagnosed on:{" "}
                      {new Date(item.diagnosedDate).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                  </div>

                  {item.notes && (
                    <div className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-md mb-4">
                      <FileText size={18} className="mr-3 mt-1 flex-shrink-0" />
                      <p>{item.notes}</p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedDoctor(item.doctor)}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Doctor Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the modal */}
      <DoctorDetailModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </div>
  );
};

export default MedicalHistory;
