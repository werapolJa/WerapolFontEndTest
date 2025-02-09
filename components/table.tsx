import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "@/public/assets/close-icon.svg";
import axios from "axios";
import ImagePetDefauit from "@/public/assets/petimage.svg";
import { useLanguage } from "@/context/toggleLanguage";
type Pet = {
  pet_id: number;
  pettype_id: number;
  image: string;
  pet_name: string;
  experience: "0-2" | "3-5" | "5+";
  breed: string;
  pet_sex: "M" | "F";
  age: number;
  color: string;
  weight: number;
  about?: string;
  create_at: string;
  update_at: string;
  image_pet: string;
};
interface DataTableProps {
  data: Pet[];
}

const Table: React.FC<DataTableProps> = ({ data }) => {
  // console.log(data);
  const { ChangeLanguage } = useLanguage();
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
  const [popUpDelete, setPopUpDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [idDEdit, setIdDEdit] = useState<number>(0);
  const [petDataEdit, setPetDataEdit] = useState<Pet[]>([]);
  const [petnameEdit, setPetnameEdit] = useState<string>("");
  const [petbreedEdit, setPetbreedEdit] = useState<string>("");
  const [petAboutEdit, setPetAboutEdit] = useState<string>("");
  const [petTypeEdit, setPetTypeEdit] = useState<number>(0);
  const [petageEdit, setPetAgeEdit] = useState<number | null>(null);

  const [petsSxEdit, setPetsexEdit] = useState<string>("");

  const [image, setImage] = useState<string>("");
  const [errorName, setErrorName] = useState<string>("");
  const [errorNameEn, setErrorNameEn] = useState<string>("");
  const [errorAge, setErrorAge] = useState<string>("");
  const [errorAgeEn, setErrorAgeEn] = useState<string>("");
  const [errorType, setErrorType] = useState<string>("");
  const [errorSex, setErrorSex] = useState<string>("");

  console.log(image);
  // console.log(petageEdit);
  // console.log(petAboutEdit);
  // console.log(petTypeEdit);

  useEffect(() => {
    if (idDEdit !== 0) {
      getDatePetById();
    }
  }, [idDelete, idDEdit, popUpEdit]);

  const getDatePetById = async () => {
    try {
      const res = await axios.get(`/api/pet/${idDEdit}`);
      const dataEdit = res.data.data;
      console.log(dataEdit);

      setPetDataEdit(dataEdit);
      setPetnameEdit(dataEdit[0].pet_name);
      setPetbreedEdit(dataEdit[0].breed);
      setPetAgeEdit(dataEdit[0].age);
      setPetAboutEdit(dataEdit[0].about);
      setPetTypeEdit(dataEdit[0].pettype_id);
      setPetsexEdit(dataEdit[0].pet_sex);
      setImage(dataEdit[0]?.image_pet);
      setErrorName("");
      setErrorType("");
      setErrorSex("");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePetnameEditChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPetName = event.target.value;
    setPetnameEdit(newPetName);
    setPetDataEdit((prevData) => {
      const updatedData = [...prevData];
      updatedData[0] = { ...updatedData[0], pet_name: newPetName };
      return updatedData;
    });
  };
  const handlebreedEditChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBreed = event.target.value;
    setPetbreedEdit(newBreed);
    setPetDataEdit((prevData) => {
      const updatedData = [...prevData];
      updatedData[0] = { ...updatedData[0], breed: newBreed };
      return updatedData;
    });
  };
  const handleageEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = event.target.value;

    if (newAge === "") {
      setPetAgeEdit(0); // ใช้ 0 แทน null
      setPetDataEdit((prevData) => {
        const updatedData = [...prevData];
        updatedData[0] = { ...updatedData[0], age: 0 }; // ใช้ 0 แทน null
        return updatedData;
      });
    } else {
      const ageNumber = parseInt(newAge, 10);

      if (!isNaN(ageNumber)) {
        setPetAgeEdit(ageNumber);
        setPetDataEdit((prevData) => {
          const updatedData = [...prevData];
          updatedData[0] = { ...updatedData[0], age: ageNumber };
          return updatedData;
        });
      }
    }
  };
  const handlePetaboutEditChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAbout = event.target.value;
    setPetAboutEdit(newAbout);
    setPetDataEdit((prevData) => {
      const updatedData = [...prevData];
      updatedData[0] = { ...updatedData[0], about: newAbout };
      return updatedData;
    });
  };
  const handlePetTypeEditChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPetType = parseInt(event.target.value, 10); // Get the new pet type ID
    setPetTypeEdit(newPetType);
    setPetDataEdit((prevData) => {
      const updatedData = [...prevData]; // Copy the existing pet data
      updatedData[0] = { ...updatedData[0], pettype_id: newPetType }; // Update the pet type
      return updatedData; // Return the updated data
    });
  };
  const handlePeSexEditChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPetSex = event.target.value; // Get the string value "M" or "F"
    setPetsexEdit(newPetSex);
    // Ensure newPetSex is valid ("M" or "F")
    if (newPetSex === "M" || newPetSex === "F") {
      setPetDataEdit((prevData) => {
        const updatedData = [...prevData]; // Copy the existing pet data
        updatedData[0] = { ...updatedData[0], pet_sex: newPetSex }; // Update the pet sex
        return updatedData; // Return the updated data
      });
    }
  };

  const handleEditPet = async () => {
    let isValid = true;
    if (petnameEdit === "") {
      setErrorName("Please enter your pet name");
      setErrorNameEn("กรุณาใส่ชื่อสัตว์เลี้ยง");
      isValid = false;
    }
    if (petageEdit === 0) {
      setErrorAge("Please enter your pet age");
      setErrorAgeEn("กรุณากรอกข้อมูลอายุ");
      isValid = false;
    }
    // if (formData.pettype_id === 0) {
    //   setErrorType("Please select your pet type");
    //   setErrorTypeEn("กรุณาเลือกข้อมูลประเภท");
    //   isValid = false;
    // }
    // if (formData.pet_sex === "") {
    //   setErrorSex("Please select your pet sex");
    //   setErrorSexEn("กรุณาเลือกข้อมูลเพศ");

    //   isValid = false;
    // }
    if (isValid) {
      handleDeleteImage(image);
      if (!petDataEdit[0].image_pet) {
        alert("No image selected.");
        return;
      }
      try {
        const response = await fetch(petDataEdit[0].image_pet);
        const blob = await response.blob();
        const file = new File([blob], "pet_image.jpg", { type: blob.type });
        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        const uploadResponse = await axios.post(
          "/api/pet/uploadyoupet",
          uploadFormData
        );

        // console.log(uploadResponse.data.urls[0]);
        const data = {
          pet_name: petnameEdit,
          pettype_id: petTypeEdit,
          breed: petbreedEdit,
          pet_sex: petsSxEdit,
          age: petageEdit,
          about: petAboutEdit,
          image_pet: uploadResponse.data.urls[0],
        };
        await axios.put(`/api/pet/${idDEdit}`, data);
        setImage(uploadResponse.data.urls[0]);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  // console.log(petDataEdit);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPetDataEdit((prev) => [
        {
          ...prev[0],
          image_pet: reader.result as string, // Update the image preview
        },
      ]);
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteImage = async (url: string) => {
    console.log(url);

    try {
      await axios.delete("/api/pet/deleteimagestore", { data: { url } });
    } catch (err) {
      console.log("Error deleting image:", err);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`api/pet/${idDelete}`);
      setPopUpDelete(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-w-80 md:w-full">
      {data.length !== 0 ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                {ChangeLanguage ? "Name" : "ขื่อ"}
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                {ChangeLanguage ? "Breed" : "สายพันธ์"}
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                {ChangeLanguage ? "Created" : "วันที่สร้าง"}
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">
                {ChangeLanguage ? "edit/delete" : "แก้ไข/ลบ"}
              </th>
            </tr>
          </thead>
          <tbody className="min-w-80 md:w-full">
            {data.map((item) => (
              <tr
                key={item.pet_id}
                className="border-b border-gray-200 last:border-0 min-w-80 md:w-full "
              >
                <td className="px-4 py-3 w-64">{item.pet_name}</td>
                <td className="px-4 py-3">{item.breed}</td>
                <td className="px-4 py-3">
                  {new Date(item.create_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex justify-end gap-2 w-full">
                  <button
                    className="h-8 w-8 border border-gray-200 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      setPopUpEdit(!popUpEdit);
                      setIdDEdit(item.pet_id);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="h-8 w-8 border border-gray-200 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      setPopUpDelete(!popUpDelete);
                      setIdDelete(item.pet_id);
                    }}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full  h-[680px] flex justify-center items-center">
          ไม่มีข้อมูล
        </div>
      )}

      {popUpEdit && (
        <div className="  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4  ">
          <div className="bg-white  shadow-xl w-full h-full md:h-auto md:w-[800px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <div className="text-xl text-black font-bold">
                {ChangeLanguage ? "Pet Detail" : "รายละเอียดสัตว์เลี้ยง"}
              </div>

              <Image
                src={CloseIcon || "/placeholder.svg"}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUpEdit(!popUpEdit)}
              />
            </div>
            {/* Line เส้นกั้น */}
            <hr className="mb-10" />
            {/* image  */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full bg-base-200 ring ring-[#FF5C00] ring-offset-base-100 ring-offset-2 ">
                    {petDataEdit[0]?.image_pet ? (
                      <img
                        src={petDataEdit[0]?.image_pet || ImagePetDefauit} // ใช้ path ที่สัมพันธ์กับ public
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
            {/* Name and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 md:mb-5">
              <div className="">
                <div className="flex flex-col w-auto mx-5 gap-2">
                  {errorName ? (
                    <span className="text-red-500 font-bold">{errorName}</span>
                  ) : (
                    <span className="text-[#FF5C00]">Pet Name</span>
                  )}
                  <input
                    type="text"
                    id="pet_name"
                    name="pet_name"
                    value={petDataEdit[0]?.pet_name || ""}
                    onChange={handlePetnameEditChange}
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
              <div className="">
                <div className="flex flex-col w-auto mx-5 gap-2">
                  {errorAge ? (
                    <span className="text-red-500 font-bold">{errorAge}</span>
                  ) : (
                    <span className="text-[#FF5C00]">Age</span>
                  )}
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={petDataEdit[0]?.age || 0}
                    onChange={handleageEditChange}
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
            {/* Breed  and Sex*/}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5">
              <div className="flex flex-col w-auto mx-5 gap-2">
                <div className="">
                  {errorName ? (
                    <span className="text-red-500 font-bold">{errorName}</span>
                  ) : (
                    <span className="text-[#FF5C00]">breed</span>
                  )}
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={petDataEdit[0]?.breed || ""}
                    onChange={handlebreedEditChange}
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
              <div className="">
                <div className="flex flex-col w-auto mx-5 ">
                  {errorSex ? (
                    <span className="text-red-500 font-bold">{errorSex}</span>
                  ) : (
                    <span className="text-[#FF5C00]">Sex</span>
                  )}
                  <select
                    id="pet_sex"
                    name="pet_sex"
                    value={petDataEdit[0]?.pet_sex || "M"}
                    onChange={handlePeSexEditChange} // Update handler to use string values
                    required
                    disabled={petDataEdit.length === 0}
                    className="input-bordered focus-within:outline-none  focus-within:border-orange-500 border px-2 py-2 w-full rounded-md cursor-pointer"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* pettype  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5 ">
              <div className="flex flex-col w-auto mx-5 gap-2">
                {errorType ? (
                  <span className="text-red-500 font-bold">{errorType}</span>
                ) : (
                  <span className="text-[#FF5C00]">Type</span>
                )}
                <select
                  id="pettype_id"
                  name="pettype_id"
                  value={
                    petDataEdit.length > 0 ? petDataEdit[0].pettype_id : ""
                  }
                  onChange={handlePetTypeEditChange} // Handle the change if needed
                  required
                  disabled={petDataEdit.length === 0}
                  className={`
                      input-bordered focus-within:outline-none  focus-within:border-orange-500 border px-2 py-2 w-full rounded-md cursor-pointer`}
                >
                  <option value="2">Dog</option>
                  <option value="3">Cat</option>
                  <option value="4">Bird</option>
                </select>
              </div>
            </div>

            {/* textarea  */}
            <h1 className="mx-4 mb-2 md:mx-5">About</h1>
            <div className="flex flex-col w-auto mx-4 gap-2 md:w-[95%]  md:mx-auto">
              <textarea
                id="about"
                name="about"
                value={petDataEdit[0]?.about || ""} // Ensure value is always a string
                placeholder="Describe more about your pet..."
                onChange={handlePetaboutEditChange}
                rows={4}
                className="textarea textarea-bordered focus-within:outline-none  focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
              />
            </div>
            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 my-10">
              <h1
                onClick={handleEditPet}
                className="cursor-pointer bg-[#FF5C00] text-white px-3 rounded-lg py-2"
              >
                Confime Edit
              </h1>
            </div>
          </div>
        </div>
      )}

      {popUpDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4">
          <div className="absolute bg-white bottom-0 shadow-xl w-full h-[80%] md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[300px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold">Pet Delete</h2>
              <Image
                src={CloseIcon}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUpDelete(!popUpDelete)}
                width={20}
                height={20}
              />
            </div>
            {/* Line เส้นกั้น */}
            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 my-10">
              <h1>Would you like to delete your pet information?</h1>
            </div>
            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 mt-10">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-red-600 "
                onClick={handleDelete}
                // onClick={}
              >
                confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
