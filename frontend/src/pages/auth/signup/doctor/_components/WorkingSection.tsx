import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { TDoctorSignUpSchema } from "../../../../../validation/signup.form.schema";
import { DAYS_OF_WEEK } from "../../../../../types/types";

interface Props {
  register: UseFormRegister<TDoctorSignUpSchema>;
  errors: FieldErrors<TDoctorSignUpSchema>;
  control: Control<TDoctorSignUpSchema>;
}

const WorkingHoursSection = ({ register, errors, control }: Props) => {
  const { fields } = useFieldArray({
    control,
    name: "workingHours",
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Working Hours</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Appointment Duration (Minutes)
        </label>
        <input
          type="number"
          {...register("appointmentDurationMinutes", { valueAsNumber: true })}
          placeholder="30"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.appointmentDurationMinutes && (
          <p className="text-red-500 text-sm mt-1">
            {errors.appointmentDurationMinutes.message}
          </p>
        )}
      </div>

      <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
        {fields.map((field, index) => {
          const dayLabel = DAYS_OF_WEEK.find(
            (d) => d.value === field.dayOfWeek
          )?.label;

          return (
            <div key={field.id} className="flex items-center gap-3">
              <div className="w-24 font-medium text-gray-700">{dayLabel}</div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register(`workingHours.${index}.isWorking`)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">It works</span>
              </label>

              <input
                type="time"
                {...register(`workingHours.${index}.startTime`)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              <span className="text-gray-500">-</span>

              <input
                type="time"
                {...register(`workingHours.${index}.endTime`)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          );
        })}
      </div>

      {errors.workingHours && (
        <p className="text-red-500 text-sm">{errors.workingHours.message}</p>
      )}
    </div>
  );
};

export default WorkingHoursSection;
