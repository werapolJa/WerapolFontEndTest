import type React from "react";

interface Step3Props {
  formData: {
    about: string;
    disease: boolean;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  prevStep: () => void;
}

export default function Step3({
  formData,
  handleChange,
  prevStep,
}: Step3Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Pet profile submitted:", formData);
    alert("Pet profile created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <div className="flex flex-col w-[80%] gap-2">
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="textarea textarea-bordered focus-within:outline-none border-red-700 focus-within:border-orange-500 border px-2 py-2 w-full rounded-md"
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    id="disease"
                    name="disease"
                    checked={formData.disease}
                    onChange={handleChange}
                    className="checkbox bg-white"
                  />
                  <span className="label-text ml-2">
                    Does your pet have any drug allergies?
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Create New Pet Card */}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-12">
            <button
              className="px-6 py-2 rounded-full bg-[#FFF5F2] text-[#FF5C00] hover:bg-[#FFE8E0] transition-colors"
              onClick={prevStep}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
