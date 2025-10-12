import React from "react";

interface SelectInputProps {
  register: any;
  name: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ register, name }) => {
  return (
    <div className="flex gap-6 items-center">
      {/* Doctor seçeneği */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="doctor"
          {...register(name)}
          className="w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-black transition-all"
        />
        <span className="text-gray-700">Doctor</span>
      </label>

      {/* Patient seçeneği */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="patient"
          {...register(name)}
          className="w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-black transition-all"
        />
        <span className="text-gray-700">Patient</span>
      </label>
    </div>
  );
};

export default SelectInput;
