import { User, Users, Phone, ShieldAlert } from "lucide-react";

// --- Main Emergency Contact Component ---
function EmergencyContact() {
  // You can replace this with your actual data from an API
  const emergencyContact = {
    name: "Riya Sharma",
    relation: "Spouse",
    phone: "9876543210",
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* --- Emergency Contact Card --- */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-red-200">
          {/* Header */}
          <div className="flex items-center justify-center flex-col text-center mb-6">
            <div className="bg-red-100 rounded-full p-3 mb-3">
              <ShieldAlert className="text-red-600" size={32} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Emergency Contact
            </h2>
            <p className="text-gray-500">
              In case of an emergency, please contact:
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center">
              <User size={20} className="text-gray-400 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-bold text-gray-900">
                  {emergencyContact.name}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Users size={20} className="text-gray-400 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="text-lg font-bold text-gray-900">
                  {emergencyContact.relation}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone size={20} className="text-gray-400 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-lg font-bold text-gray-900">
                  +91 {emergencyContact.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="mt-8">
            <a
              href={`tel:${emergencyContact.phone}`}
              className="w-full flex items-center justify-center px-6 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              <Phone size={20} className="mr-3" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyContact;
