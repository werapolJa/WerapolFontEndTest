import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "@/public/assets/close-icon.svg";
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
};
interface DataTableProps {
  data: Pet[];
}

const Table: React.FC<DataTableProps> = ({ data }) => {
  // console.log(data);
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
  const [popUpDelete, setPopUpDelete] = useState<boolean>(false);
  // console.log(popUpDelete);

  return (
    <div className="min-w-80 md:w-full">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-500">
              Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">
              Breed
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">
              Created
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-500">
              Actions
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
                  onClick={() => setPopUpEdit(!popUpEdit)}
                >
                  ✏️
                </button>
                <button
                  className="h-8 w-8 border border-gray-200 rounded-md hover:bg-gray-50"
                  onClick={() => setPopUpDelete(!popUpDelete)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popUpEdit && (
        <div className="  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4  ">
          <div className="bg-white  shadow-xl w-full h-full md:h-auto md:w-[800px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold ">Pet Detail</h2>
              <Image
                src={CloseIcon}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUpEdit(!popUpEdit)}
              />
            </div>
            {/* Line เส้นกั้น */}
            <hr className="mb-10" />
            {/* image  */}
            <div className="flex flex-col items-center gap-4 ">
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full bg-base-200 ring ring-[#FF5C00] ring-offset-base-100 ring-offset-2 "></div>
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
                  <input type="text" name="" id="" />
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  Pet Age
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  <input type="text" name="" id="" />
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
                  <input type="text" name="" id="" />
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  mb-2 mx-4 md:mx-10 text-gray-400">
                  Sex
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  <input type="text" name="" id="" />
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
                  <input type="text" name="" id="" />
                </div>
              </div>
              <div className="">
                <h3 className="text-xl mb-2 mx-4 md:mx-10 text-gray-400">
                  Disease
                </h3>
                <div className="text-base  mb-2 mx-4 md:mx-10">
                  <input type="text" />
                </div>
              </div>
            </div>

            {/* textarea  */}
            <h1 className="mx-4 mb-2 md:mx-10">About</h1>
            <div className="flex flex-col w-auto mx-4 gap-2 md:w-[90%]  md:mx-auto">
              <textarea
                id="about"
                name="about"
                // value={formData.about}
                disabled
                placeholder="Describe more about your pet..."
                // onChange={handleChange}
                rows={4}
                className="textarea textarea-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
              />
            </div>
            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 my-10">
              <h1>Confime</h1>
            </div>
          </div>
        </div>
      )}

      {popUpDelete && (
        <div className="  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4  ">
          <div className="bg-white  shadow-xl w-full h-full md:h-auto md:w-[800px] md:rounded-3xl">
            <div className="flex justify-between items-center py-6 mx-4 md:mx-10">
              <h2 className="text-2xl font-bold ">Pet Detail</h2>
              <Image
                src={CloseIcon}
                alt="close button"
                className="cursor-pointer"
                onClick={() => setPopUpDelete(!popUpDelete)}
              />
            </div>
            {/* Line เส้นกั้น */}

            <div className="flex justify-center items-center mb-6 mx-4 md:mx-10 my-10">
              <h1>Confime</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
