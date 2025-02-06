import type React from "react";
import { useEffect, useState } from "react";
import CloseIcon from "@/public/assets/close-icon.svg";
import Image from "next/image";
import ImagePetDefauit from "@/public/assets/petimage.svg";
import axios from "axios";
import { useRouter } from "next/router";
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
}

export default function Step3({
  formData,
  handleChange,
  prevStep,
  resetFormData,
}: Step3Props) {
  useEffect(() => {
    if (formData.about !== "") {
      setErrorAbout("");
    }
  }, [formData.about]);
  const [errorAbout, setErrorAbout] = useState<string>("");
  const [popUp, setPopUp] = useState<boolean>(false);
  const router = useRouter();
  // console.log(formData);
  const handleChangeCheckPage = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    if (formData.about === "") {
      setErrorAbout("Please enter your pet about");
      isValid = false;
    }
    if (isValid) {
      setPopUp(!popUp);
      // console.log(isValid);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/pet`, formData);

      // Pass an empty event to resetFormData
      resetFormData({} as React.ChangeEvent<HTMLInputElement>);
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {" "}
      <form>
        <div className="bg-white ">
          <div className="flex items-center justify-center mb-12">
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
          </div>

          {/* Main content */}
          <div className="max-w-96 mx-auto">
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
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-12">
              <button
                className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                onClick={handleChangeCheckPage}
                className={`${
                  errorAbout
                    ? "px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] "
                }`}
              >
                Show Detail
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* popup detail */}
      {popUp && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4 overflow-y-auto ">
          <div className="bg-white  shadow-xl w-full h- md:h-auto md:w-[800px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold ">Pet Detail</h2>

              <Image
                src={CloseIcon}
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
            </div>
            {/* Name and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 md:mb-5">
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400  ">
                  Pet Name
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {formData.pet_name}
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  Pet Age
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {formData.age}
                </div>
              </div>
            </div>
            {/* Breed  and Sex*/}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5">
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  Breed
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {formData.breed}
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  Sex
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {formData.pet_sex === "M" ? "Male" : "Female"}
                </div>
              </div>
            </div>

            {/* pettype  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5 ">
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  Type
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  {Number(formData.pettype_id) === 1
                    ? "Dog"
                    : Number(formData.pettype_id) === 2
                    ? "Cat"
                    : "Bird"}
                </div>
              </div>
              <div className="">
                <h3 className="text-xl mb-2 mx-4 md:mx-10 text-gray-400">
                  Disease
                </h3>
                <div
                  className={`text-base  mb-2 mx-4 md:mx-10 ${
                    formData.disease ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formData.disease
                    ? "your pet not have any health problems"
                    : "Your pet has health problems"}
                </div>
              </div>
            </div>

            {/* textarea  */}
            <h1 className="mx-4 mb-2 md:mx-10">About</h1>
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
            <div className="flex justify-center items-center  mx-4 md:mx-10 my-5">
              <h1
                className={`${
                  errorAbout
                    ? "px-6 py-2 rounded-full  text-white cursor-not-allowed"
                    : "px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] "
                }`}
                onClick={handleSubmit}
              >
                Confime
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
