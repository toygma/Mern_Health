import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  type TLoginFormSchema,
} from "../../../validation/login.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../ui/FormInput";
import { Lock, Mail, Stethoscope, User } from "lucide-react";
import Button from "../../../ui/Button";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../../../redux/api/auth-api";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [
    loginMutation,
    { error: loginError, isLoading: loginLoading, isSuccess },
  ] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      reset();
      navigate("/", { replace: true });
    } else if (loginError && "data" in loginError) {
      toast.error((loginError as any)?.data?.message || "Login failed!");
    }
  }, [isSuccess, navigate, reset, loginError]);

  const onSubmit = async (data: TLoginFormSchema) => {
    try {
      await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();
    } catch (error) {
      console.error("Error Login:", error);
    }
  };
  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl!">Login to start your session</h1>
          <p>Secure,quick, and easy</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
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
              className="py-3 mt-2"
              loading={isSubmitting || loginLoading}
              disabled={isSubmitting || loginLoading}
            >
              {loginLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
  {/* Patient Card */}
  <Link
    to="/patient/sign-up"
    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
        <User
          size={48}
          className="text-blue-500 group-hover:text-white transition-colors duration-300"
        />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Patient
        </h3>
        <p className="text-gray-600">
          Book appointments and access healthcare services
        </p>
      </div>
    </div>
  </Link>

  {/* Doctor Card */}
  <Link
    to="/doctor/sign-up"
    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-500"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
        <Stethoscope
          size={48}
          className="text-green-500 group-hover:text-white transition-colors duration-300"
        />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Doctor
        </h3>
        <p className="text-gray-600">
          Manage your patients and accept appointments
        </p>
      </div>
    </div>
  </Link>
</div>

        </div>
      </div>
    </div>
  );
};

export default Login;
