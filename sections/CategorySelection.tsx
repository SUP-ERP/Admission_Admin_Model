"use client";
import { useState, useEffect } from "react";
import { useFormData } from "../app/FormDataContext"; // Import global form state
import { CloudUploadIcon, CheckCircleIcon } from "@heroicons/react/outline";

interface CategorySelectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

export default function CategorySelection({ onNext, onPrev }: CategorySelectionProps) {
  const { formData, updateFormData } = useFormData(); // Get global state
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Load existing data from context if available
  useEffect(() => {
    if (formData.categorySelection?.category) {
      setCategory(formData.categorySelection.category);
      setSubcategory(formData.categorySelection.subcategory || "");
      setIsFormValid(checkFormValid(formData.categorySelection.category, formData.categorySelection.subcategory, null));
    }
  }, [formData.categorySelection]);

  // Helper function to validate the form
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

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategory(""); 
    setCertificateFile(null);
    setIsFormValid(checkFormValid(selectedCategory, "", null));
  };

  // Handle subcategory change
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubcategory(e.target.value);
    setIsFormValid(checkFormValid(category, e.target.value, certificateFile));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCertificateFile(file);
      setIsFormValid(checkFormValid(category, subcategory, file));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    updateFormData("categorySelection", { category, subcategory });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {/* Description */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
        <p className="text-gray-700">
          Selecting the correct category is essential for scholarships, fee structure, and seat allocation based on government policies.
        </p>
      </div>

      <div className="space-y-6 mt-6">
        {/* Category Selection */}
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category *
          </label>
          <select
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

        {/* Subcategory Selection */}
        {category && (category === "obc" || category === "pwd") && (
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Sub-Category *
            </label>
            <select
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

        {/* Document Upload Requirement */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {onPrev && (
            <button
              onClick={onPrev}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#FC8939]"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleSubmit}
            className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-md ${
              isFormValid? "bg-[#2e3653] text-white hover:bg-[#FC8939] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
            disabled={!isFormValid}
          >
            Proceed to Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
