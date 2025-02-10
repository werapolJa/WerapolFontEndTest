import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
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
  disease: boolean | undefined;
};
interface DataTableProps {
  data: Pet[];
}

const Table: React.FC<DataTableProps> = ({ data }) => {
  // console.log(data);
  const { ChangeLanguage } = useLanguage();
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
  const [popUpDelete, setPopUpDelete] = useState<boolean>(false);
  // const [idDelete, setIdDelete] = useState<number>(0);
  const [idDEdit, setIdDEdit] = useState<number>(0);
  const [petDataEdit, setPetDataEdit] = useState<Pet[]>([]);
  const [petnameEdit, setPetnameEdit] = useState<string>("");
  const [petbreedEdit, setPetbreedEdit] = useState<string>("");
  const [petAboutEdit, setPetAboutEdit] = useState<string>("");
  const [petTypeEdit, setPetTypeEdit] = useState<number>(0);
  const [petageEdit, setPetAgeEdit] = useState<number>(0);
  const [petsSxEdit, setPetsexEdit] = useState<string>("");
  const [errorAge, setErrorAge] = useState<string>("");
  const [errorNameEn, setErrorNameEn] = useState<string>("");
  const [errorAgeEn, setErrorAgeEn] = useState<string>("");

  const [errorฺBreed, setErrorBreed] = useState<string>("");
  const [errorฺBreedEn, setErrorBreedEn] = useState<string>("");

  const [errorAbout, setErrorAbout] = useState<string>("");
  const [errorAboutEn, setErrorAboutEn] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [errorName, setErrorName] = useState<string>("");
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(true);
  const [loadingEditData, setLoadingEditData] = useState<boolean>(true);
  const [disease, setDisease] = useState<boolean>(true);
  const [imageCheckType, setImageCheckType] = useState<boolean>(true);
  const [imageDelete, setImageDelete] = useState<string>("");

  // console.log(imageDelete);

  useEffect(() => {
    if (idDEdit !== 0) {
      getDatePetById();
    }
  }, [idDEdit]);

  useEffect(() => {
    if (petnameEdit !== "" && petnameEdit.length < 20) {
      setErrorName("");
      setErrorNameEn("");
    }
    if (petageEdit !== 0) {
      setErrorAge("");
      setErrorAgeEn("");
    }

    if (petbreedEdit !== "" && petbreedEdit.length < 20) {
      setErrorBreed("");
      setErrorBreedEn("");
    }
    if (petAboutEdit !== "") {
      setErrorAbout("");
      setErrorAboutEn("");
    }
  }, [petnameEdit, petageEdit, petbreedEdit, petAboutEdit]);

  const getDatePetById = async () => {
    try {
      setLoadingEditData(false);
      const res = await axios.get(`/api/pet/${idDEdit}`);
      const dataEdit = res.data.data;
      // console.log(dataEdit);

      setPetDataEdit(dataEdit);
      setPetnameEdit(dataEdit[0].pet_name);
      setPetbreedEdit(dataEdit[0].breed);
      setPetAgeEdit(dataEdit[0].age);
      setPetAboutEdit(dataEdit[0].about);
      setPetTypeEdit(dataEdit[0].pettype_id);
      setPetsexEdit(dataEdit[0].pet_sex);
      setImage(dataEdit[0]?.image_pet);
      setDisease(dataEdit[0].disease);
      setLoadingEditData(true);
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
      const ageNumber = Number.parseInt(newAge, 10);

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
    const newPetType = Number.parseInt(event.target.value, 10); // Get the new pet type ID
    setPetTypeEdit(newPetType);
    setPetDataEdit((prevData) => {
      const updatedData = [...prevData]; // Copy the existing pet data
      updatedData[0] = { ...updatedData[0], pettype_id: newPetType }; // Update the pet type
      return updatedData; // Return the updated data
    });
  };
  const handlePeSexEditChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPetSex = event.target.value as "M" | "F"; // Type assertion here
    setPetsexEdit(newPetSex);
    setPetDataEdit((prevData) => {
      const updatedData = [...prevData];
      updatedData[0] = { ...updatedData[0], pet_sex: newPetSex };
      return updatedData;
    });
  };
  console.log(petnameEdit.length);

  const handleEditPet = async () => {
    let isValid = true;
    if (petnameEdit === "") {
      setErrorName("Please enter your pet name");
      setErrorNameEn("กรุณาใส่ชื่อสัตว์เลี้ยง");
      isValid = false;
    } else if (petnameEdit.length > 21) {
      setErrorName("Name should not exceed 20 words.");
      setErrorNameEn("ชื่อไม่ควรเกิน 20 คำ");
      isValid = false;
    }
    if (petageEdit === 0) {
      setErrorAge("Please enter your pet age");
      setErrorAgeEn("กรุณากรอกข้อมูลอายุ");
      isValid = false;
    } else if (petageEdit < 0) {
      setErrorAge("Age must be greater than 1 year.");
      setErrorAgeEn("อายุต้องมีค่ามากกว่า 1 ปี");
      isValid = false;
    } else if (petageEdit > 999) {
      setErrorAge("Years should be three digits max.");
      setErrorAgeEn("ตัวเลขอายุไม่ควรเกิน 3 หลัก");
      isValid = false;
    }
    if (petbreedEdit === "") {
      setErrorBreed("Please enter your pet breed");
      setErrorBreedEn("กรุณากรอกข้อมูลสายพันธ์");
      isValid = false;
    } else if (petbreedEdit.length > 21) {
      setErrorBreed("Text should not exceed 20 words.");
      setErrorBreedEn("ตัวอักษรไม่ควรเกิน 20 คำ");
      isValid = false;
    }
    if (petAboutEdit === "") {
      setErrorAbout("Please enter your pet about");
      setErrorAboutEn("กรุณาระบุสัตว์เลี้ยงของคุณเกี่ยวกับ");
      isValid = false;
    }
    if (isValid) {
      handleDeleteImage(image);

      if (!petDataEdit[0].image_pet) {
        alert("No image selected.");
        return;
      }
      try {
        setLoadingUpdate(false);
        const response = await fetch(petDataEdit[0].image_pet);
        const blob = await response.blob();
        const file = new File([blob], "pet_image.jpg", { type: blob.type });
        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        const uploadResponse = await axios.post(
          "/api/pet/uploadyoupet",
          uploadFormData
        );

        const updatedPet: Pet = {
          ...petDataEdit[0],
          pet_name: petnameEdit,
          pettype_id: petTypeEdit,
          breed: petbreedEdit,
          pet_sex: petsSxEdit as "M" | "F",
          age: petageEdit,
          about: petAboutEdit,
          image_pet: uploadResponse.data.urls[0],
          disease: disease,
        };

        await axios.put(`/api/pet/${idDEdit}`, updatedPet);
        setImage(uploadResponse.data.urls[0]);
        setPopUpEdit(false);
        setLoadingUpdate(true);
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

    // ตรวจสอบว่าไฟล์เป็นรูปภาพหรือไม่ (png, jpg, jpeg)
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setImageCheckType(false);
      // alert("Please upload a valid image (PNG, JPG, JPEG).");
      return; // ถ้าไม่ใช่ไฟล์รูปภาพ จะไม่ทำอะไรต่อ
    }

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

  const handleChangeDisease = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setDisease(checked); // อัปเดต state disease ด้วยค่าของ checkbox
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
    console.log(imageDelete);

    try {
      await axios.delete("/api/deletetableimage", {
        data: { url: imageDelete },
      });

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
                      setImageDelete(item?.image_pet);
                      // setIdDelete(item.pet_id);
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
          {ChangeLanguage ? "No Data" : " ไม่มีข้อมูล"}
        </div>
      )}

      {popUpEdit && (
        <div className="  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4 overflow-y-auto ">
          <div className="bg-white shadow-xl w-full h-full md:h-auto md:w-[800px] md:rounded-3xl overflow-y-auto max-h-[100%]">
            {loadingEditData ? (
              <div className="">
                <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
                  <div className="text-xl text-black font-bold">
                    {ChangeLanguage ? "Pet Detail" : "รายละเอียดสัตว์เลี้ยง"}
                  </div>

                  <Image
                    src={CloseIcon || "/placeholder.svg"}
                    alt="close button"
                    className="cursor-pointer"
                    onClick={() => {
                      setPopUpEdit(false);
                      getDatePetById(); // Fetch the data again when closing the popup
                    }}
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
                            src={petDataEdit[0]?.image_pet || ImagePetDefauit}
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
                    <div className="flex flex-col w-auto mx-5 ">
                      {errorName ? (
                        <span className="text-red-500 font-bold">
                          {ChangeLanguage ? `${errorName}` : `${errorNameEn}`}
                        </span>
                      ) : (
                        <span className="text-[#FF5C00]">
                          {ChangeLanguage ? `Pet Name` : `ขื่อสัตว์เลี้ยง`}
                        </span>
                      )}
                      <input
                        type="text"
                        id="pet_name"
                        name="pet_name"
                        value={petnameEdit || ""}
                        onChange={handlePetnameEditChange}
                        placeholder={`${
                          ChangeLanguage
                            ? "Enter your pet name"
                            : "ขื่อสัตว์เลี้ยง"
                        }`}
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
                      {errorAge ? (
                        <span className="text-red-500 font-bold">
                          {ChangeLanguage ? `${errorAge}` : `${errorAgeEn}`}
                        </span>
                      ) : (
                        <span className="text-[#FF5C00]">
                          {ChangeLanguage ? `Pet Age` : `อายุสัตว์เลี้ยง`}
                        </span>
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
                          errorAge
                            ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                            : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                        } `}
                      />
                    </div>
                  </div>
                </div>
                {/* Breed  and Sex*/}
                <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5 ">
                  <div className="flex flex-col w-auto mx-5 ">
                    <div className="">
                      {errorฺBreed ? (
                        <span className="text-red-500 font-bold">
                          {ChangeLanguage
                            ? `${errorฺBreed}`
                            : `${errorฺBreedEn}`}
                        </span>
                      ) : (
                        <span className="text-[#FF5C00]">
                          {ChangeLanguage ? `breed` : `สายพันธ์`}
                        </span>
                      )}
                      <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={petDataEdit[0]?.breed || ""}
                        onChange={handlebreedEditChange}
                        placeholder={`${
                          ChangeLanguage
                            ? "Enter your pet name"
                            : "ข้อมูลสายพันธ์"
                        }`}
                        required
                        className={`${
                          errorฺBreed
                            ? "input-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                            : "input-bordered focus-within:outline-none focus-within:border-orange-500 border py-2 w-full px-2  rounded-md"
                        } `}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="flex flex-col w-auto mx-5 ">
                      <span className="text-[#FF5C00]">
                        {ChangeLanguage ? `Type` : `ประเภท`}
                      </span>
                      <select
                        id="pettype_id"
                        name="pettype_id"
                        value={
                          petDataEdit.length > 0
                            ? petDataEdit[0].pettype_id
                            : ""
                        }
                        onChange={handlePetTypeEditChange}
                        required
                        disabled={petDataEdit.length === 0}
                        className={`
                      input-bordered focus-within:outline-none  focus-within:border-orange-500 border px-2 py-2 w-full rounded-md cursor-pointer`}
                      >
                        <option value="2">
                          {ChangeLanguage ? "Dog" : "หมา"}
                        </option>
                        <option value="3">
                          {ChangeLanguage ? "Cat" : "แมว"}
                        </option>
                        <option value="4">
                          {ChangeLanguage ? "Bird" : "นก"}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* pettype  */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:mb-5">
                  <div className="flex flex-col w-auto mx-5">
                    <span className="text-[#FF5C00]">
                      {ChangeLanguage ? `Sex` : `เพศ`}
                    </span>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="pet_sex"
                          value="M"
                          checked={petDataEdit[0]?.pet_sex === "M"}
                          onChange={handlePeSexEditChange}
                          disabled={petDataEdit.length === 0}
                          className="cursor-pointer"
                        />
                        {ChangeLanguage ? "Male" : "ชาย"}
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="pet_sex"
                          value="F"
                          checked={petDataEdit[0]?.pet_sex === "F"}
                          onChange={handlePeSexEditChange}
                          disabled={petDataEdit.length === 0}
                          className="cursor-pointer"
                        />
                        {ChangeLanguage ? "Female" : "หญิง"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer justify-start px-5 md:px-5 pb-5">
                    <input
                      type="checkbox"
                      id="disease"
                      name="disease"
                      checked={disease} // Directly use the boolean value here
                      onChange={handleChangeDisease}
                      className="checkbox bg-white"
                    />
                    <span className="label-text ml-2 text-sm md:text-base ">
                      {ChangeLanguage
                        ? "Does your pet not have any health problems?"
                        : "สัตว์เลี้ยงของคุณไม่มีปัญหาสุขภาพใดๆ"}
                    </span>
                  </label>
                </div>

                {/* textarea  */}
                {errorAbout ? (
                  <span className="text-red-500 font-bold mx-5">
                    {ChangeLanguage ? `${errorAbout}` : `${errorAboutEn}`}
                  </span>
                ) : (
                  <span className="text-[#FF5C00] mx-5">
                    {ChangeLanguage ? `About Describe` : `รายละเอียดเพิ่มเติม`}
                  </span>
                )}
                <div className="flex flex-col w-auto mx-4 gap-2 md:w-[95%]  md:mx-auto">
                  <textarea
                    id="about"
                    name="about"
                    value={petDataEdit[0]?.about || ""} // Ensure value is always a string
                    placeholder={`${
                      ChangeLanguage
                        ? "Describe more about your pet..."
                        : "อธิบายเพิ่มเติมเกี่ยวกับสัตว์เลี้ยงของคุณ.."
                    }`}
                    onChange={handlePetaboutEditChange}
                    rows={4}
                    className={`${
                      errorAbout
                        ? "textarea textarea-bordered focus-within:outline-none border-red-500  border px-2 py-2 w-full g- rounded-md"
                        : "textarea textarea-bordered focus-within:outline-none  focus-within:border-orange-500 border px-2 py-2 w-full g- rounded-md"
                    }`}
                  />
                </div>
                {errorName || errorAbout || errorAge || errorฺBreed ? (
                  <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 mt-5">
                    <h1
                      className={`px-3 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed`}
                    >
                      Confime Edit
                    </h1>
                  </div>
                ) : (
                  <>
                    {loadingUpdate ? (
                      <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 mt-5">
                        <h1
                          onClick={handleEditPet}
                          className={`cursor-pointer bg-[#FF5C00] text-white px-3 rounded-lg py-2`}
                        >
                          {ChangeLanguage ? " Confime Edit" : "ยืนยันการแก้ไข"}
                        </h1>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 mt-5">
                        <h1
                          className={`px-3 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed`}
                        >
                          {ChangeLanguage ? "Loading . . ." : "กำลังโหลด . . ."}
                        </h1>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="w-auto h-[800px] flex justify-center">
                <span className="loading loading-spinner loading-xl w-52"></span>
              </div>
            )}
          </div>
        </div>
      )}

      {popUpDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4">
          <div className="absolute bg-white bottom-0 shadow-xl w-full h-[80%] md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[300px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold">
                {ChangeLanguage ? "Pet Delete" : "ลบสัตว์เลี้ยง"}
              </h2>
              <Image
                src={CloseIcon || "/placeholder.svg"}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUpDelete(!popUpDelete)}
                width={20}
                height={20}
              />
            </div>
            {/* Line เส้นกั้น */}
            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 my-10">
              <h1>
                {ChangeLanguage
                  ? "Would you like to delete your pet information?"
                  : "คุณต้องการลบข้อมูลสัตว์เลี้ยงของคุณหรือไม่?"}
              </h1>
            </div>
            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 mt-10">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-red-600 "
                onClick={handleDelete}
                // onClick={}
              >
                {ChangeLanguage ? "confirm Delete" : "ยืนยันการลบ"}
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Table;
