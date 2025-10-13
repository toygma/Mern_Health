import { useFieldArray, type FieldErrors } from "react-hook-form";
import type { TAddDoctorFormSchema } from "../../../../../validation/addDoctor.form.schema";

interface WorkingInformationProps {
  error: FieldErrors<TAddDoctorFormSchema>;
  control: any;
  setValues: any;
  watch: any;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WorkingInformation = ({
  error,
  control,
  setValues,
  watch,
}: WorkingInformationProps) => {
  const { fields } = useFieldArray({
    control,
    name: "workingHours",
  });

  const workingHours = watch("workingHours");

  const handleWorkingHoursChange = (
    dayOfWeek: number,
    field: "isWorking" | "startTime" | "endTime",
    value: boolean | string
  ) => {
    const updated = [...workingHours];
    updated[dayOfWeek] = { ...updated[dayOfWeek], [field]: value };
    setValues("workingHours", updated);
  };

  return (
    <div className="space-y-3">
      <div className="pt-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 pb-2">
          Working Information
        </h3>
      </div>
      {fields.map((wh, index) => (
        <div key={wh.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-2 w-40">
              <input
                type="checkbox"
                checked={workingHours[index]?.isWorking || false}
                onChange={(e) =>
                  handleWorkingHoursChange(index, "isWorking", e.target.checked)
                }
                className="w-4 h-4"
              />
              <span className="font-medium text-gray-700">
                {daysOfWeek[index]}
              </span>
            </label>

            {workingHours[index]?.isWorking && (
              <div className="flex gap-4">
                <input
                  type="time"
                  value={workingHours[index]?.startTime || "09:00"}
                  onChange={(e) =>
                    handleWorkingHoursChange(index, "startTime", e.target.value)
                  }
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="time"
                  value={workingHours[index]?.endTime || "17:00"}
                  onChange={(e) =>
                    handleWorkingHoursChange(index, "endTime", e.target.value)
                  }
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      {error?.workingHours?.message && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {error?.workingHours.message}
        </p>
      )}
    </div>
  );
};

export default WorkingInformation;
