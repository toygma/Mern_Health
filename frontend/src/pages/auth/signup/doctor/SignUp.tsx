// pages/DoctorSignUp.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Bileşenler
import {
  DoctorSignUpSchema,
  type TDoctorSignUpSchema,
} from "../../../../validation/signup.form.schema";
import { DAYS_OF_WEEK } from "../../../../types/types";
import BasicInfoSection from "./_components/BasicInfoSection";
import ProfessionalInfoSection from "./_components/ProfessionalSection";
import EducationSection from "./_components/EducationSection";
import ServicesAddressSection from "./_components/ServiceAddresSection";
import WorkingHoursSection from "./_components/WorkingSection";
import Button from "../../../../ui/Button";
import { useRegisterMutation } from "../../../../redux/api/auth-api";
import { ArrowLeft } from "lucide-react";

const DoctorSignUp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registerMutation, { error: registerError, isSuccess }] =
    useRegisterMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TDoctorSignUpSchema>({
    resolver: zodResolver(DoctorSignUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      speciality: "",
      experience: "",
      about: "",
      fee: 100,
      education: [{ degree: "", institution: "", year: "" }],
      services: [],
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
      appointmentDurationMinutes: 30,
      workingHours: DAYS_OF_WEEK.map((d) => ({
        dayOfWeek: d.value,
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
      })),
      role: "doctor",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register successful");
      reset();
      navigate("/", { replace: true });
    } else if (registerError && "data" in registerError) {
      toast.error((registerError as any)?.data?.message || "Login failed!");
    }
  }, [isSuccess, navigate, reset, registerError]);

  const onSubmit = async (data: TDoctorSignUpSchema) => {
    try {
      await registerMutation(data).unwrap();
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Professional Information" },
    { number: 3, title: "Education & Services" },
    { number: 4, title: "Working Hours" },
  ];
  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen  py-8 px-4 relative">
      <Link
        to={"/login"}
        className="absolute -top-4 border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-200"
      >
        <ArrowLeft />
      </Link>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Doctor Register</h1>
            <p className="mt-2 text-blue-100">
              Create your professional account
            </p>
          </div>

          {/* Step Indicator */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        currentStep >= step.number
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step.number
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              {currentStep === 1 && (
                <BasicInfoSection register={register} errors={errors} />
              )}

              {currentStep === 2 && (
                <ProfessionalInfoSection register={register} errors={errors} />
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <EducationSection
                    register={register}
                    errors={errors}
                    control={control}
                  />
                  <ServicesAddressSection
                    register={register}
                    errors={errors}
                    control={control}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <WorkingHoursSection
                  register={register}
                  errors={errors}
                  control={control}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4  border-t flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                Prev
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="px-6 py-2"
                >
                  {isSubmitting ? "Loading..." : "Register"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;
