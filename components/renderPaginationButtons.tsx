// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const lastPage = totalPages;

    // Always show prev button
    buttons.push(
      <button
        key="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
            onClick={() => onPageChange(i)}
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
            onClick={() => onPageChange(num)}
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
            onClick={() => onPageChange(lastPage)}
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
        onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
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

  return (
    <nav className="flex items-center gap-3 rounded-lg w-full justify-center">
      {renderPaginationButtons()}
    </nav>
  );
};

export default Pagination;
