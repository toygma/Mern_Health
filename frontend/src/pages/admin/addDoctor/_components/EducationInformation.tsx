import {
  useFieldArray,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import type { TAddDoctorFormSchema } from "../../../../validation/addDoctor.form.schema";

interface EducationInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
  control: any;
}

const EducationInformation = ({
  register,
  error,
  control,
}: EducationInformationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Education Information
      </h3>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded space-y-2">
          {/* Degree */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <input
              type="text"
              {...register(`education.${index}.degree` as const)}
              placeholder="Degree"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.education?.[index]?.degree && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.education[index]?.degree?.message}
              </p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Institution
            </label>
            <input
              type="text"
              {...register(`education.${index}.institution` as const)}
              placeholder="Institution"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.education?.[index]?.institution && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.education[index]?.institution?.message}
              </p>
            )}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="text"
              {...register(`education.${index}.year` as const)}
              placeholder="Year"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.education?.[index]?.year && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.education[index]?.year?.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-sm text-red-500 mt-1"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ degree: "", institution: "", year: "" })}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
      >
        Add Education
      </button>
    </div>
  );
};

export default EducationInformation;
