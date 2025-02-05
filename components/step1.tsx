import type React from "react";
import { useRouter } from "next/router";
import ImagePetDefauit from "@/public/assets/petimage.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
interface Step1Props {
  formData: {
    name: string;
    imageUrl: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Step1({
  formData,
  handleChange,
  nextStep,
  handleImageUpload,
}: Step1Props) {
  const router = useRouter();
  const [errorName, setErrorName] = useState<string>("");
  console.log(formData.name);
  useEffect(() => {
    if (formData.name !== "") {
      setErrorName("");
    }
  }, [formData.name]);
  const handleChangePageCheck = () => {
    if (formData.name === "") {
      setErrorName("Please enter your pet name");
      return;
    }
    nextStep();
  };

  return (
    <div className=" bg-white ">
      {/* Steps indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="bg-[#FF5C00] text-white rounded-full w-8 h-8 flex items-center justify-center">
              1
            </div>
            <span className="ml-2 text-[#FF5C00] font-medium">Basic</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
              2
            </div>
            <span className="ml-2 text-gray-400">Additional</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
              3
            </div>
            <span className="ml-2 text-gray-400">Final</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-96 mx-auto h-auto ">
        <div className="grid grid-cols-1 ">
          <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors ">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full bg-base-200 ring ring-[#FF5C00] ring-offset-base-100 ring-offset-2 ">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl || ImagePetDefauit}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="w-[80%] h-auto flex items-center justify-center">
                          <Image
                            src={ImagePetDefauit}
                            alt="petimage"
                            width={10}
                            height={10}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FF5C00] flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    name="description"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <span className="text-[#FF5C00] font-medium">Your Pet</span>
            <div className="flex flex-col w-[80%] gap-2">
              {errorName ? (
                <span className="text-red-500 font-bold">{errorName}</span>
              ) : (
                <span className="text-[#FF5C00]">Pet Name</span>
              )}
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your pet name"
                required
                className={`${
                  errorName
                    ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                    : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                } `}
              />
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-12">
          <button
            className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00]  transition-colors"
            onClick={() => router.push("/")}
          >
            Back
          </button>
          <button
            className={`${
              errorName
                ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] "
            }`}
            onClick={handleChangePageCheck}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
