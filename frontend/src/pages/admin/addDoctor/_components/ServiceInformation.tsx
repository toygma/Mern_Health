import { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import type { TAddDoctorFormSchema } from "../../../../../validation/addDoctor.form.schema";

interface ServiceInformationProps {
  error: FieldErrors<TAddDoctorFormSchema>;
  getValues: any;
  setValues: any;
}

const doctorServices = [
  "General Consultation",
  "Vaccination",
  "Blood Test",
  "ECG (Electrocardiogram)",
  "Ultrasound",
  "Physical Therapy",
  "Diet and Nutrition Counseling",
  "Psychological Counseling",
  "Skin Treatment",
  "Prescription / Medication Management",
];

const ServiceInformation = ({
  error,
  getValues,
  setValues,
}: ServiceInformationProps) => {
  const [filteredServices, setFilteredServices] = useState(doctorServices);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleServices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues("services", value);
    const filtered = doctorServices.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    if (value.trim() === "") {
      setShowSuggestions(false);
      setFilteredServices(doctorServices);
      return;
    }

    setFilteredServices(filtered);
    setShowSuggestions(true);
  };

  const handleSelectServices = (name: string) => {
    setValues("services", name);
    setShowSuggestions(false);
  };
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Service Information
      </h3>

      {/* Service */}
      <div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Services Name
          </label>
          <input
            type="text"
            value={getValues("services") || ""}
            onChange={handleServices}
            placeholder="Vaccination"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showSuggestions && filteredServices.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredServices.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectServices(item)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {error?.services?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.services.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceInformation;
