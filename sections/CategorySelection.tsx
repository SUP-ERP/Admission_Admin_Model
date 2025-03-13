"use client";
import { useState } from "react";
import { CloudUploadIcon, CheckCircleIcon } from "@heroicons/react/outline";

interface CategorySelectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

export default function CategorySelection({ onNext, onPrev }: CategorySelectionProps) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Helper function to validate the form.
  // For "general", no certificate is required.
  // For all non-general, a certificate file must be provided.
  // For "obc" or "pwd", a subcategory selection is also required.
  const checkFormValid = (cat: string, subcat: string, file: File | null): boolean => {
    if (cat === "general") {
      return true;
    } else {
      if (!file) return false;
      if (cat === "obc" || cat === "pwd") {
        return subcat !== "";
      }
      return true;
    }
  };

  // Handle category changes and update form validity.
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategory("");
    setCertificateFile(null); // Reset file selection
    setIsFormValid(checkFormValid(selectedCategory, "", null));
  };

  // Handle updates to the subcategory selection and re-validate.
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSubcategory(value);
    setIsFormValid(checkFormValid(category, value, certificateFile));
  };

  // Process file upload and update form validity.
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCertificateFile(file);
      setIsFormValid(checkFormValid(category, subcategory, file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {/* Description Card */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
        <p className="text-gray-700">
          Selecting the correct category is essential for scholarships, fee structure, and seat allocation based on government policies.
        </p>
      </div>

      <div className="space-y-6 mt-6">
        {/* Category Selection */}
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Select Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="general">General</option>
            <option value="sc">Scheduled Caste (SC)</option>
            <option value="st">Scheduled Tribe (ST)</option>
            <option value="obc">Other Backward Class (OBC)</option>
            <option value="pwd">Person with Disability (PwD)</option>
            <option value="ews">Economically Weaker Section (EWS)</option>
          </select>
        </div>

        {/* Subcategory Selection (Only for OBC and PwD) */}
        {category && category !== "general" && (category === "obc" || category === "pwd") && (
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
              Select Sub-Category *
            </label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={handleSubcategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Sub-Category --</option>
              {category === "obc" && (
                <>
                  <option value="obc-ncl">OBC (Non-Creamy Layer)</option>
                  <option value="obc-cl">OBC (Creamy Layer)</option>
                </>
              )}
              {category === "pwd" && (
                <>
                  <option value="pwd-locomotor">Locomotor Disability</option>
                  <option value="pwd-visual">Visual Impairment</option>
                  <option value="pwd-hearing">Hearing Impairment</option>
                </>
              )}
            </select>
          </div>
        )}

        {/* Document Upload Requirement for non-General Categories */}
        {category && category !== "general" && (
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
            <p className="font-medium text-yellow-800">Important:</p>
            <p className="text-yellow-700">
              To proceed, you must upload a valid category certificate issued by a competent authority.
            </p>
          </div>
        )}

        {/* EWS Specific Instructions */}
        {category === "ews" && (
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
            <p className="font-medium text-blue-800">EWS Certificate Requirements:</p>
            <ul className="list-disc pl-5 mt-2 text-blue-700">
              <li>Family income should be below ₹8 lakhs per annum</li>
              <li>Certificate must be issued for the current financial year</li>
              <li>Must be issued by an authorized government official</li>
            </ul>
          </div>
        )}

        {/* Document Upload Section */}
        {category && category !== "general" && (
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <label htmlFor="certificateUpload" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Category Certificate *
            </label>
            <div className="mt-2 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-pointer">
              <input
                type="file"
                id="certificateUpload"
                onChange={handleFileUpload}
                className="hidden"
                accept=".png, .jpg, .pdf"
              />
              <label htmlFor="certificateUpload" className="flex items-center space-x-3 cursor-pointer">
                <CloudUploadIcon className="h-6 w-6 text-blue-500" />
                <span className="text-sm text-gray-700">
                  {certificateFile ? certificateFile.name : "Click to upload or drag & drop"}
                </span>
              </label>
              {certificateFile && <CheckCircleIcon className="h-6 w-6 text-green-500" />}
            </div>
          </div>
        )}

        {/* Proceed Button */}
        <button
          onClick={onNext}
          className={`w-full px-4 py-2 rounded-md text-white text-lg font-medium transition ${
            isFormValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Proceed to Next Step
        </button>
      </div>
    </div>
  );
}
