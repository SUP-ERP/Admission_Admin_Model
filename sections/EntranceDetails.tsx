"use client";
import { useState } from "react";

export interface EntranceDetailsData {
  examType: string;
  rollNumber: string;
  yearOfExam: string;
  scoreType: string;
  score: string;
  rank: string;
  validityPeriod: string;
}

interface EntranceDetailsProps {
  onNext: (data: EntranceDetailsData) => void;
  onPrev?: () => void;
}

export default function EntranceDetails({ onNext, onPrev }: EntranceDetailsProps) {
  const [entranceDetails, setEntranceDetails] = useState<EntranceDetailsData>({
    examType: "",
    rollNumber: "",
    yearOfExam: new Date().getFullYear().toString(),
    scoreType: "percentile",
    score: "",
    rank: "",
    validityPeriod: "",
  });

  // Update state when input/select values change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEntranceDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if all required fields are filled
  const isFormValid = (): boolean => {
    return (
      entranceDetails.examType.trim() !== "" &&
      entranceDetails.rollNumber.trim() !== "" &&
      entranceDetails.yearOfExam.trim() !== "" &&
      entranceDetails.scoreType.trim() !== "" &&
      entranceDetails.score.trim() !== ""
    );
  };

  // On form submission, if valid, pass data to parent using onNext callback
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      onNext(entranceDetails);
    } else {
      alert("Please fill in all mandatory fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <h3 className="text-xl font-medium mb-4">Entrance Examination Details</h3>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <p>
            Please provide accurate information about your entrance examination.
            This information will be verified with the examination authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Entrance Examination Selection */}
          <div>
            <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-1">
              Entrance Examination *
            </label>
            <select
              id="examType"
              name="examType"
              value={entranceDetails.examType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Examination --</option>
              <option value="jee-main">JEE Main</option>
              <option value="jee-adv">JEE Advanced</option>
              <option value="neet">NEET</option>
              <option value="gate">GATE</option>
              <option value="cat">CAT</option>
              <option value="cet">State CET</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Roll Number / Registration Number */}
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number/Registration Number *
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={entranceDetails.rollNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Year of Examination */}
          <div>
            <label htmlFor="yearOfExam" className="block text-sm font-medium text-gray-700 mb-1">
              Year of Examination *
            </label>
            <input
              type="number"
              id="yearOfExam"
              name="yearOfExam"
              value={entranceDetails.yearOfExam}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Score Type */}
          <div>
            <label htmlFor="scoreType" className="block text-sm font-medium text-gray-700 mb-1">
              Score Type *
            </label>
            <select
              id="scoreType"
              name="scoreType"
              value={entranceDetails.scoreType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="percentile">Percentile</option>
              <option value="percentage">Percentage</option>
              <option value="marks">Marks</option>
              <option value="rank">Rank</option>
            </select>
          </div>

          {/* Score */}
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
              Score *
            </label>
            <input
              type="text"
              id="score"
              name="score"
              value={entranceDetails.score}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Rank (Optional) */}
          <div>
            <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">
              Rank (if applicable)
            </label>
            <input
              type="text"
              id="rank"
              name="rank"
              value={entranceDetails.rank}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Validity Period (Optional) */}
          <div>
            <label htmlFor="validityPeriod" className="block text-sm font-medium text-gray-700 mb-1">
              Validity Period (if applicable)
            </label>
            <input
              type="text"
              id="validityPeriod"
              name="validityPeriod"
              value={entranceDetails.validityPeriod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#FC8939] text-white px-4 py-2 rounded-md hover:bg-[#e57830] transition disabled:opacity-50"
            disabled={!isFormValid()}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </form>
  );
}
