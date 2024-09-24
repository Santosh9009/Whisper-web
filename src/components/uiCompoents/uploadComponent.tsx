"use client"
import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { toast } from "../ui/use-toast";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

interface UploadComponentProps {
  onUploadSuccess: (uploadedFile: CloudinaryUploadResult) => void; // Change to accept a single file
}

export const UploadComponent: React.FC<UploadComponentProps> = ({
  onUploadSuccess,
}) => {
  const [resource, setResource] = useState<CloudinaryUploadResult | null>(null); // Change to store a single file

  const handleUploadSuccess = (uploadedFiles: CloudinaryUploadResult[]) => {
    if (uploadedFiles.length > 1) {
      toast({
        description: "You can only upload one photo.",
      });
      return;
    }

    // Set the uploaded resource if there's one file
    if (uploadedFiles.length === 1) {
      setResource(uploadedFiles[0]);
      onUploadSuccess(uploadedFiles[0]); // Pass the single uploaded file
    }
  };

  const handleRemoveImage = () => {
    setResource(null); // Clear the selected resource
  };

  return (
    <div>
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result) => {
          const uploadedFiles: CloudinaryUploadResult[] = Array.isArray(result?.info)
            ? result.info.filter((file): file is CloudinaryUploadResult =>
                !!file && typeof file === "object" && "secure_url" in file && "public_id" in file
              )
            : result?.info && typeof result.info === "object" && "secure_url" in result.info && "public_id" in result.info
              ? [result.info as CloudinaryUploadResult] 
              : []; 

          handleUploadSuccess(uploadedFiles);
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
        options={{
          multiple: false, // Restrict to a single upload
          maxFiles: 1, // Allow only one file
        }}
      >
        {({ open }) => {
          const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (resource) {
              toast({
                description: "You can only upload one photo.",
              });
              return; 
            }

            open(); 
          };

          return (
            <button
              className="flex justify-center items-center gap-1 hover:bg-[#090909] p-2 rounded-md"
              onClick={handleOnClick}
            >
              Upload <Upload className="w-4 h-4" />
            </button>
          );
        }}
      </CldUploadWidget>

      {resource && (
        <div className="flex items-center gap-3 py-5">
          <CldImage
            width={100}
            height={100}
            src={resource.secure_url}
            alt="Uploaded File"
          />
          <button
            onClick={handleRemoveImage}
            className="ml-2 text-red-500"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
