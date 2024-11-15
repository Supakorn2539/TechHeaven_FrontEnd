import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "@/API/product-api";
import useAuthStore from "@/stores/authStore";
import { Loader, Camera, X } from 'lucide-react';


const Uploadfile = ({ form, setForm, setForm2, inputImageRef, imageForm }) => {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image`);
          continue;
        }

        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(data)
              .then((res) => {
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Image uploaded successfully!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = async (public_id) => {
    await removeFiles(public_id)
      .then((res) => {
        setForm2((prev) => ({
          ...prev,
          images: prev.images.filter((item) => item.public_id !== public_id),
        }));
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {isLoading && <Loader className="w-16 h-16 animate-spin" />}

        {(imageForm || form.images)?.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 hover:scale-105" src={item.imageUrl || item.secure_url} alt="Uploaded" />
            <div
              onClick={() => handleDelete(item.public_id)}
              className="p-[1px] rounded-md bg-white hover:border hover:border-red-500 hover:bg-red-500 hover:text-red-500 cursor-pointer duration-200 absolute top-0 right-0"
            >
              <X className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <span className="text-sm font-medium mr-2 text-slate-700">Upload Product Image: </span>
        <button
          type="button"
          onClick={() => inputImageRef.current.click()}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 hover:bg-slate-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Camera className="w-6 h-6 text-slate-600" />
        </button>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          ref={inputImageRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Uploadfile;
