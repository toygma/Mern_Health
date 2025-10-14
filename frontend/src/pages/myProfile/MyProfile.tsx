import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Edit, Edit2Icon, Save, X } from "lucide-react";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from "../../redux/api/user-api";
import toast from "react-hot-toast";
import {
  type TUpdateFormSchema,
  UpdateFormSchema,
} from "../../../validation/user.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../ui/Button";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: userData } = useGetUserQuery();
  const [updateProfile, { isSuccess, error, isLoading }] =
    useUpdateProfileMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<TUpdateFormSchema>({
    resolver: zodResolver(UpdateFormSchema),
    mode: "onChange",
    defaultValues: {
      address: {
        line1: "",
        line2: "",
      },
      dob: "",
      email: "",
      gender: "Male",
      phone: "",
      name: "",
      image: "",
    },
  });

  // Reset form with fetched user data
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "Male",
        dob: userData.dob || "",
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
      });
    }
  }, [userData, reset]);

  useEffect(() => {
    if (isSuccess) toast.success("Profile updated successfully!");
    else if (error && "data" in error) {
      toast.error((error as any)?.data?.message || "Update failed!");
    }
  }, [isSuccess, error]);

  //file
  const MAX_SIZE = 4 * 1024 * 1024;

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > MAX_SIZE) {
      toast.error("4MB'dan büyük resim yükleyemezsiniz.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        const newImageUrl = reader.result;

        setPreviewImage(newImageUrl);

        setValue("image", newImageUrl, { shouldValidate: true });
      }
    };

    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: TUpdateFormSchema) => {
    try {
      await updateProfile({ id: userData?._id, body: data });
      setIsEdit(false);
    } catch (err: any) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      toast.error(err.message);
    }
  };

  const watchAll = watch();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-8 pb-8">
              <div className="flex items-end gap-6 -mt-16 mb-6 relative">
                {/* Önizleme resmi varsa onu göster */}
                {previewImage ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewImage("")}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <img
                    src={userData?.image?.url || userData?.image[0]?.url}
                    alt={watchAll.name}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                  />
                )}

                {/* Düzenleme butonu */}
                {isEdit && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg bg-blue-500 text-white hover:bg-blue-600 p-1 cursor-pointer absolute left-0 bottom-0"
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                {isEdit ? (
                  <>
                    <Button
                      disabled={isSubmitting || isLoading}
                      loading={isSubmitting || isLoading}
                      type="submit"
                      className="flex items-center border-none gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                      <Save size={20} />
                      Kaydet
                    </Button>
                    <button
                      type="button"
                      onClick={() => setIsEdit(false)}
                      className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                      <X size={20} />
                      İptal
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEdit(true)}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    <Edit size={20} />
                    Düzenle
                  </button>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                İletişim Bilgileri
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Telefon
                    </label>
                    <input
                      {...register("phone")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Adres
                    </label>
                    <input
                      {...register("address.line1")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500 mb-2"
                    />
                    <input
                      {...register("address.line2")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Temel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Cinsiyet
                  </label>
                  <select
                    {...register("gender")}
                    disabled={!isEdit}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Erkek</option>
                    <option value="Female">Kadın</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Doğum Tarihi
                  </label>
                  <input
                    {...register("dob")}
                    type="date"
                    disabled={!isEdit}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
