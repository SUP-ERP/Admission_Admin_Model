"use client";
import { useState, useEffect } from "react";
import { useFormData } from "../app/FormDataContext"; // Import form context

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
  onNext: () => void;
  onPrev?: () => void;
}

export default function EntranceDetails({ onNext, onPrev }: EntranceDetailsProps) {
  const { formData, updateFormData } = useFormData(); // Get global state
  const [entranceDetails, setEntranceDetails] = useState<EntranceDetailsData>({
    examType: "",
    rollNumber: "",
    yearOfExam: new Date().getFullYear().toString(),
    scoreType: "percentile",
    score: "",
    rank: "",
    validityPeriod: "",
  });

  // Load existing data from context if available
  useEffect(() => {
    if (formData.entranceDetails) {
      setEntranceDetails({
        examType: formData.entranceDetails.examType || "",
        rollNumber: formData.entranceDetails.rollNumber || "",
        yearOfExam: formData.entranceDetails.yearOfExam || new Date().getFullYear().toString(),
        scoreType: formData.entranceDetails.scoreType || "percentile",
        score: formData.entranceDetails.score || "",
        rank: formData.entranceDetails.rank || "",
        validityPeriod: formData.entranceDetails.validityPeriod || "",
      });
    }
  }, [formData.entranceDetails]);
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
      entranceDetails.examType?.trim() !== "" &&
      entranceDetails.rollNumber?.trim() !== "" &&
      entranceDetails.yearOfExam?.trim() !== "" &&
      entranceDetails.scoreType?.trim() !== "" &&
      entranceDetails.score?.trim() !== ""
    );
  };

  // On form submission, if valid, save to context and go to next step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      updateFormData("entranceDetails", entranceDetails); // Save to context
      onNext();
    } else {
      alert("Please fill in all mandatory fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entrance Examination *
            </label>
            <select
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number/Registration Number *
            </label>
            <input
              type="text"
              name="rollNumber"
              value={entranceDetails.rollNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Year of Examination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year of Examination *
            </label>
            <input
              type="number"
              name="yearOfExam"
              value={entranceDetails.yearOfExam}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Score Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score Type *
            </label>
            <select
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score *
            </label>
            <input
              type="text"
              name="score"
              value={entranceDetails.score}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Rank (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rank (if applicable)
            </label>
            <input
              type="text"
              name="rank"
              value={entranceDetails.rank}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Validity Period (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validity Period (if applicable)
            </label>
            <input
              type="text"
              name="validityPeriod"
              value={entranceDetails.validityPeriod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#FC8939]"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`px-4 py-2 text-white rounded-md ${
              isFormValid() ? "bg-[#2e3653] text-white hover:bg-[#FC8939] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </form>
  );
}
