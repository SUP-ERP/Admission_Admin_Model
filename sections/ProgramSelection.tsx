import { useState, useEffect } from "react";
import { useFormData } from "../app/FormDataContext";

interface Program {
  id: string;
  name: string;
}

interface ProgramSelectionProps {
  onNext: (data: { selectedInstitute: string; preferences: Program[] }) => void;
  onPrev?: () => void;
}

export default function ProgramSelection({ onNext, onPrev }: ProgramSelectionProps) {
  const [selectedInstitute, setSelectedInstitute] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [preferences, setPreferences] = useState<Program[]>([]);
  const { formData, updateFormData } = useFormData();
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");

  // Map faculty to respective institutes
  const institutes: { [key: string]: string[] } = {
    "Engineering & Technology": [
      "Jawaharlal Nehru Engineering College (JNEC)",
      "University Department of Information and Communication Technology (UDICT)",
      "School of Engineering and Technology (SOET)",
    ],
    "Management & Commerce": [
      "Institute of Management & Research",
      "Nath School of Business & Technology",
    ],
    "Basic & Applied Science": [
      "School of Basic & Applied Science",
      "Institute of Bioscience and Technology",
    ],
    "Social Science & Humanities": [
      "Institute of Social Sciences",
      "College of Journalism & Mass Communication",
      "Department of Education",
    ],
    "Design": ["Leonardo Da Vinci School of Design"],
    "Performing Arts": [
      "University Department of Music & Theatre",
      "MAHAGAMI GURUKUL Center for Performing Arts",
      "School of Film Arts",
      "Department of Photography",
    ],
    "Interdisciplinary Studies": [
      "Department of Sports, Physical Education & Yog Science",
      "Institute of Indian & Foreign Languages",
    ],
  };

  // Programs mapped to their respective institutes
  const programs: { [key: string]: Program[] } = {
    "Jawaharlal Nehru Engineering College (JNEC)": [
      { id: "chem", name: "B Tech Chemical Engineering" },
      { id: "civil", name: "B Tech Civil Engineering" },
      { id: "cse", name: "B Tech Computer Science and Engineering" },
      { id: "ece", name: "B Tech Electrical and computer Engineering" },
      { id: "mech", name: "B Tech Mechanical Engineering" },
      { id: "robotics", name: "B Tech Robotics and Artificial Intelligence" },
      { id: "mech_additive", name: "B Tech Mechanical and Mechatronics Engineering (Additive Manufacturing)" },
      { id: "arch", name: "Bachelor of Architecture" },
      { id: "ece_ai", name: "B Tech Electronics and Computer Engineering" },
      { id: "ai_ds", name: "B Tech Artificial Intelligence & Data Science" },
    ],
    "University Department of Information and Communication Technology (UDICT)": [
      { id: "it", name: "B Tech Information Technology" },
      { id: "ai_ml", name: "B Tech (AI & ML)" },
      { id: "data_sci", name: "B Tech Data Science" },
    ],
    "School of Engineering and Technology (SOET)": [
      { id: "agri_eng", name: "B Tech Agriculture Engineering" },
      { id: "cs_iot", name: "B Tech Computer Science & Engineering (IoT, Cyber Security)" },
      { id: "ele_instru", name: "B Tech Electrical and Instrumentation Engineering" },
      { id: "civil_comp", name: "B Tech (Integrated) Civil Engineering with Computer Application" },
      { id: "cs_ds", name: "B Tech (Integrated) Computer Science and Engineering (Data Science)" },
      { id: "cs_iot_integ", name: "B Tech (Integrated) Computer Science and Engineering (IoT)" },
    ],
    "Institute of Management & Research": [
      { id: "bba", name: "BBA (Hons./ Hons. with Research)" },
      { id: "bcom", name: "B.Com (Hons./ Hons. with Research)" },
      { id: "bba_fintech", name: "BBA FinTech (Hons./ Hons. with Research)" },
      { id: "bba_ba", name: "BBA (Hons./ Hons. with Research) Business Analytics" },
    ],
    "School of Basic & Applied Science": [
      { id: "physics", name: "B.Sc (Hons.) Physics" },
      { id: "chemistry", name: "B.Sc (Hons.) Chemistry" },
      { id: "math", name: "B.Sc (Hons.) Mathematics" },
    ],
    "Leonardo Da Vinci School of Design": [
      { id: "applied_art", name: "BFA Applied Art" },
      { id: "interior_design", name: "B. Des. Interior Design" },
    ],
    "University Department of Music & Theatre": [
      { id: "bpa_music", name: "BPA in Music" },
      { id: "bpa_theatre", name: "BPA in Theatre" },
    ],
  };

  // Load selected faculty from localStorage on component load
  useEffect(() => {
    const savedFaculty = localStorage.getItem("selectedFaculty");
    if (savedFaculty) {
      setSelectedFaculty(savedFaculty);
    }

    // Load selected institute and preferences if they exist in formData
    if (formData.programSelection) {
      setSelectedInstitute(formData.programSelection.selectedInstitute || "");
      setPreferences(formData.programSelection.preferences || []);
    }
  }, [formData.programSelection]);

  // Filtered institutes based on selected faculty
  const filteredInstitutes = selectedFaculty ? institutes[selectedFaculty] || [] : [];

  // Handle Institute Change
  const handleInstituteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instituteName = e.target.value;
    setSelectedInstitute(instituteName);
    setSelectedProgram("");
    setPreferences([]);
  };

  // Add program to preferences
  const handleAddPreference = () => {
    if (!selectedProgram) return;
    const programObj = programs[selectedInstitute]?.find((p) => p.id === selectedProgram);
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
    setSelectedProgram("");
  };

  // Remove program from preferences
  const handleRemovePreference = (id: string) => {
    setPreferences(preferences.filter((p) => p.id !== id));
  };

  // Check if the form is valid before submission
  const isValid = selectedInstitute !== "" && preferences.length > 0;

  // Handle Next Button Click
  const handleNext = () => {
    if (isValid) {
      const programData = { selectedInstitute, preferences };
      updateFormData("programSelection", programData);
      onNext(programData);
    }
  };

  // Prevent rendering if faculty is not selected
  if (!selectedFaculty) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
        Please select a faculty first before proceeding with program selection.
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="space-y-6">
        {/* Institute Selection */}
        <div>
          <label htmlFor="institute" className="block text-sm font-medium text-gray-700 mb-1">
            Select Institute *
          </label>
          <select
            id="institute"
            value={selectedInstitute}
            onChange={handleInstituteChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">-- Select Institute --</option>
            {filteredInstitutes.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
        </div>

        {/* Program Selection */}
        <div className="mt-2">
          <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
            Select Program *
          </label>
          <select
            id="program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!selectedInstitute}
            required
          >
            <option value="">-- Select Program --</option>
            {selectedInstitute &&
              programs[selectedInstitute]?.map((prog) => (
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
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#FC8939]"
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
                <li
                  key={pref.id}
                  className="flex items-center justify-between p-2 rounded-md shadow bg-white"
                >
                  <span>
                    {index + 1}. {pref.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePreference(pref.id)}
                    className="ml-2 text-red-600 hover:text-red-800 transition"
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
