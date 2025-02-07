import React, { useEffect, useState } from "react";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
import axios from "axios";
type Pet = {
  pet_id: number;
  image: string;
  pettype_id: number;
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
  ChangeLanguage: boolean;
};

const App: React.FC = () => {
  const router = useRouter();
  const [pet, setPet] = useState<Pet[]>([]);
  // console.log(pet);

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(pet.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = pet.slice(indexOfFirstRow, indexOfLastRow);
  // console.log(currentData);
  useEffect(() => {
    DataPet();
  }, []);

  const DataPet = async () => {
    try {
      const res = await axios.get("/api/pet");
      const data = res.data;

      setPet(data);
      // console.log("resdata", data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderPaginationButtons = () => {
    const buttons = [];
    const lastPage = totalPages;

    // Always show prev button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className="p-2 hover:bg-white rounded-md transition-colors"
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={currentPage === 1 ? "text-gray-700" : "text-gray-400"}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    );

    if (lastPage <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= lastPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-full text-base font-bold transition-colors ${
              currentPage === i
                ? "bg-orange-100 text-orange-500"
                : "text-gray-300 hover:bg-white bg-white"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      let pageNumbers = [];

      if (currentPage <= 3) {
        pageNumbers = [1, 2, 3, 4];
      } else if (currentPage >= lastPage - 2) {
        pageNumbers = [lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
      } else {
        pageNumbers = [
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }

      pageNumbers.forEach((num) => {
        buttons.push(
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`w-10 h-10 rounded-full text-base font-bold transition-colors ${
              currentPage === num
                ? "bg-orange-100 text-orange-500"
                : "text-gray-300 hover:bg-white bg-white"
            }`}
          >
            {num}
          </button>
        );
      });

      if (currentPage < lastPage - 2) {
        buttons.push(
          <span key="ellipsis" className="text-gray-300 font-bold">
            ...
          </span>
        );
        buttons.push(
          <button
            key={lastPage}
            onClick={() => handlePageChange(lastPage)}
            className="w-10 h-10 rounded-full text-base font-bold transition-colors text-gray-300 hover:bg-white bg-white"
          >
            {lastPage}
          </button>
        );
      }
    }

    // Always show next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(lastPage, currentPage + 1))}
        className="p-2 hover:bg-white rounded-md transition-colors"
        disabled={currentPage === lastPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            currentPage === lastPage ? "text-gray-200" : "text-gray-300"
          }
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    );

    return buttons;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="min-w-80 mx-2  lg:max-w-6xl lg:mx-auto md:w-full">
      <div className="min-w-80 mx-2 flex md:w-full justify-between py-4 items-center mt-20">
        <h1 className="text-xl font-bold ">Pet List</h1>
        <button
          className="btn btn-outline btn-info"
          onClick={() => router.push("/createpet")}
        >
          Create Pet
        </button>
      </div>
      <Table data={currentData} />

      <div className="flex mt-10">
        <div className="flex-1 w-full md:mr-20  items-center">
          <nav className="flex items-center gap-3 rounded-lg w-full justify-center">
            {renderPaginationButtons()}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default App;
