import { User, Mail, Lock, Phone } from "lucide-react";
import type { TDoctorSignUpSchema } from "../../../../../validation/signup.form.schema";
import FormInput from "../../../../../ui/FormInput";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<TDoctorSignUpSchema>;
  errors: FieldErrors<TDoctorSignUpSchema>;
}

const BasicInfoSection = ({ register, errors }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>

      <FormInput
        error={errors.name?.message}
        icon={User}
        name="name"
        register={register}
        type="text"
      />

      <FormInput
        error={errors.email?.message}
        icon={Mail}
        name="email"
        register={register}
        type="email"
      />

      <FormInput
        error={errors.phone?.message}
        icon={Phone}
        name="phone"
        register={register}
        type="tel"
      />

      <FormInput
        error={errors.password?.message}
        icon={Lock}
        name="password"
        register={register}
        type="password"
      />
    </div>
  );
};

export default BasicInfoSection;
