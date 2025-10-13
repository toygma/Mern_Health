import {
  useFieldArray,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import type { TAddDoctorFormSchema } from "../../../../../validation/addDoctor.form.schema";

interface AwardInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
  control: any;
}

const AwardInformation = ({
  register,
  error,
  control,
}: AwardInformationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  });

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Awards Information
      </h3>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded space-y-2">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register(`awards.${index}.title` as const)}
              placeholder="Title"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.title && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.title?.message}
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
              {...register(`awards.${index}.year` as const)}
              placeholder="Year"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.year && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.year?.message}
              </p>
            )}
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              description
            </label>
            <input
              type="text"
              {...register(`awards.${index}.description` as const)}
              placeholder="description"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.year && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.year?.message}
              </p>
            )}
          </div>

          {/* organization */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              organization
            </label>
            <input
              type="text"
              {...register(`awards.${index}.organization` as const)}
              placeholder="organization"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.year && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.year?.message}
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
        onClick={() =>
          append({ title: "", year: "", description: "", organization: "" })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
      >
        Add awards
      </button>
    </div>
  );
};

export default AwardInformation;
