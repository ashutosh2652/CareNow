import React, { useState, useEffect } from "react"; // 1. Import useState
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Trash2, XIcon } from "lucide-react";
import { ALL_SPECIALIZATIONS, specializations_control } from "../../config";
import { Button } from "../ui/button";
import AddressAutocomplete from "./AddressAutoComplete";

const initialState = { degree: "", institution: "", year: "" };

export default function AddDoctorForm({
  onSubmit,
  formData,
  setformData,
  edit,
}) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const id = "add-doctor-form-scrollbar-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(99,102,241,0.15); border-radius: 9999px; border: 2px solid transparent; background-clip: padding-box; }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(99,102,241,0.24); }
      .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(99,102,241,0.15) transparent; }
    `;
    document.head.appendChild(style);
  }, []);
  useEffect(() => {
    if (selectedPlace) {
      setformdata_safe((prev) => ({
        ...prev,
        clinicInfo: {
          ...prev.clinicInfo,
          address: selectedPlace.formatted,
          location: {
            type: "Point",
            coordinates: [selectedPlace.lon, selectedPlace.lat],
          },
        },
      }));
    }
  }, [selectedPlace]);
  // console.log(selectedPlace, "selected");

  const availableOptions = ALL_SPECIALIZATIONS.filter(
    (option) => !formData.specializations.some((s) => s === option.id)
  );
  const addedqualification = formData.qualifications.slice(
    0,
    Math.max(0, formData.qualifications.length - 1)
  );

  const handleSelect = (specializationId) => {
    const itemObject = ALL_SPECIALIZATIONS.find(
      (s) => s.id === specializationId
    );
    const itemToAdd = itemObject.id;
    console.log(itemToAdd, "itemToAdd");

    if (itemToAdd) {
      setformdata_safe((prev) => ({
        ...prev,
        specializations: [...prev.specializations, itemToAdd],
      }));
    }
  };
  const handleAccountstatus = (status) => {
    setformdata_safe((prev) => ({ ...prev, status }));
  };

  const handleDelete = (specializationId) => {
    setformdata_safe((prev) => ({
      ...prev,
      specializations: prev.specializations.filter(
        (item) => item != specializationId
      ),
    }));
  };

  const handledeletequalification = (qualificationInd) => {
    setformdata_safe((prev) => {
      const newQualifications = prev.qualifications.filter(
        (_, i) => i !== qualificationInd
      );
      if (newQualifications.length === 0)
        newQualifications.push({ ...initialState });
      return { ...prev, qualifications: newQualifications };
    });
  };

  const handleaddqualification = () => {
    setformdata_safe((prev) => {
      const newqualification = [...prev.qualifications, { ...initialState }];
      return { ...prev, qualifications: newqualification };
    });
  };

  const setformdata_safe = (fn) => {
    if (typeof setformData === "function") return setformData(fn);
    console.warn("setformData is not a function");
  };

  const updateLastQualification = (patch) => {
    setformdata_safe((prev) => {
      const lastIdx = Math.max(0, prev.qualifications.length - 1);
      const newQualifications = [...prev.qualifications];
      newQualifications[lastIdx] = {
        ...newQualifications[lastIdx],
        ...patch,
      };
      return { ...prev, qualifications: newQualifications };
    });
  };
  console.log(formData, "formdata");

  return (
    <form
      onSubmit={onSubmit}
      className="custom-scrollbar flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {edit ? "Edit" : "Add"} Doctor
        </h3>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm text-gray-700">Doctor's Email</Label>
        <Input
          type="email"
          placeholder="Enter doctor's email"
          className="ring-0 focus:ring-2 focus:ring-indigo-300 text-black"
          value={edit ? formData.user.email : formData.email}
          disabled={edit}
          onChange={(e) =>
            setformdata_safe((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      {/* Specialization */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm text-gray-700">Specialization</Label>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="ring-0 focus:ring-2 focus:ring-indigo-300">
            <SelectValue placeholder="Provide specialization">
              <span className="text-black">Provide specialization</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableOptions.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 mt-2">
          {formData.specializations.map((specialization) => (
            <div
              key={specialization}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
            >
              <span>{specializations_control[specialization]}</span>
              <XIcon
                className="h-4 w-4 cursor-pointer hover:text-red-500 transition"
                onClick={() => handleDelete(specialization)}
              />
            </div>
          ))}
        </div>
      </div>
      {edit ? (
        <div>
          <Label className="text-sm text-gray-700">Change Account Status</Label>
          <Select onValueChange={handleAccountstatus} value={formData.status}>
            <SelectTrigger className="ring-0 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Change Status">
                <span className="text-black">Change Status</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="suspended">Susspended</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : null}

      {/* Qualifications  */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm text-gray-700">Qualifications</Label>

        {addedqualification.length > 0 && (
          <div className="flex flex-col gap-3">
            {addedqualification.map((qualification, ind) => (
              <div
                key={`${qualification.degree}-${ind}`}
                className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="text-sm text-gray-800">
                    <strong>Degree:</strong> {qualification.degree || "—"}
                  </div>
                  <div className="text-sm text-gray-800">
                    <strong>Institution:</strong>{" "}
                    {qualification.institution || "—"}
                  </div>
                  <div className="text-sm text-gray-800">
                    <strong>Year:</strong> {qualification.year || "—"}
                  </div>
                </div>

                <div className="flex items-center">
                  <Trash2
                    className="h-6 w-6 text-red-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => handledeletequalification(ind)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* qualification  */}
        <div className="flex flex-wrap gap-3">
          <Input
            type="text"
            placeholder="Degree"
            value={formData.qualifications.at(-1).degree}
            onChange={(e) =>
              updateLastQualification({ degree: e.target.value })
            }
            className="ring-0 focus:ring-2 focus:ring-indigo-300 text-black"
          />
          <Input
            type="text"
            placeholder="Institution"
            value={formData.qualifications.at(-1).institution}
            onChange={(e) =>
              updateLastQualification({ institution: e.target.value })
            }
            className="ring-0 focus:ring-2 focus:ring-indigo-300 text-black"
          />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Year"
              value={formData.qualifications.at(-1).year}
              onChange={(e) =>
                updateLastQualification({ year: e.target.value })
              }
              className="ring-0 focus:ring-2 focus:ring-indigo-300 text-black"
            />
            <Button
              type="button"
              onClick={handleaddqualification}
              className="ml-2"
            >
              Add More
            </Button>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm text-gray-700">Experience (years)</Label>
        <Input
          type="number"
          placeholder="Enter experience (in years)"
          value={formData.experienceInYears}
          onChange={(event) =>
            setformdata_safe((prev) => ({
              ...prev,
              experienceInYears: Number(event.target.value || 0),
            }))
          }
          className="ring-0 focus:ring-2 focus:ring-indigo-300 text-black"
        />
      </div>

      {/* Clinic Info */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm text-gray-700 font-medium">
          Clinic Information
        </h4>
        <Input
          placeholder="Enter name of clinic"
          value={formData.clinicInfo.name}
          onChange={(event) =>
            setformdata_safe((prev) => ({
              ...prev,
              clinicInfo: { ...prev.clinicInfo, name: event.target.value },
            }))
          }
          className="ring-0 focus:ring-2 focus:ring-indigo-300 text-black"
        />

        <AddressAutocomplete onPlaceSelected={setSelectedPlace} />

        {formData.clinicInfo.address && (
          <div className="p-2 bg-gray-50 border rounded-md text-sm text-gray-600">
            <span className="font-semibold">Selected Address:</span>{" "}
            {formData.clinicInfo.address}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          {edit ? "Update Detail" : "Add Doctor"}
        </Button>
      </div>
    </form>
  );
}
