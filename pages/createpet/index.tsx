"use client";

import { useState } from "react";
import Step1 from "@/components/step1";
import Step2 from "@/components/step2";
import Step3 from "@/components/step3";
import { useLanguage } from "@/context/toggleLanguage";
import Image from "next/image";
import CloseIcon from "@/public/assets/close-icon.svg";

interface FormData {
  pet_name: string;
  pet_sex: string;
  age: number;
  breed: string;
  image_pet?: string; // Optional field
  disease?: boolean; // Optional field
  [key: string]: string | number | boolean | undefined; // Allow string, number, boolean, or undefined for other fields
}

export default function CreatePet() {
  const [step, setStep] = useState(1);
  const { ChangeLanguage, toggleLanguage } = useLanguage();
  const [imageCheckType, setImageCheckType] = useState<boolean>(true);
  const [popUpImageOverLoad, setPopUpImageOverLoad] = useState<boolean>(true);

  // ดึงค่าจาก localStorage เมื่อเริ่มต้น (ถ้ามี)
  console.log(imageCheckType);

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error("Error parsing formData from localStorage", error);
        }
      }
    }

    return {
      pet_name: "",
      age: "",
      breed: "",
      image_pet: "",
      pettype_id: 0,
      experience: "",
      pet_sex: "",
      color: "",
      weight: "",
      about: "",
      disease: false,
      ChangeLanguage: true,
    };
  });

  // ฟังก์ชันบันทึกข้อมูลเข้า localStorage (เรียกใช้ตอนกด Save)
  const getDataSize = (data: object) => {
    return new TextEncoder().encode(JSON.stringify(data)).length; // Calculate the size of the data after converting it to a string
  };

  const saveToLocalStorage = () => {
    if (typeof window !== "undefined") {
      const dataSize = getDataSize(formData);
      const maxSize = 5 * 1024 * 1024; // ขีดจำกัดของ localStorage (5MB)

      if (dataSize > maxSize) {
        console.error("Data size exceeds localStorage quota");
        setPopUpImageOverLoad(false);

        // ลองบีบอัดข้อมูลหรือเก็บแค่ข้อมูลที่จำเป็น
        // ตัวอย่าง: ลบข้อมูลที่ไม่จำเป็น เช่น ภาพ หรือข้อมูลขนาดใหญ่
        const reducedData = { ...formData, image_pet: "" }; // ลบข้อมูลภาพก่อนบันทึก
        localStorage.setItem("formData", JSON.stringify(reducedData));
        return;
      }
      try {
        localStorage.setItem("formData", JSON.stringify(formData));
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "QuotaExceededError"
        ) {
          console.error(
            "QuotaExceededError: Failed to save data to localStorage"
          );
          alert(
            "ไม่สามารถบันทึกข้อมูลได้ เนื่องจากพื้นที่ใน Local Storage เต็ม"
          );
        }
      }
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev: FormData) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!file) {
      return;
    }
    if (!validImageTypes.includes(file.type)) {
      setImageCheckType(false);
      // alert("Please upload a valid image (PNG, JPG, JPEG).");
      return; // ถ้าไม่ใช่ไฟล์รูปภาพ จะไม่ทำอะไรต่อ
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev: FormData) => ({
          ...prev,
          image_pet: base64String,
        }));
      };
    }
  };

  const resetFormData = () => {
    setFormData({
      pet_name: "",
      age: "",
      breed: "",
      image_pet: "",
      pettype_id: 0,
      experience: "",
      pet_sex: "",
      color: "",
      weight: "",
      about: "",
      disease: false,
    });

    localStorage.removeItem("formData");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            handleImageUpload={handleImageUpload}
            toggleLanguage={toggleLanguage} // ใช้ toggleLanguage จาก context
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            toggleLanguage={toggleLanguage} // ใช้ toggleLanguage จาก context
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            resetFormData={resetFormData}
            saveToLocalStorage={saveToLocalStorage} // เพิ่มปุ่มบันทึก
            toggleLanguage={toggleLanguage} // ใช้ toggleLanguage จาก context
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-base-100 p-8 rounded-lg w-full mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {ChangeLanguage ? "Create Pet" : "เพิ่มข้อมูลสัตว์เลี้ยง"}
      </h1>
      {renderStep()}
      {!imageCheckType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4">
          <div className="absolute bg-white bottom-0 shadow-xl w-full h-[80%] md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[300px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold text-red-500">
                {ChangeLanguage ? "warning" : "คำเตือน"}
              </h2>
              <Image
                src={CloseIcon || "/placeholder.svg"}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setImageCheckType(!imageCheckType)}
                width={20}
                height={20}
              />
            </div>
            {/* Line เส้นกั้น */}
            <div className="flex justify-center items-center mt-20 text-xl">
              {ChangeLanguage
                ? "Please select a valid image file (JPG, PNG)."
                : "ไฟล์รูปภาพที่ถูกต้อง (เช่น JPG, PNG)."}
            </div>
          </div>
        </div>
      )}
      {!popUpImageOverLoad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4">
          <div className="absolute bg-white bottom-0 shadow-xl w-full h-[80%] md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[300px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold text-red-500">
                {ChangeLanguage ? "warning" : "คำเตือน"}
              </h2>
            </div>
            {/* Line เส้นกั้น */}
            <div className="flex justify-center items-center mt-10 text-xl">
              {ChangeLanguage
                ? "The image is too large to be stored."
                : "รูปมีขนาดใหญ่เกินไป ไม่สามารถจัดเก็บได้"}
            </div>
            <div className="flex items-center justify-center mt-10">
              <button
                onClick={() => setPopUpImageOverLoad(!popUpImageOverLoad)}
                className="px-10 py-2 bg-red-500 rounded-lg text-white"
              >
                {ChangeLanguage ? "confirm" : "ยืนยัน"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
