import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { TDoctorSignUpSchema } from "../../../../../validation/signup.form.schema";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  register: UseFormRegister<TDoctorSignUpSchema>;
  errors: FieldErrors<TDoctorSignUpSchema>;
  control: Control<TDoctorSignUpSchema>;
}

const EducationSection = ({ register, errors, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Education Information
        </h3>
        <button
          type="button"
          onClick={() => append({ degree: "", institution: "", year: "" })}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border p-4 rounded-lg bg-gray-50 relative"
        >
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                {...register(`education.${index}.degree`)}
                placeholder="e.g., Faculty of Medicine"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.education?.[index]?.degree && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education[index]?.degree?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                {...register(`education.${index}.institution`)}
                placeholder="e.g., Istanbul University"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.education?.[index]?.institution && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education[index]?.institution?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                {...register(`education.${index}.year`)}
                placeholder="2015"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.education?.[index]?.year && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education[index]?.year?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
