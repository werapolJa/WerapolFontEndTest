"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/table"; // Import Table
import Pagination from "@/components/renderPaginationButtons"; // Import Pagination
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLanguage } from "@/context/toggleLanguage"; // Import context

// Define the Pet interface
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

const App: React.FC = () => {
  const router = useRouter();
  const { ChangeLanguage, toggleLanguage } = useLanguage(); // Use context from LanguageContext
  const [pet, setPet] = useState<Pet[]>([]); // Use Pet[] type instead of any[]

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(pet.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = pet.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    DataPet();
  }, []);

  const DataPet = async () => {
    try {
      const res = await axios.get("/api/pet");
      setPet(res.data); // Ensure the response data matches the Pet type
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-w-80 mx-2 lg:max-w-6xl lg:mx-auto md:w-full">
      <h1 className="text-xl font-bold mt-28 flex items-center justify-center">
        {ChangeLanguage ? "Pet List" : "รายชิ่อสัตว์เลี้ยง"}
      </h1>
      <div className="min-w-80 mx-2 flex md:w-full justify-between py-4 items-center mt-8">
        <button
          className="btn btn-outline btn-info"
          onClick={() => {
            router.push("/createpet");
          }}
        >
          {ChangeLanguage ? "Create Pet" : "เพิ่มสัตว์เลี้ยง"}
        </button>
        <button
          className="btn btn-outline btn-secondary"
          onClick={toggleLanguage} // Call toggleLanguage from context
        >
          {ChangeLanguage ? "EN" : "TH"}
        </button>
      </div>
      {/* Table */}
      <Table data={currentData} />
      {/* Pagination */}
      {currentData.length !== 0 && (
        <div className="flex mt-10">
          <div className="flex-1 w-full md:mr-20 items-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
