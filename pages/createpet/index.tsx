"use client";

import { useState, useEffect } from "react";
import Step1 from "@/components/step1";
import Step2 from "@/components/step2";
import Step3 from "@/components/step3";

export default function CreatePet() {
  const [step, setStep] = useState(1);

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
      name: "",
      age: "",
      breed: "",
      imageUrl: "",
      pettype_id: 0,
      experience: "",
      pet_sex: "",
      color: "",
      weight: "",
      about: "",
      disease: false,
    };
  });

  useEffect(() => {
    // ตรวจสอบการเปลี่ยนแปลงของ formData และอัปเดต localStorage เฉพาะเมื่อมีการเปลี่ยนแปลงจริงๆ
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("formData");
      if (savedData && savedData !== JSON.stringify(formData)) {
        localStorage.setItem("formData", JSON.stringify(formData));
      }
    }
  }, [formData]); // จะอัปเดต localStorage เฉพาะเมื่อ formData เปลี่ยนแปลง

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
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev: FormData) => ({
        ...prev,
        imageUrl: url,
      }));
    }
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
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="bg-base-100 p-8 rounded-lg w-full mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Pet</h1>
        {renderStep()}
      </div>
    </div>
  );
}
