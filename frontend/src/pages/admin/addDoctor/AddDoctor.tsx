import { useForm } from "react-hook-form";
import BasicInformation from "./_components/BasicInformation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TAddDoctorFormSchema,
  AddDoctorFormSchema,
} from "../../../../validation/addDoctor.form.schema";
import Button from "../../../ui/Button";
import AddresInformation from "./_components/AddresInformation";
import EducationInformation from "./_components/EducationInformation";
import ServiceInformation from "./_components/ServiceInformation";
import WorkingInformation from "./_components/WorkingInformation";
import { useAddDoctorMutation } from "../../../redux/api/doctor-api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AwardInformation from "./_components/AwardInformation";
import UploadImage from "./_components/UploadImage";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TAddDoctorFormSchema>({
    resolver: zodResolver(AddDoctorFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      images: [],
      speciality: "",
      available: true,
      role: "doctor",
      experience: 0,
      about: "",
      education: [],
      services: "",
      address: {
        street: "",
        city: "",
        district: "",
        postalCode: "",
        country: "",
      },
      phone: "",
      fee: 0,
      patients: 0,
      awards: [
        {
          title: "",
          year: "",
          description: "",
          organization: "",
        },
      ],
      workingHours: [
        {
          dayOfWeek: 0,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 1,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 2,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 3,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 4,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 5,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 6,
          isWorking: false,
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
    },
  });
  const [
    createDoctorMutation,
    { error: doctorError, isLoading: doctorLoading, isSuccess },
  ] = useAddDoctorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created successful");
    } else if (doctorError && "data" in doctorError) {
      toast.error((doctorError as any)?.data?.message || "Created failed!");
    }
  }, [isSuccess, doctorError]);

  const onSubmit = async (data: TAddDoctorFormSchema) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      await createDoctorMutation({
        ...data,
        workingHours: data.workingHours.filter(
          (item) => item.isWorking === true
        ),
      });
    } catch (error) {
      console.error("Error Login:", error);
    }
  };
  return (
    <div className="container mx-auto mt-12 px-4">
      <div className="mb-8 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Add New Doctor
        </h2>
        <p className="mt-2 text-gray-600">
          Fill in the details below to add a new doctor to the system.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl"
        >
          <BasicInformation
            register={register}
            error={errors}
            getValues={getValues}
            setValues={setValue}
          />

          <UploadImage  setValue={setValue} getValues={getValues} error={errors} />

          <AddresInformation register={register} error={errors} />

          <EducationInformation
            register={register}
            error={errors}
            control={control}
          />

          <AwardInformation
            register={register}
            error={errors}
            control={control}
          />

          <ServiceInformation
            error={errors}
            getValues={getValues}
            setValues={setValue}
          />

          <WorkingInformation
            error={errors}
            control={control}
            setValues={setValue}
            watch={watch}
          />

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || doctorLoading}
              loading={isSubmitting || doctorLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700  disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Add Doctor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
