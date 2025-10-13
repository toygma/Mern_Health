import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TAddDoctorFormSchema } from "../../../../../validation/addDoctor.form.schema";

interface AddressInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
}

const AddressInformation = ({ error, register }: AddressInformationProps) => {
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Address Information
      </h3>

      {/* Street */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Street
        </label>
        <input
          type="text"
          {...register("address.street")}
          placeholder="123 Main Street"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.street?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.street.message}
          </p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          {...register("address.city")}
          placeholder="New York"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.city?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.city.message}
          </p>
        )}
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          District
        </label>
        <input
          type="text"
          {...register("address.district")}
          placeholder="Manhattan"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.district?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.district.message}
          </p>
        )}
      </div>

      {/* Postal Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <input
          type="text"
          {...register("address.postalCode")}
          placeholder="10001"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.postalCode?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.postalCode.message}
          </p>
        )}
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          {...register("address.country")}
          placeholder="United States"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.country?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.country.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressInformation;
