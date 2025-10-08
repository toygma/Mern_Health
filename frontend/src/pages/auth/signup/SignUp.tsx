import { useForm } from "react-hook-form";
import {
  SignUpFormSchema,
  type TSignUpFormSchema,
} from "../../../../validation/login.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../ui/FormInput";
import { Lock, Mail, User } from "lucide-react";
import Button from "../../../ui/Button";
import { Link } from "react-router";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpFormSchema>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TSignUpFormSchema) => {
    console.log("Form Verisi:", data);
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
            <Button
              children={"Sign Up"}
              className="py-2"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </form>
          <div>
            <p>
              Do you have an account? <Link to={"/login"} className="underline text-blue-400">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
