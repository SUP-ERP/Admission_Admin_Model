"use client";

import { useState } from "react";

export interface PersonalDetailsData {
  firstName: string;
  middleName: string;
  lastName: string;
  studentName: string;
  motherName: string;
  personalEmail: string;
  mobileNumber: string;
  address: string;
  dateOfBirth: string;
  birthPlace: string;
  gender: string;
  aadharNumber: string;
  category: string;
  religion: string;
  nationality: string;
  domicile: string;
  familyIncome: string;
  ruralUrban: string;
  admissionSource: string;
  // Add additional fields here if needed (e.g., abcId) 
}

interface PersonalDetailsProps {
  onNext: (data: PersonalDetailsData) => void;
  onPrev?: () => void;
}

// Dropdown options arrays
const categories = ["General", "OBC", "SC", "ST", "EWS", "Other"];
const religions = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Zoroastrian",
  "Jewish",
  "Bahá'í",
  "Other",
];
const nationalities = ["Indian", "American", "British", "Canadian", "Australian", "Other"];
const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"
];
const ruralUrbanOptions = ["Rural", "Urban"];
const admissionSources = ["School", "Friends/Family", "Social Media", "Advertisement", "Other"];

export default function PersonalDetails({ onNext, onPrev }: PersonalDetailsProps) {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    firstName: "",
    middleName: "",
    lastName: "",
    studentName: "",
    motherName: "",
    personalEmail: "",
    mobileNumber: "",
    address: "",
    dateOfBirth: "",
    birthPlace: "",
    gender: "",
    aadharNumber: "",
    category: "",
    religion: "",
    nationality: "",
    domicile: "",
    familyIncome: "",
    ruralUrban: "",
    admissionSource: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check that all required fields have non-empty values.
  // Required fields: firstName, lastName, studentName, motherName, personalEmail,
  // mobileNumber, address, dateOfBirth, birthPlace, gender, aadharNumber, category,
  // religion, nationality, domicile, familyIncome, ruralUrban, admissionSource.
  const isFormValid = (): boolean => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.studentName.trim() !== "" &&
      formData.motherName.trim() !== "" &&
      formData.personalEmail.trim() !== "" &&
      formData.mobileNumber.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.dateOfBirth.trim() !== "" &&
      formData.birthPlace.trim() !== "" &&
      formData.gender.trim() !== "" &&
      formData.aadharNumber.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.religion.trim() !== "" &&
      formData.nationality.trim() !== "" &&
      formData.domicile.trim() !== "" &&
      formData.familyIncome.trim() !== "" &&
      formData.ruralUrban.trim() !== "" &&
      formData.admissionSource.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid()) {
      onNext(formData);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="flex-1">
      <h3 className="text-xl font-medium mb-4">Personal Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Fields */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
              Student Name (as per 10th Marksheet) *
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Personal Information */}
          <div>
            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
              Mother Name *
            </label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="personalEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Personal Email *
            </label>
            <input
              type="email"
              id="personalEmail"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Address Details */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Communication Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Birth Details */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">
              Birth Place *
            </label>
            <input
              type="text"
              id="birthPlace"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Selection Fields */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>

          {/* More Details */}
          <div>
            <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar Card No. *
            </label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* New Category Selection */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* New Religion Selection */}
          <div>
            <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">
              Religion *
            </label>
            <select
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Religion --</option>
              {religions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* New Nationality Selection */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality *
            </label>
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Nationality --</option>
              {nationalities.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* New Domicile Selection */}
          <div>
            <label htmlFor="domicile" className="block text-sm font-medium text-gray-700 mb-1">
              Domicile (State) *
            </label>
            <select
              id="domicile"
              name="domicile"
              value={formData.domicile}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select State --</option>
              {statesOfIndia.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* New Family Income Field */}
          <div>
            <label htmlFor="familyIncome" className="block text-sm font-medium text-gray-700 mb-1">
              Family Income *
            </label>
            <input
              type="text"
              id="familyIncome"
              name="familyIncome"
              value={formData.familyIncome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* New Rural/Urban Selection */}
          <div>
            <label htmlFor="ruralUrban" className="block text-sm font-medium text-gray-700 mb-1">
              Rural/Urban *
            </label>
            <select
              id="ruralUrban"
              name="ruralUrban"
              value={formData.ruralUrban}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select --</option>
              {ruralUrbanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* New Admission Source Selection */}
          <div>
            <label htmlFor="admissionSource" className="block text-sm font-medium text-gray-700 mb-1">
              How did you hear about the admission? *
            </label>
            <select
              id="admissionSource"
              name="admissionSource"
              value={formData.admissionSource}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select --</option>
              {admissionSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
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
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isFormValid()
                ? "bg-[#2e3653] text-white hover:bg-[#FC8939] cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
