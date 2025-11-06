import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { TDoctorSignUpSchema } from "../../../../../validation/signup.form.schema";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  register: UseFormRegister<TDoctorSignUpSchema>;
  errors: FieldErrors<TDoctorSignUpSchema>;
  control: Control<TDoctorSignUpSchema>;
}

const ServicesAddressSection = ({ register, errors, control }: Props) => {
  const [serviceInput, setServiceInput] = useState("");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const addService = () => {
    if (serviceInput.trim()) {
      append({ value: serviceInput.trim() });
      setServiceInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Hizmetler */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          The Services You Provide
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addService())
            }
            placeholder="Add Service"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addService}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={20} />
          </button>
        </div>

        {fields.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full"
              >
                <span className="text-sm">{field.value}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.services && (
          <p className="text-red-500 text-sm">{errors.services.message}</p>
        )}
      </div>

      {/* Adres Bilgileri */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Address Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street/Avenue
          </label>
          <input
            {...register("address.street")}
            placeholder="Street/Avenue"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              {...register("address.city")}
              placeholder="City"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District/Region
            </label>
            <input
              {...register("address.state")}
              placeholder="District/Region"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal code
            </label>
            <input
              {...register("address.zipCode")}
              placeholder="Postal code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              {...register("address.country")}
              placeholder="Country"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.country.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesAddressSection;
