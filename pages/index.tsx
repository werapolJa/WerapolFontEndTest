"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/table"; // นำเข้า Table
import Pagination from "@/components/renderPaginationButtons"; // นำเข้า Pagination
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLanguage } from "@/context/toggleLanguage"; // นำเข้า context

const App: React.FC = () => {
  const router = useRouter();
  const { ChangeLanguage, toggleLanguage } = useLanguage(); // ใช้ context จาก LanguageContext
  const [pet, setPet] = useState<any[]>([]);

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(pet.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = pet.slice(indexOfFirstRow, indexOfLastRow);
  console.log(currentData);

  useEffect(() => {
    DataPet();
  }, []);

  const DataPet = async () => {
    try {
      const res = await axios.get("/api/pet");
      setPet(res.data);
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
        Pet List
      </h1>
      <div className="min-w-80 mx-2 flex md:w-full justify-between py-4 items-center mt-8">
        <button
          className="btn btn-outline btn-info"
          onClick={() => {
            router.push("/createpet");
          }}
        >
          Create Pet
        </button>
        <button
          className="btn btn-outline btn-secondary"
          onClick={toggleLanguage} // เรียกใช้ toggleLanguage จาก context
        >
          Toggle Language {ChangeLanguage ? "EN" : "TH"}
        </button>
      </div>
      {/* table */}
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
