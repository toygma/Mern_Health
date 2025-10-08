import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  type TLoginFormSchema,
} from "../../../../validation/login.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../ui/FormInput";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TLoginFormSchema) => {
    console.log("Form Verisi:", data);
  };
  return (
    <div className=" flex items-center justify-center overflow-hidden">
      <div className="bg-white shadow-2xl rounded-2xl w-[450px] overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#9f887f] to-[#b39a8f] p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9f887f] to-[#b39a8f] rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="font-bold tracking-wider text-2xl text-white">
              MERN-HEALTH
            </h2>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h1 className="text-xl! font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to your peaceful space
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pb-8 flex flex-col gap-5"
        >
          <FormInput
            error={errors?.name?.message}
            name="name"
            register={register}
            type="text"
            icon={User}
          />
          <FormInput
            error={errors?.email?.message}
            name="email"
            register={register}
            type="email"
            icon={Mail}
          />
          <FormInput
            error={errors?.password?.message}
            name="password"
            register={register}
            type="password"
            icon={Lock}
          />
          <FormInput
            error={errors?.confirmpassword?.message}
            name="confirmpassword"
            register={register}
            type="password"
            icon={Lock}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#9f887f] to-[#b39a8f] text-white font-semibold py-3.5 rounded-lg
            hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-lg
            hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#9f887f] hover:text-[#8a7469] font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
