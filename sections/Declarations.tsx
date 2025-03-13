"use client";
import { useState } from "react";

export interface DeclarationsData {
  agreed: boolean;
}

interface DeclarationsProps {
  onNext: (data: DeclarationsData) => void;
  onPrev?: () => void;
}

export default function Declarations({ onNext, onPrev }: DeclarationsProps) {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  // Handle form submission ensuring that the declaration is agreed to.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agreed) {
      onNext({ agreed });
    } else {
      alert("Please agree to the terms before proceeding.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <h3 className="text-xl font-medium mb-4">Declarations</h3>

      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-gray-700">
            Please read the following declarations carefully before proceeding.
          </p>
        </div>

        <div className="border border-gray-300 p-4 rounded-md bg-white shadow-sm">
          <p className="text-gray-700">
            I hereby declare that the information provided in this application form is true, correct,
            and complete to the best of my knowledge and belief. I understand that any false or misleading 
            information may result in the cancellation of my admission.
          </p>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="declaration"
              checked={agreed}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-[#FC8939] border-gray-300 rounded focus:ring-[#FC8939]"
            />
            <label htmlFor="declaration" className="ml-2 text-gray-700 text-sm">
              I have read and agree to the terms of the declaration.
            </label>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#FC8939] transition"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            disabled={!agreed}
            className={`px-4 py-2 rounded-md transition ${
              agreed
                ? "bg-[#FC8939] text-white hover:bg-[#e57830] cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit &amp; Proceed
          </button>
        </div>
      </div>
    </form>
  );
}
