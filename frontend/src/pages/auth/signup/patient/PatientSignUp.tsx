import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../../../redux/api/auth-api";
import FormInput from "../../../../ui/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PatientSchema,
  type TPatientSignUpSchema,
} from "../../../../validation/signup.form.schema";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Lock, Mail, User } from "lucide-react";
import Button from "../../../../ui/Button";

const PatientSignUp = () => {
  const navigate = useNavigate();
  const [registerMutation, { error: registerError, isSuccess }] =
    useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TPatientSignUpSchema>({
    resolver: zodResolver(PatientSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "patient",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register successful");
      reset();
      navigate("/", { replace: true });
    } else if (registerError && "data" in registerError) {
      toast.error((registerError as any)?.data?.message || "Register failed!");
    }
  }, [isSuccess, navigate, reset, registerError]);

  const onSubmit = async (data: TPatientSignUpSchema) => {
    try {
      await registerMutation(data).unwrap();
    } catch (error) {
      console.error("Error Login:", error);
    }
  };
  return (
    <div className="py-8 px-4 relative">
      <Link to={"/login"} className="absolute -top-4 border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-200">
        <ArrowLeft/>
      </Link>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-8 text-white">
            <h1 className="!text-xl font-bold">Patient Register</h1>
            <p className="mt-2 text-blue-100">
              Create your professional account
            </p>
          </div>
        </div>
        <div className="w-full mt-12">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="px-6 py-2"
            >
              {isSubmitting ? "Loading..." : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientSignUp;
