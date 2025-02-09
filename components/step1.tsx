"use client";
import type React from "react";
import { useRouter } from "next/router";
import ImagePetDefauit from "@/public/assets/petimage.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/toggleLanguage";

interface Step1Props {
  formData: {
    pet_name: string;
    image_pet: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleLanguage: () => void;
}

export default function Step1({
  formData,
  handleChange,
  nextStep,
  handleImageUpload,
}: Step1Props) {
  const router = useRouter();
  const [errorName, setErrorName] = useState<string>("");
  const [errorNameEn, setErrorNameEn] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false); // เพิ่ม useState เพื่อให้แน่ใจว่าเราไม่เจอ hydration error
  const { ChangeLanguage, toggleLanguage } = useLanguage();

  useEffect(() => {
    setIsMounted(true); // ตั้งค่าสถานะให้เป็น true เมื่อ component ถูก mount
  }, []);

  useEffect(() => {
    // ทำให้ React รู้ว่าเป็นไคลเอ็นต์
    if (formData.pet_name !== "") {
      setErrorName("");
      setErrorNameEn("");
    }
  }, [formData.pet_name]);
  const handleChangePageCheck = () => {
    if (formData.pet_name === "") {
      setErrorName("Please enter your pet name");
      setErrorNameEn("กรุณาใส่ชื่อสัตว์เลี้ยง");
      return;
    }
    nextStep();
  };
  if (!isMounted) return null;
  // console.log(formData.ChangeLanguage);

  return (
    <div className=" bg-white ">
      {/* Steps indicator */}

      <div className="max-w-xl mx-auto ">
        <div className="text-2xl flex justify-end ">
          <div
            className="bg-[#FF5C00] p-2 rounded-full hidden text-white absolute top-32 md:inline cursor-pointer"
            onClick={() => toggleLanguage()}
          >
            {ChangeLanguage === true ? "EN" : "TH"}
          </div>
        </div>
      </div>
      {ChangeLanguage ? (
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
      ) : (
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="bg-[#FF5C00] text-white rounded-full w-8 h-8 flex items-center justify-center">
                1
              </div>
              <span className="ml-2 text-[#FF5C00] font-medium">พื้นฐาน</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                2
              </div>
              <span className="ml-2 text-gray-400">ทั่วไป</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                3
              </div>
              <span className="ml-2 text-gray-400">เพิ่มเติม</span>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      {ChangeLanguage ? (
        <div className="max-w-96 mx-auto h-auto ">
          <div className="grid grid-cols-1 ">
            <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors py-10">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full bg-base-200 ring ring-[#FF5C00] ring-offset-base-100 ring-offset-2 ">
                      {formData.image_pet ? (
                        <img
                          src={formData.image_pet || ImagePetDefauit} // ใช้ path ที่สัมพันธ์กับ public
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="w-[80%] h-auto flex items-center justify-center">
                            <Image
                              src="/assets/petimage.svg" // ใช้ path ที่สัมพันธ์กับ public
                              alt="petimage"
                              width={100} // กำหนดขนาดให้เหมาะสม
                              height={100} // กำหนดขนาดให้เหมาะสม
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
                  id="pet_name"
                  name="pet_name"
                  value={formData.pet_name}
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
              className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
              onClick={() => router.push("/")}
            >
              Back
            </button>
            <button
              className={`${
                errorName
                  ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
              }`}
              onClick={handleChangePageCheck}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // Thai
        <div className="max-w-96 mx-auto h-auto ">
          <div className="grid grid-cols-1 ">
            <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors py-10">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full bg-base-200 ring ring-[#FF5C00] ring-offset-base-100 ring-offset-2 ">
                      {formData.image_pet ? (
                        <img
                          src={formData.image_pet || ImagePetDefauit} // ใช้ path ที่สัมพันธ์กับ public
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="w-[80%] h-auto flex items-center justify-center">
                            <Image
                              src="/assets/petimage.svg" // ใช้ path ที่สัมพันธ์กับ public
                              alt="petimage"
                              width={100} // กำหนดขนาดให้เหมาะสม
                              height={100} // กำหนดขนาดให้เหมาะสม
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
              <span className="text-[#FF5C00] font-medium">
                สัตว์เลี้ยงของคุณ
              </span>
              <div className="flex flex-col w-[80%] gap-2">
                {errorNameEn ? (
                  <span className="text-red-500 font-bold">{errorNameEn}</span>
                ) : (
                  <span className="text-[#FF5C00]">ชื่อสัตว์เลี้ยง</span>
                )}
                <input
                  type="text"
                  id="pet_name"
                  name="pet_name"
                  value={formData.pet_name}
                  onChange={handleChange}
                  placeholder="ขื่อสัตว์เลี้ยง"
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
          {ChangeLanguage ? (
            <div className="flex justify-between mt-12">
              <button
                className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] transition-colors"
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
          ) : (
            <div className="flex justify-between mt-12">
              <button
                className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] transition-colors"
                onClick={() => router.push("/")}
              >
                กลับ
              </button>
              <button
                className={`${
                  errorName
                    ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] "
                }`}
                onClick={handleChangePageCheck}
              >
                ถัดไป
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
