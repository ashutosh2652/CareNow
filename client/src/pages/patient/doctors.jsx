import { useEffect, useState } from "react";
import DoctorSelector from "../../components/patient-view/DoctorSideBar";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctor } from "../../store/patient";
import DoctorCard from "../../components/patient-view/DoctorCard";

function Doctors() {
  const [selectedId, setSelectedId] = useState(null);
  const appliedfilter =
    selectedId || JSON.parse(sessionStorage.getItem("doctor-filter"));

  const [searchparams, setsearchparams] = useSearchParams();
  const dispatch = useDispatch();
  const { AllDoctor } = useSelector((state) => state.patient);

  useEffect(() => {
    const filter = searchparams.get("specialization");
    dispatch(getAllDoctor({ specialization: filter }));
  }, [dispatch, searchparams]);

  useEffect(() => {
    if (appliedfilter) {
      sessionStorage.setItem("doctor-filter", JSON.stringify(appliedfilter));
      const params = new URLSearchParams();
      params.set("specialization", appliedfilter);
      setsearchparams(params);
    }
  }, [appliedfilter, setsearchparams]);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 sm:p-6 bg-[#0c0a1a]">
      <div className="h-full overflow-y-auto">
        <DoctorSelector selectedId={selectedId} setSelectedId={setSelectedId} />
      </div>

      <div className="h-full overflow-y-auto rounded-xl p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AllDoctor && AllDoctor.length > 0 ? (
            AllDoctor.map((doctor) => (
              <DoctorCard key={doctor.id || doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-3xl font-extrabold text-white/80">
                NO DOCTORS FOUND!
              </div>
              <p className="text-white/50 mt-2">
                Try selecting a different specialty.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
