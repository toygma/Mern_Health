import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  type TLoginFormSchema,
} from "../../../../validation/login.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../ui/FormInput";
import { Lock, Mail } from "lucide-react";
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
          <div>
            <p>
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="underline text-blue-400">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
