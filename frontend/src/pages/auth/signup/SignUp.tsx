import { useForm, useFieldArray } from "react-hook-form";
import {
  SignUpFormSchema,
  type TSignUpFormSchema,
} from "../../../../validation/login.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../ui/FormInput";
import { Lock, Mail, User } from "lucide-react";
import Button from "../../../ui/Button";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../../redux/api/auth-api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import SelectInput from "../../../ui/SelectInput";

const daysOfWeek = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 },
];

const SignUp = () => {
  const navigate = useNavigate();
  const [
    registerMutation,
    { error: registerError, isLoading: registerLoading, isSuccess },
  ] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpFormSchema>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "patient",
      workingHours: daysOfWeek.map((d) => ({
        dayOfWeek: d.value,
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
      })),
    },
  });

  const watchedRole = watch("role");

  const { fields } = useFieldArray({
    control,
    name: "workingHours",
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful");
      reset();
      navigate("/login", { replace: true });
    } else if (registerError && "data" in registerError) {
      toast.error(
        (registerError as any)?.data?.message || "Registration failed!"
      );
    }
  }, [isSuccess, navigate, reset, registerError]);

  const onSubmit = async (data: TSignUpFormSchema) => {
    try {
      await registerMutation(data).unwrap();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[450px]">
        <div className="flex flex-col gap-2 p-6">
          <h1 className="text-2xl font-bold">Register Now.</h1>
          <p>Secure, quick, and easy</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
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
              error={errors.password?.message}
              name="password"
              register={register}
              type="password"
              icon={Lock}
            />
            <FormInput
              error={errors.confirmpassword?.message}
              name="confirmpassword"
              register={register}
              icon={Lock}
              type="password"
            />

            <SelectInput register={register} name="role" />

            {watchedRole === "doctor" && (
              <div className="border p-4 rounded-lg mt-4 bg-gray-50">
                <h3 className="font-semibold mb-2">Working Hours</h3>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    <span className="w-20">{daysOfWeek[index].label}</span>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        {...register(`workingHours.${index}.isWorking`)}
                      />
                      Working
                    </label>
                    <input
                      type="time"
                      {...register(`workingHours.${index}.startTime`)}
                      className="border px-2 py-1 rounded w-24"
                    />
                    <input
                      type="time"
                      {...register(`workingHours.${index}.endTime`)}
                      className="border px-2 py-1 rounded w-24"
                    />
                  </div>
                ))}
              </div>
            )}

            <Button
              type="submit"
              className="py-3 mt-2"
              loading={isSubmitting || registerLoading}
              disabled={isSubmitting || registerLoading}
            >
              {registerLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <div>
            <p className="mt-2">
              Do you have an account?{" "}
              <Link to={"/login"} className="underline text-blue-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
