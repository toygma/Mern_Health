import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TAddDoctorFormSchema } from "../../../../../validation/addDoctor.form.schema";
import React, { useState } from "react";

interface BasicInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
  getValues: any;
  setValues: any;
}

const specialistData = [
  { id: 1, name: "Cardiologist" },
  { id: 2, name: "Dermatologist" },
  { id: 3, name: "Pediatrician" },
  { id: 4, name: "Neurologist" },
  { id: 5, name: "Orthopedic Surgeon" },
  { id: 6, name: "Ophthalmologist" },
  { id: 7, name: "Psychiatrist" },
  { id: 8, name: "Endocrinologist" },
  { id: 9, name: "Gastroenterologist" },
  { id: 10, name: "Dentist" },
];

const BasicInformation = ({
  error,
  register,
  getValues,
  setValues,
}: BasicInformationProps) => {
  const [filteredSpecialist, setFilteredSpecialist] = useState(specialistData);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues("speciality", value);
    const filtered = specialistData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    if (value.trim() === "") {
      setShowSuggestions(false);
      setFilteredSpecialist(specialistData);
      return;
    }
    setFilteredSpecialist(filtered);
    setShowSuggestions(true);
  };
  const handleSelectSpeciality = (name: string) => {
    setValues("speciality", name);
    setShowSuggestions(false);
  };
  return (
    <div className="pt-4 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Basic Information
      </h3>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder="Enter full name"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.name?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">{error.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter email address"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.email?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.password?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.password.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          {...register("phone")}
          placeholder="Enter phone number"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.phone?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.phone.message}
          </p>
        )}
      </div>

      {/* Speciality Autocomplete */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">
          Speciality
        </label>
        <input
          type="text"
          value={getValues("speciality") || ""}
          onChange={handleSpecialityChange}
          placeholder="Start typing speciality..."
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showSuggestions && filteredSpecialist.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {filteredSpecialist.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectSpeciality(item.name)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
        {error?.speciality?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.speciality.message}
          </p>
        )}
      </div>
      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Experience (Years)
        </label>
        <input
          type="number"
          {...register("experience", { valueAsNumber: true })}
          placeholder="e.g. 5"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.experience?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.experience.message}
          </p>
        )}
      </div>

      {/* Fee */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Consultation Fee ($)
        </label>
        <input
          type="number"
          {...register("fee", { valueAsNumber: true })}
          placeholder="e.g. 100"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.fee?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">{error.fee.message}</p>
        )}
      </div>

      {/* patients */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          patients ($)
        </label>
        <input
          type="number"
          {...register("patients", { valueAsNumber: true })}
          placeholder="e.g. 100"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.patients?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.patients.message}
          </p>
        )}
      </div>
      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-700">About</label>
        <textarea
          {...register("about")}
          rows={4}
          placeholder="Write a short bio or description..."
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.about?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.about.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
