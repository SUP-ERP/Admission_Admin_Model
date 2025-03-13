"use client";

import { useState } from "react";

interface Program {
  id: string;
  name: string;
}

interface ProgramSelectionProps {
  onNext: (data: { selectedDepartment: string; preferences: Program[] }) => void;
  onPrev?: () => void;
}

export default function ProgramSelection({ onNext, onPrev }: ProgramSelectionProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [preferences, setPreferences] = useState<Program[]>([]);

  // Example departments
  const departments = [
    { id: "eng", name: "Engineering" },
    { id: "sci", name: "Sciences" },
    { id: "hum", name: "Humanities" },
    { id: "com", name: "Commerce" },
    { id: "med", name: "Medical Sciences" },
  ];  

  // Example programs mapped by department
  const programs: { [key: string]: Program[] } = {
    eng: [
      { id: "cs", name: "Computer Science" },
      { id: "me", name: "Mechanical Engineering" },
      { id: "ee", name: "Electrical Engineering" },
      { id: "ce", name: "Civil Engineering" },
    ],
    sci: [
      { id: "phy", name: "Physics" },
      { id: "chem", name: "Chemistry" },
      { id: "bio", name: "Biology" },
      { id: "math", name: "Mathematics" },
    ],
    hum: [
      { id: "eng", name: "English Literature" },
      { id: "hist", name: "History" },
      { id: "pol", name: "Political Science" },
      { id: "soc", name: "Sociology" },
    ],
    com: [
      { id: "acc", name: "Accounting" },
      { id: "fin", name: "Finance" },
      { id: "mkt", name: "Marketing" },
      { id: "bm", name: "Business Management" },
    ],
    med: [
      { id: "mbbs", name: "MBBS" },
      { id: "dent", name: "Dental Sciences" },
      { id: "pharm", name: "Pharmacy" },
      { id: "nurs", name: "Nursing" },
    ],
  };

  // When the department changes, reset both the selected program and current preferences
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deptId = e.target.value;
    setSelectedDepartment(deptId);
    setSelectedProgram("");
    setPreferences([]);
  };

  // Handle program selection: add to preferences
  const handleAddPreference = () => {
    if (!selectedProgram) return;

    const programObj = programs[selectedDepartment as keyof typeof programs].find(
      (p) => p.id === selectedProgram
    );
    if (!programObj) return;

    if (preferences.length >= 8) {
      alert("You can only select up to 8 preferences.");
      return;
    }

    if (preferences.some((p) => p.id === selectedProgram)) {
      alert("This program is already selected.");
      return;
    }

    setPreferences([...preferences, programObj]);
    setSelectedProgram(""); // Reset selection after adding
  };

  // Remove a selected preference
  const handleRemovePreference = (id: string) => {
    setPreferences(preferences.filter((p) => p.id !== id));
  };

  // Validation: Department must be selected and at least one preference must be added
  const isValid = selectedDepartment !== "" && preferences.length > 0;

  // Handle Next button click
  const handleNext = () => {
    if (isValid) {
      onNext({ selectedDepartment, preferences });
    }
  };

  return (
    <div className="flex-1">
      <h3 className="text-xl font-medium mb-4">Program Selection</h3>
      
      <div className="space-y-6">
        {/* Department Selection */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Select Department *
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Program Selection */}
        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
            Select Program *
          </label>
          <select
            id="program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={!selectedDepartment}
            required
          >
            <option value="">-- Select Program --</option>
            {selectedDepartment &&
              programs[selectedDepartment as keyof typeof programs].map((prog) => (
                <option key={prog.id} value={prog.id}>
                  {prog.name}
                </option>
              ))}
          </select>
        </div>

        {/* Add Preference Button */}
        <button
          type="button"
          onClick={handleAddPreference}
          className="px-4 py-2 bg-blue-500 text-black rounded-md disabled:opacity-50"
          disabled={!selectedProgram}
        >
          Add Preference
        </button>

        {/* Selected Preferences */}
        {preferences.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h4 className="font-medium mb-2">Selected Preferences (Max 8)</h4>
            <ul className="space-y-2">
              {preferences.map((pref, index) => (
                <li key={pref.id} className="flex items-center justify-between bg-white p-2 rounded-md shadow">
                  <span>
                    {index + 1}. {pref.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePreference(pref.id)}
                    className="ml-2 text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 pt-4 border-t">
        {onPrev && (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#FC8939]"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isValid
              ? "bg-[#2e3653] text-white hover:bg-[#FC8939] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
