import React from "react";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
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
};
const mockData: Pet[] = [
  {
    pet_id: 1,
    image: "string",
    pettype_id: 1,
    pet_name: "Buddy",
    experience: "3-5",
    breed: "Golden Retriever",
    pet_sex: "M",
    age: 3,
    color: "Golden",
    weight: 30,
    about: "Friendly and energetic",
    create_at: "2024-02-05T12:00:00Z",
    update_at: "2024-02-05T12:00:00Z",
  },
  {
    pet_id: 2,
    image: "string",
    pettype_id: 2,
    pet_name: "Luna",
    experience: "0-2",
    breed: "Siamese Cat",
    pet_sex: "F",
    age: 2,
    color: "Cream",
    weight: 5,
    about: "Curious and playful",
    create_at: "2024-01-20T10:30:00Z",
    update_at: "2024-01-20T10:30:00Z",
  },
];

const App: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-w-80 mx-2  lg:max-w-6xl lg:mx-auto md:w-full">
      <div className="min-w-80 mx-2 flex md:w-full justify-between py-4 items-center mt-20">
        <h1 className="text-xl font-bold ">Pet List</h1>
        <button
          className="btn btn-outline btn-info"
          onClick={() => router.push("/createpet")}
        >
          {" "}
          Create Pet
        </button>
      </div>
      <Table data={mockData} />
    </div>
  );
};

export default App;
