"use client";
import type React from "react";
import { useEffect, useState } from "react";
import CloseIcon from "@/public/assets/close-icon.svg";
import Image from "next/image";
import ImagePetDefauit from "@/public/assets/petimage.svg";
import ImagePetDefauitPng from "@/public/assets/Layer_1.png";
import axios from "axios";
import { useRouter } from "next/router";
import { useLanguage } from "@/context/toggleLanguage";

interface Step3Props {
  formData: {
    pet_name: string;
    image_pet: string;
    age: string;
    breed: string;
    pettype_id: number;
    pet_sex: string;
    about: string;
    disease: boolean;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  prevStep: () => void;
  resetFormData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  toggleLanguage: () => void;
  saveToLocalStorage: () => void;
}

export default function Step3({
  formData,
  handleChange,
  prevStep,
  resetFormData,
  saveToLocalStorage,
}: Step3Props) {
  useEffect(() => {
    if (formData.about !== "") {
      setErrorAbout("");
    }
  }, [formData.about]);
  const [popUpsaveStoreage, setPopUpsaveStoreage] = useState<boolean>(true);
  const [errorAbout, setErrorAbout] = useState<string>("");
  const [errorAboutEn, setErrorAboutEn] = useState<string>("");
  const [popUp, setPopUp] = useState<boolean>(false);
  const router = useRouter();
  const { ChangeLanguage, toggleLanguage } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [loadingBtCreate, setLoadingBtCreate] = useState<boolean>(true);
  // console.log(popUpsaveStoreage);

  const handleChangeCheckPage = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    if (formData.about === "") {
      setErrorAbout("Please enter your pet about");
      setErrorAboutEn("กรุณาระบุสัตว์เลี้ยงของคุณเกี่ยวกับ");
      isValid = false;
    }
    if (isValid) {
      setPopUp(!popUp);
    }
  };

  const handleAddImage = async () => {
    try {
      setLoadingBtCreate(false);
      const response = await fetch(
        formData.image_pet || ImagePetDefauitPng.src
      );
      const blob = await response.blob();
      const file = new File([blob], "pet_image.jpg", { type: blob.type });

      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const uploadResponse = await axios.post(
        "/api/pet/uploadyoupet",
        uploadFormData
      );
      setImage(uploadResponse.data.urls[0]);

      const dataCreate = {
        pet_name: formData.pet_name,
        image_pet: uploadResponse.data.urls[0],
        age: formData.age,
        breed: formData.breed,
        pettype_id: formData.pettype_id,
        pet_sex: formData.pet_sex,
        about: formData.about,
        disease: formData.disease,
        color: "",
        weight: "",
      };

      // console.log(dataCreate);
      console.log(dataCreate);

      await axios.post(`/api/pet`, dataCreate);
      resetFormData({} as React.ChangeEvent<HTMLInputElement>);
      setLoadingBtCreate(true);
      router.push("/");
    } catch (err) {
      console.log("Error uploading image:", err);
    }
  };

