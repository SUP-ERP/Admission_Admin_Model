"use client";
import { useState, useEffect } from "react";
import { useFormData } from "../app/FormDataContext"; // Import global form state
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/outline";

export interface UploadDocumentsData {
  matricMarksheet: File | null;
  seniorMarksheet: File | null;
  entranceScorecard: File | null;
  transferCertificate: File | null;
}

interface UploadDocumentsProps {
  onNext: () => void;
  onPrev?: () => void;
}

export default function UploadDocuments({ onNext, onPrev }: UploadDocumentsProps) {
  const { formData, updateFormData } = useFormData(); // Get global state

  const [documents, setDocuments] = useState<UploadDocumentsData>({
    matricMarksheet: null,
    seniorMarksheet: null,
    entranceScorecard: null,
    transferCertificate: null,
  });

  // Load existing data from context if available
  useEffect(() => {
    if (formData.uploadDocuments) {
      setDocuments(formData.uploadDocuments);
    }
  }, [formData.uploadDocuments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: keyof UploadDocumentsData) => {
    if (e.target.files && e.target.files[0]) {
      console.log(`File uploaded for ${docType}:`, e.target.files[0]);
      setDocuments((prev) => ({
        ...prev,
        [docType]: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const removeFile = (docType: keyof UploadDocumentsData) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: null,
    }));
  };

  const renderFileInput = (label: string, docType: keyof UploadDocumentsData) => (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 mt-2">
      <label className="block text-sm font-medium text-gray-700">{label} *</label>
      <div className="mt-2 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-pointer">
        <input
          type="file"
          id={docType}
          onChange={(e) => handleFileChange(e, docType)}
          className="hidden"
          accept=".png, .jpg, .pdf"
        />
        <label htmlFor={docType} className="flex items-center space-x-3 cursor-pointer">
          <CloudUploadIcon className="h-6 w-6 text-blue-500" />
          <span className="text-sm text-gray-700">
            {documents[docType] ? documents[docType]?.name : "Click to upload or drag & drop"}
          </span>
        </label>
        {documents[docType] && (
          <button
            type="button"
            onClick={() => removeFile(docType)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );

  // Validation: All required documents must be uploaded.
  const isFormValid = (): boolean => {
    return (
      documents.matricMarksheet !== null &&
      documents.seniorMarksheet !== null &&
      documents.entranceScorecard !== null &&
      documents.transferCertificate !== null
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      updateFormData("uploadDocuments", documents); // Save data to context
      onNext();
    } else {
      alert("Please upload all required documents.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto ">
      <p className="text-sm text-gray-600 mb-6">
        Please upload the following documents in <strong>PNG, JPG, or PDF</strong> format (Max size: <strong>300 KB</strong> each).
      </p>

      <div className="space-y-6 mt-2" >
        {renderFileInput("10th (Matric) Marksheet/DMC", "matricMarksheet")}
        {renderFileInput("12th (Senior Secondary) Marksheet/DMC", "seniorMarksheet")}
        {renderFileInput("Entrance Exam Scorecard/Marksheet", "entranceScorecard")}
        {renderFileInput("Transfer Certificate (T.C.)", "transferCertificate")}
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
            : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
    </form>
  );
}
