import React from "react";

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

  return (
    <div className="min-w-80 md:w-full">
      <div className=" ">
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
                <td className="px-4 py-3">{item.pet_name}</td>
                <td className="px-4 py-3">{item.breed}</td>
                <td className="px-4 py-3">
                  {new Date(item.create_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex justify-end gap-2 w-full">
                  <button className="h-8 w-8 border border-gray-200 rounded-md hover:bg-gray-50">
                    ✏️
                  </button>
                  <button className="h-8 w-8 border border-gray-200 rounded-md hover:bg-gray-50">
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