  return (
    <>
      <div>
        <div className="bg-white ">
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
          <div className="flex items-center justify-center mb-12">
            {ChangeLanguage ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    1
                  </div>
                  <span className="ml-2 text-black font-medium">Basic</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    2
                  </div>
                  <span className="ml-2 text-black ">Additional</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#FF5C00] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    3
                  </div>
                  <span className="ml-2 text-[#FF5C00]">Final</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    1
                  </div>
                  <span className="ml-2 text-black font-medium">พื้นฐาน</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    2
                  </div>
                  <span className="ml-2 text-black ">ทั่วไป</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#FF5C00] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    3
                  </div>
                  <span className="ml-2 text-[#FF5C00]">เพื่มเติม</span>
                </div>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="max-w-96 mx-auto">
            {ChangeLanguage ? (
              <div className="grid grid-cols-1">
                <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors py-10">
                  {errorAbout ? (
                    <span className="text-red-500 font-bold">{errorAbout}</span>
                  ) : (
                    <span className="text-[#FF5C00]">About Describe</span>
                  )}
                  <div className="flex flex-col w-[80%] gap-2">
                    <textarea
                      id="about"
                      name="about"
                      value={formData.about}
                      placeholder="Describe more about your pet..."
                      onChange={handleChange}
                      rows={4}
                      className="textarea textarea-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start px-8 md:px-10">
                      <input
                        type="checkbox"
                        id="disease"
                        name="disease"
                        checked={formData.disease}
                        onChange={handleChange}
                        className="checkbox bg-white"
                      />
                      <span className="label-text ml-2 text-sm md:text-base ">
                        Does your pet not have any health problems?
                      </span>
                    </label>
                  </div>
                  <div className="w-[80%]">
                    <button
                      onClick={() => {
                        saveToLocalStorage();
                        setPopUpsaveStoreage(!popUpsaveStoreage);
                      }}
                      className="bg-[#FF5C00] text-white py-3 rounded-xl w-full border hover:bg-[#FFF5F2] hover:border hover:border-[#FF5C00] hover:text-[#FF5C00]"
                    >
                      Store form data
                    </button>
                    <div className="text-[12px] mt-2 text-neutral-500">
                      *The details entered will not be lost even if you close
                      the website.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1">
                <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors py-10">
                  {errorAbout ? (
                    <span className="text-red-500 font-bold">
                      {errorAboutEn}
                    </span>
                  ) : (
                    <span className="text-[#FF5C00]">อธิบายเพิ่มเติม</span>
                  )}
                  <div className="flex flex-col w-[80%] gap-2">
                    <textarea
                      id="about"
                      name="about"
                      value={formData.about}
                      placeholder="อธิบายเพิ่มเติมเกี่ยวกับสัตว์เลี้ยงของคุณ.."
                      onChange={handleChange}
                      rows={4}
                      className="textarea textarea-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start px-8 md:px-10">
                      <input
                        type="checkbox"
                        id="disease"
                        name="disease"
                        checked={formData.disease}
                        onChange={handleChange}
                        className="checkbox bg-white"
                      />
                      <span className="label-text ml-2 text-sm md:text-base ">
                        สัตว์เลี้ยงของคุณไม่มีปัญหาสุขภาพใดๆ
                      </span>
                    </label>
                  </div>
                  <div className="w-[80%]">
                    <button
                      onClick={() => {
                        saveToLocalStorage();
                        setPopUpsaveStoreage(!popUpsaveStoreage);
                      }}
                      className="bg-[#FF5C00] text-white py-3 rounded-xl w-full border hover:bg-[#FFF5F2] hover:border hover:border-[#FF5C00] hover:text-[#FF5C00]"
                    >
                      เก็บข้อมูลแบบฟอร์ม
                    </button>
                    <div className="text-[12px] mt-2 text-neutral-500">
                      *รายละเอียดที่ใส่ไว้จะไม่หายไปแม้จะปิดเว็บ
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Navigation buttons */}
            <div className="flex justify-between mt-12">
              <button
                className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
                onClick={prevStep}
              >
                {ChangeLanguage ? "Back" : "กลับ"}
              </button>
              <button
                onClick={handleChangeCheckPage}
                className={`${
                  errorAbout
                    ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
                }`}
              >
                {ChangeLanguage ? "Create" : "เพิ่มข้อมูล"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* popup detail */}
      {popUp && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4 overflow-y-auto ">
          <div className="bg-white shadow-xl w-full max-h-screen md:w-[800px] md:rounded-3xl overflow-y-auto">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10 sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold">
                {ChangeLanguage ? "Pet Detail" : "รายละเอียดสัตว์เลี้ยง"}
              </h2>
              <Image
                src={CloseIcon || "/placeholder.svg"}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUp(!popUp)}
              />
            </div>
            {/* Line เส้นกั้น */}
            <hr className="mb-10" />
            {/* image  */}
            <div className="flex flex-col items-center gap-4 ">
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full bg-base-200 ring ring-[#FF5C00] ring-offset-base-100 ring-offset-2 ">
                    {formData.image_pet ? (
                      <img
                        src={formData.image_pet || ImagePetDefauit}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="w-[80%] h-auto flex items-center justify-center">
                          <Image
                            src="/assets/petimage.svg"
                            alt="petimage"
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!formData.image_pet && (
                <div className="text-red-600">ยังไม่ได้เพิ่มรูปภาพ</div>
              )}
            </div>
            {/* Name and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 md:mb-5">
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400  ">
                  {ChangeLanguage ? " Pet Name" : "ขื่อสัตว์เลี้ยง"}
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {formData.pet_name}
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  mb-2 mx-4  text-gray-400">
                  {ChangeLanguage ? "Pet Age" : "อายุสัตว์เลี้ยง"}
                </h3>
                <div className="text-base  mb-2 mx-4 ">{formData.age}</div>
              </div>
            </div>
            {/* Breed and Sex*/}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5">
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  {ChangeLanguage ? "Breed" : "สายพันธ์"}
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {formData.breed}
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  mb-2 mx-4  text-gray-400">
                  {ChangeLanguage ? "Sex" : "เพศ"}
                </h3>
                <div className="text-base  mb-2 mx-4 ">
                  {ChangeLanguage
                    ? `${formData.pet_sex === "M" ? "Male" : "Female"}`
                    : `${formData.pet_sex === "M" ? "ชาย" : "หญิง"}`}
                </div>
              </div>
            </div>

            {/* pettype  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5 ">
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  {ChangeLanguage ? "Type" : "ประเภท"}
                </h3>

                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {ChangeLanguage
                    ? `${
                        Number(formData.pettype_id) === 2
                          ? "Dog"
                          : Number(formData.pettype_id) === 3
                          ? "Cat"
                          : "Bird"
                      }`
                    : `${
                        Number(formData.pettype_id) === 2
                          ? "หมา"
                          : Number(formData.pettype_id) === 3
                          ? "แมว"
                          : "นก"
                      }`}
                </div>
              </div>
              <div className="">
                <h3 className="text-xl mb-2 mx-4  text-gray-400">
                  {ChangeLanguage ? "Disease" : "สุขภาพของสัตว์เลี้ยง"}
                </h3>
                <div
                  className={`text-base  mb-2 mx-4  ${
                    formData.disease ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {ChangeLanguage
                    ? `${
                        formData.disease
                          ? "your pet not have any health problems"
                          : "Your pet has health problems"
                      }`
                    : `${
                        formData.disease
                          ? "สัตว์เลี้ยงของคุณไม่มีปัญหาสุขภาพใดๆ"
                          : "สัตว์เลี้ยงของคุณมีปัญหาสุขภาพ"
                      }`}
                </div>
              </div>
            </div>

            {/* textarea  */}
            <h1 className="mx-4 mb-2 md:mx-10 text-gray-400 text-xl">
              {ChangeLanguage ? "About" : "รายละเอียดเพิ่มเติม"}
            </h1>
            <div className="flex flex-col w-auto mx-4 gap-2 md:w-[90%]  md:mx-auto">
              <textarea
                id="about"
                name="about"
                value={formData.about}
                disabled
                placeholder="Describe more about your pet..."
                onChange={handleChange}
                rows={4}
                className="textarea textarea-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
              />
            </div>
            {loadingBtCreate ? (
              <div className="flex justify-center items-center  mx-4 md:mx-10 my-5">
                <h1
                  className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] border border-[#FF5C00]  cursor-pointer hover:bg-[#FF5C00] hover:text-white"
                  onClick={handleAddImage}
                >
                  {ChangeLanguage ? "Create Pet" : "เพิ่มข้อมูลสัตว์เลี้ยง"}
                </h1>
              </div>
            ) : (
              <div className="flex justify-center items-center  mx-4 md:mx-10 my-5">
                <h1 className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] border border-[#FF5C00]   cursor-not-allowed">
                {ChangeLanguage ? "Loading . . ." : "กำลังโหลด . . ."}
                
                </h1>
              </div>
            )}
          </div>
        </div>
      )}

      {!popUpsaveStoreage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4">
          <div className="absolute bg-white bottom-0 shadow-xl w-full h-[80%] md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[300px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold text-green-500">
                {ChangeLanguage ? "Success" : "เสร็จสิ้น"}
              </h2>
              <Image
                src={CloseIcon || "/placeholder.svg"}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUpsaveStoreage(!popUpsaveStoreage)}
                width={20}
                height={20}
              />
            </div>
            {/* Line เส้นกั้น */}
            <div className="flex justify-center items-center mt-20 text-xl">
              {ChangeLanguage
                ? "Form data has been successfully saved."
                : "บันทึกข้อมูลแบบฟอร์มเรียบร้อย"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
