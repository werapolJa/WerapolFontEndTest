"use client";

import { useState } from "react";
import Step1 from "@/components/step1";
import Step2 from "@/components/step2";
import Step3 from "@/components/step3";
import { useLanguage } from "@/context/toggleLanguage";

export default function CreatePet() {
  const [step, setStep] = useState(1);
  const { ChangeLanguage, toggleLanguage } = useLanguage();
  // ดึงค่าจาก localStorage เมื่อเริ่มต้น (ถ้ามี)
  console.log(ChangeLanguage);

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
  const getDataSize = (data: any) => {
    return new TextEncoder().encode(JSON.stringify(data)).length; // คำนวณขนาดข้อมูลที่จะแปลงเป็นสตริง
  };
  const saveToLocalStorage = () => {
    if (typeof window !== "undefined") {
      const dataSize = getDataSize(formData);
      const maxSize = 5 * 1024 * 1024; // ขีดจำกัดของ localStorage (5MB)

      if (dataSize > maxSize) {
        console.error("Data size exceeds localStorage quota");
        alert("ข้อมูลเกินขีดจำกัดที่กำหนดใน Local Storage");

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
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev: any) => ({
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
        Create Pet test Vercel
      </h1>
      {renderStep()}
    </div>
  );
}
