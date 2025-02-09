"use client";
import { useLanguage } from "@/context/toggleLanguage";
import type React from "react";
import { useEffect, useState } from "react";

interface Step2Props {
  formData: {
    age: string;
    breed: string;
    pettype_id: number;
    pet_sex: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleLanguage: () => void;
}

export default function Step2({
  formData,
  handleChange,
  nextStep,
  prevStep,
}: Step2Props) {
  useEffect(() => {
    if (formData.age !== "") {
      setErrorAge("");
    }
    if (formData.breed !== "") {
      setErrorBreed("");
    }
    if (formData.pettype_id !== 0) {
      setErrorType("");
    }
    if (formData.pet_sex !== "") {
      setErrorSex("");
    }
  }, [formData.age, formData.breed, formData.pettype_id, formData.pet_sex]);
  const [errorAge, setErrorAge] = useState<string>("");
  const [errorAgeEn, setErrorAgeEn] = useState<string>("");
  const [errorBreed, setErrorBreed] = useState<string>("");
  const [errorBreedEn, setErrorBreedEn] = useState<string>("");
  const [errorType, setErrorType] = useState<string>("");
  const [errorTypeEn, setErrorTypeEn] = useState<string>("");
  const [errorSex, setErrorSex] = useState<string>("");
  const [errorSexEn, setErrorSexEn] = useState<string>("");
  const { ChangeLanguage, toggleLanguage } = useLanguage();
  // console.log(formData);
  const handleChangeCheckPage = () => {
    let isValid = true;
    if (formData.age === "") {
      setErrorAge("Please enter your pet age");
      setErrorAgeEn("กรุณากรอกข้อมูลอายุ");
      isValid = false;
    } else if (Number(formData.age) < 0) {
      setErrorAge("Age must be greater than 1 year.");
      setErrorAgeEn("อายุต้องมากกว่า 1 ปี");
      isValid = false;
    }
    if (formData.breed === "") {
      setErrorBreed("Please enter your pet breed");
      setErrorBreedEn("กรุณากรอกข้อมูลสายพันธ์");
      isValid = false;
    }
    if (formData.pettype_id === 0) {
      setErrorType("Please select your pet type");
      setErrorTypeEn("กรุณาเลือกข้อมูลประเภท");
      isValid = false;
    }
    if (formData.pet_sex === "") {
      setErrorSex("Please select your pet sex");
      setErrorSexEn("กรุณาเลือกข้อมูลเพศ");

      isValid = false;
    }
    if (isValid) {
      nextStep();
    }
  };
  return (
    <div className=" bg-white ">
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
      <div className="flex items-center justify-center">
        {ChangeLanguage ? (
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                  1
                </div>
                <span className="ml-2 text-black font-medium">Basic</span>
              </div>
              <div className="flex items-center">
                <div className="bg-[#FF5C00] text-white rounded-full w-8 h-8 flex items-center justify-center">
                  2
                </div>
                <span className="ml-2 text-[#FF5C00]">Additional</span>
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
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                  1
                </div>
                <span className="ml-2 text-black font-medium">พื้นฐาน</span>
              </div>
              <div className="flex items-center">
                <div className="bg-[#FF5C00] text-white rounded-full w-8 h-8 flex items-center justify-center">
                  2
                </div>
                <span className="ml-2 text-[#FF5C00]">ทั่วไป</span>
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
      </div>

      {/* Main content */}
      <div className="max-w-96 mx-auto">
        {/* Create New Pet Card */}
        {ChangeLanguage ? (
          <div className="grid grid-cols-1">
            <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors py-10">
              <div className="flex flex-col w-[80%] gap-2">
                {/* Breed */}
                {errorBreed ? (
                  <span className="text-red-500 font-bold">{errorBreed}</span>
                ) : (
                  <span className="text-[#FF5C00]">Breed</span>
                )}
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Breed of your pet"
                  required
                  className={`${
                    errorBreed
                      ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                      : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                  } `}
                />

                {/* inputAge */}
                {errorAge ? (
                  <span className="text-red-500 font-bold">{errorAge}</span>
                ) : (
                  <span className="text-[#FF5C00]">Age</span>
                )}
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age of your pet"
                  required
                  className={`${
                    errorAgeEn
                      ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                      : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                  } `}
                />
                {/* SelectTpye */}
                {errorType ? (
                  <span className="text-red-500 font-bold">{errorType}</span>
                ) : (
                  <span className="text-[#FF5C00]">Type</span>
                )}
                <select
                  id="pettype_id"
                  name="pettype_id"
                  value={formData.pettype_id || 0} // ให้ค่าของ select เป็น formData.pettype_id
                  onChange={handleChange}
                  required
                  className={`${
                    errorType
                      ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md cursor-pointer"
                      : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2 rounded-md cursor-pointer"
                  } ${formData.pettype_id === 0 && "text-gray-400"}`}
                >
                  <option value="0" disabled>
                    Select Type
                  </option>
                  <option value="2">Dog</option>
                  <option value="3">Cat</option>
                  <option value="4">Bird</option>
                </select>

                {/* SelectSex */}
                {errorSex ? (
                  <span className="text-red-500 font-bold">{errorSex}</span>
                ) : (
                  <span className="text-[#FF5C00]">Sex</span>
                )}
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pet_sex"
                      value="M"
                      checked={formData.pet_sex === "M"}
                      onChange={handleChange}
                      required
                      className={`cursor-pointer ${
                        errorType
                          ? "border-red-700"
                          : "focus-within:border-orange-500"
                      }`}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pet_sex"
                      value="F"
                      checked={formData.pet_sex === "F"}
                      onChange={handleChange}
                      required
                      className={`cursor-pointer ${
                        errorType
                          ? "border-red-700"
                          : "focus-within:border-orange-500"
                      }`}
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1">
            <div className="aspect-square bg-[#FFF5F2] rounded-xl flex flex-col items-center justify-center gap-4 transition-colors py-10">
              <div className="flex flex-col w-[80%] gap-2">
                {/* Breed */}
                {errorBreed ? (
                  <span className="text-red-500 font-bold">{errorBreedEn}</span>
                ) : (
                  <span className="text-[#FF5C00]">สายพันธุ์</span>
                )}
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="สายพันธุ์ของสัตว์"
                  required
                  className={`${
                    errorBreed
                      ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                      : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                  } `}
                />

                {/* inputAge */}
                {errorAge ? (
                  <span className="text-red-500 font-bold">{errorAgeEn}</span>
                ) : (
                  <span className="text-[#FF5C00]">อายุ</span>
                )}
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="อายุของ"
                  required
                  className={`${
                    errorAge
                      ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                      : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                  } `}
                />
                {/* SelectTpye */}
                {errorType ? (
                  <span className="text-red-500 font-bold">{errorTypeEn}</span>
                ) : (
                  <span className="text-[#FF5C00]">ประเภท</span>
                )}
                <select
                  id="pettype_id"
                  name="pettype_id"
                  value={formData.pettype_id || 0} // ให้ค่าของ select เป็น formData.pettype_id
                  onChange={handleChange}
                  required
                  className={`${
                    errorType
                      ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md cursor-pointer"
                      : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2 rounded-md cursor-pointer"
                  } ${formData.pettype_id === 0 && "text-gray-400"}`}
                >
                  <option value="0" disabled>
                    เลือกประเภท
                  </option>
                  <option value="2">หมา</option>
                  <option value="3">แมว</option>
                  <option value="4">นก</option>
                </select>

                {/* SelectSex */}
                {errorSexEn ? (
                  <span className="text-red-500 font-bold">{errorSexEn}</span>
                ) : (
                  <span className="text-[#FF5C00]">เพศ</span>
                )}
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pet_sex"
                      value="M"
                      checked={formData.pet_sex === "M"}
                      onChange={handleChange}
                      required
                      className={`cursor-pointer ${
                        errorType
                          ? "border-red-700"
                          : "focus-within:border-orange-500"
                      }`}
                    />
                    ชาย
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pet_sex"
                      value="F"
                      checked={formData.pet_sex === "F"}
                      onChange={handleChange}
                      required
                      className={`cursor-pointer ${
                        errorType
                          ? "border-red-700"
                          : "focus-within:border-orange-500"
                      }`}
                    />
                    หญิง
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Navigation buttons */}
        {ChangeLanguage ? (
          <div className="flex justify-between mt-12">
            <button
              className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
              onClick={prevStep}
            >
              Back
            </button>
            <button
              className={`${
                errorAge || errorBreed || errorSex || errorType
                  ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
              }`}
              onClick={handleChangeCheckPage}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex justify-between mt-12">
            <button
              className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
              onClick={prevStep}
            >
              กลับ
            </button>
            <button
              className={`${
                errorAge || errorBreed || errorSex || errorType
                  ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] "
              }`}
              onClick={handleChangeCheckPage}
            >
              ถัดไป
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
