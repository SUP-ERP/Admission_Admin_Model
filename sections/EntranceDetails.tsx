"use client";
import { useState, useEffect } from "react";
import { useFormData } from "../app/FormDataContext";
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/solid"; // Import icons

export interface EntranceDetailsData {
  examType: string;
  rollNumber: string;
  yearOfExam: string;
  scoreType: string;
  score: string;
  rank: string;
  validityPeriod: string;
  document?: File | null;
}

interface EntranceDetailsProps {
  onNext: () => void;
  onPrev?: () => void;
}

export default function EntranceDetails({ onNext, onPrev }: EntranceDetailsProps) {
  const { formData, updateFormData } = useFormData();
  const [entranceDetails, setEntranceDetails] = useState<EntranceDetailsData>({
    examType: "",
    rollNumber: "",
    yearOfExam: new Date().getFullYear().toString(),
    scoreType: "percentile",
    score: "",
    rank: "",
    validityPeriod: "",
    document: null,
  });

  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (formData.entranceDetails) {
      setEntranceDetails({
        ...formData.entranceDetails,
        document: formData.entranceDetails.document || null,
      });
    }
  }, [formData.entranceDetails]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEntranceDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload with size validation (50 KB to 150 KB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Please upload a valid file (PDF, JPEG, PNG).");
        setEntranceDetails((prev) => ({ ...prev, document: null }));
        return;
      }

      const fileSizeKB = file.size / 1024; // Convert size to KB
      if (fileSizeKB < 50 || fileSizeKB > 150) {
        setFileError("File size should be between 50 KB and 150 KB.");
        setEntranceDetails((prev) => ({ ...prev, document: null }));
        return;
      }

      setFileError(null); // Reset error if valid
      setEntranceDetails((prev) => ({ ...prev, document: file }));
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setEntranceDetails((prev) => ({ ...prev, document: null }));
    setFileError(null);
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    return (
      entranceDetails?.examType?.trim() !== "" &&
      entranceDetails?.rollNumber?.trim() !== "" &&
      entranceDetails?.yearOfExam?.trim() !== "" &&
      entranceDetails?.scoreType?.trim() !== "" &&
      entranceDetails?.score?.trim() !== "" &&
      entranceDetails?.document !== null
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      updateFormData("entranceDetails", entranceDetails);
      onNext();
    } else {
      alert("Please fill in all mandatory fields and upload the required document.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <p className="text-sm text-gray-600 mb-6">
        Please upload the document in <strong>PNG, JPG, or PDF</strong> format with a size between{" "}
        <strong>50 KB to 150 KB</strong>.
      </p>

      <div className="space-y-6 mt-2">
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

        {/* Roll Number */}
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

        {/* Document Upload Section */}
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Scorecard (50 KB - 150 KB) *
          </label>
          <div className="mt-2 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-pointer">
            <input
              type="file"
              id="documentUpload"
              onChange={handleFileChange}
              className="hidden"
              accept=".png, .jpg, .pdf"
            />
            <label htmlFor="documentUpload" className="flex items-center space-x-3 cursor-pointer">
              <CloudUploadIcon className="h-6 w-6 text-blue-500" />
              <span className="text-sm text-gray-700">
                {entranceDetails.document
                  ? entranceDetails.document.name
                  : "Click to upload or drag & drop"}
              </span>
            </label>
            {entranceDetails.document && (
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 transition"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Show file size error if invalid */}
          {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
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
            isFormValid()
              ? "bg-[#2e3653] text-white hover:bg-[#FC8939] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </form>
  );
}
