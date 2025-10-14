import { useRef, useState } from "react";
import type { FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import type { TAddDoctorFormSchema } from "../../../../../validation/addDoctor.form.schema";

interface Props {
  getValues: UseFormGetValues<TAddDoctorFormSchema>;
  setValue: UseFormSetValue<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
}

const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const MAX_IMAGES = 3;

const UploadImage = ({ setValue, getValues, error }: Props) => {
  console.log("🚀 ~ UploadImage ~ error:", error);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFilesChange = (files: FileList | null) => {
    if (!files) return;

    const currentImages = getValues("images") || [];
    const newFiles = Array.from(files);

    if (currentImages.length + newFiles.length > MAX_IMAGES) {
      return toast.error(`En fazla ${MAX_IMAGES} resim yükleyebilirsiniz.`);
    }

    newFiles.forEach((file) => {
      if (file.size > MAX_SIZE) {
        return toast.error("4MB'dan büyük resimler yükleyemezsiniz.");
      }

      const reader = new FileReader();
      
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === 'string') {
          const newImageUrl = reader.result;

          setPreviewImages((oldPreviews) => [...oldPreviews, newImageUrl]);
          
          const imagesInForm = getValues("images") || [];
          setValue(
            "images", 
            [...imagesInForm, newImageUrl],
            { shouldValidate: true }
          );
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = getValues("images") || [];
    const newImages = [...currentImages];
    const newPreviews = [...previewImages];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setValue("images", newImages, { shouldValidate: true });
    setPreviewImages(newPreviews);
  };

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Upload Images
      </h3>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={(e) => handleFilesChange(e.target.files)}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      >
        Select Images
      </button>

      {previewImages.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {previewImages.map((src, idx) => (
            <div
              key={idx}
              className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={src}
                alt={`Preview ${idx}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      {error && error?.images && error?.images[0]?.message && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {error.images[0].message}
        </p>
      )}
    </div>
  );
};

export default UploadImage;