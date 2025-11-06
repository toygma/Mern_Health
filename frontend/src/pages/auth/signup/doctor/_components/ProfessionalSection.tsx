import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TDoctorSignUpSchema } from "../../../../../validation/signup.form.schema";
import { SPECIALITIES } from "../../../../../types/types";

interface Props {
  register: UseFormRegister<TDoctorSignUpSchema>;
  errors: FieldErrors<TDoctorSignUpSchema>;
}

const ProfessionalInfoSection = ({ register, errors }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Professional Information
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area of expertise
        </label>
        <select
          {...register("speciality")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose</option>
          {SPECIALITIES.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors.speciality && (
          <p className="text-red-500 text-sm mt-1">
            {errors.speciality.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience (Yıl)
        </label>
        <input
          type="text"
          {...register("experience")}
          placeholder="Ex: 5 year"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.experience && (
          <p className="text-red-500 text-sm mt-1">
            {errors.experience.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Inspection Fee (₺)
        </label>
        <input
          type="number"
          {...register("fee", { valueAsNumber: true })}
          placeholder="500"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fee && (
          <p className="text-red-500 text-sm mt-1">{errors.fee.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About
        </label>
        <textarea
          {...register("about")}
          rows={4}
          placeholder="Introduce yourself..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.about && (
          <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;
