import { useForm } from "react-hook-form";
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

const SignUp = () => {
  const navigate = useNavigate();
  const [
    registerMutation,
    { error: registerError, isLoading: registerLoading, isSuccess },
  ] = useRegisterMutation();

  const {
    register,
    handleSubmit,
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
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("registration successful");
      reset();
      navigate("/login", { replace: true });
    } else if (registerError && "data" in registerError) {
      toast.error(registerError?.data?.message || "Registration failed!");
    }
  }, [isSuccess, navigate, reset, registerError]);

  const onSubmit = async (data: TSignUpFormSchema) => {
    try {
      await registerMutation({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      }).unwrap();
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl!">Register Now.</h1>
          <p>Secure,quick, and easy</p>
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
            <p>
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
