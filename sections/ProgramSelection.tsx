import { useState } from "react";

interface Program {
  id: string;
  name: string;
}


interface ProgramSelectionProps {
  onNext: (data: { selectedInstitute: string; preferences: Program[] }) => void;
  onPrev?: () => void;
}

export default function ProgramSelection({ onNext, onPrev }: ProgramSelectionProps) {
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [preferences, setPreferences] = useState<Program[]>([]);


  // Example institutes and programs from JSON
  const institutes = [
    "Jawaharlal Nehru Engineering College (JNEC)",
    "Institute of Fire Service Engineering",
    "University Department of Information and Communication Technology (UDICT)",
    "School of Engineering and Technology (SOET)",
    "Institute of Management & Research",
    "Institute of Hotel Management",
    "Dr. G.Y. Pathrikar College of Computer Science & Information Technology",
    "Institute of Bioscience and Technology",
    "School of Basic & Applied Science",
    "College of Journalism & Mass Communication",
    "Institute of Social Sciences",
    "School of Film Arts",
    "Department of Photography",
    "Department of Sports, Physical Education & Yog Science",
    "Department of Education",
    "Institute of Indian & Foreign Languages",
    "Leonardo Da Vinci School of Design",
    "School of Legal Studies & Research",
    "Nath School of Business & Technology",
    "University Department of Music & Theatre",
    "University Department of Pharmaceutical Sciences",
    "MAHAGAMI GURUKUL Center for Performing Arts"
  ];

  const programs = {
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
    "Institute of Fire Service Engineering": [
      { id: "fire_safety", name: "B sc. Fire and Safety" },
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
      { id: "mech_industrial", name: "B Tech (Integrated) Advanced Mechatronics and Industrial Automation" },
      { id: "robotics_ai", name: "B Tech (Integrated) Robotics and AI" },
      { id: "vlsi_design", name: "B Tech Electronic Engineering (VLSI Design and Technology)" },
      { id: "it_integ", name: "B Tech (Integrated) Information Technology" },
      { id: "ele_comp_integ", name: "B Tech (Integrated) Electrical and Computer Engineering" },
      { id: "cs_design", name: "B Tech (Computer Science and Design)" },
      { id: "robotics_auto", name: "B Tech Robotics and Automation" },
    ],
    "Institute of Management & Research": [
      { id: "bba", name: "BBA (Hons./ Hons. with Research)" },
      { id: "bcom", name: "B.Com (Hons./ Hons. with Research)" },
      { id: "bba_fintech", name: "BBA FinTech (Hons./ Hons. with Research)" },
      { id: "bba_ba", name: "BBA (Hons./ Hons. with Research) Business Analytics" },
    ],
    "Institute of Hotel Management": [
      { id: "hotel_ops", name: "B. Sc. (Hons.) Hotel Operations Catering Services" },
      { id: "aviation_hosp", name: "B.B.A (Hons.) In Aviation, Hospitality and Travel & Tourism" },
      { id: "culinary_arts", name: "B. Sc. (Hons.) Culinary Arts" },
    ],
    "Dr. G.Y. Pathrikar College of Computer Science & Information Technology": [
      { id: "comp_sci", name: "B Sc. (Hons.) Computer Science" },
      { id: "it", name: "B Sc. (Hons.) Information technology" },
      { id: "sci", name: "B Sc. (Hons.) Science" },
      { id: "animation", name: "B Sc. (Hons.) Animation" },
      { id: "robotics", name: "B Sc. (Hons.) Robotics" },
      { id: "digital_mkt", name: "B Sc. (Hons.) Digital Marketting" },
      { id: "data_sci_integ", name: "B Sc.-M Sc. Data Science (Integrated)" },
    ],
    "Institute of Bioscience and Technology": [
      { id: "biotech", name: "B.Sc (Hons.) Biotechnology" },
      { id: "bioinfo", name: "B.Sc (Hons.) Bioinformatics" },
      { id: "microbio", name: "B.Sc (Hons.) Microbiology" },
      { id: "food_tech", name: "B.Sc (Hons.) Food Technology & Processing" },
      { id: "nutrition_diet", name: "B.Sc (Hons.) Food Nutrition & Dietetics" },
      { id: "biotech_eng", name: "B.Tech. (Biotechnology)" },
      { id: "food_proc_tech", name: "B.Tech. Food Processing Technology" },
      { id: "biomed_eng", name: "B.Tech. Biomedical Engineering" },
    ],
    "School of Basic & Applied Science": [
      { id: "physics", name: "B.Sc (Hons.) Physics" },
      { id: "chemistry", name: "B.Sc (Hons.) Chemistry" },
      { id: "math", name: "B.Sc (Hons.) Mathematics" },
      { id: "stats", name: "B.Sc (Hons.) Statistics" },
      { id: "cosmetic_tech", name: "B.Tech. Cosmetic Technology" },
      { id: "geology", name: "B.Sc (Hons.) Geology" },
      { id: "home_sci", name: "B.Sc (Hons.) Home Science" },
      { id: "env_sci", name: "B.Sc (Hons.) Environmental Science" },
      { id: "zoology", name: "B.Sc (Hons.) Zoology" },
      { id: "forensic_sci", name: "B.Sc (Hons.) Forensic Science" },
    ],
    "College of Journalism & Mass Communication": [
      { id: "journalism", name: "B.A International Journalism & Electronic Media" },
      { id: "mass_comm", name: "B.A (Hons./Reg. with Research) Mass Communication and Media" },
    ],
    "Institute of Social Sciences": [
      { id: "social_work", name: "Bachelor in Social Work (BSW)" },
      { id: "psych", name: "B.A. (Hons.) Psychology" },
      { id: "econ", name: "B.A. (Hons.) Economics" },
    ],
    "School of Film Arts": [
      { id: "cinema", name: "B.A. (Hons.) Cinematography" },
      { id: "film_direction", name: "B.A. (Hons.) Film Direction" },
      { id: "film_editing", name: "B.A. (Hons.) Film Editing" },
      { id: "sound_design", name: "B.A. (Hons.) Sound Designing & Music Production" },
      { id: "vfx_animation", name: "B.A. (Hons.) VFX and Animation" },
      { id: "film_acting", name: "B.A. (Hons.) Film Acting" },
      { id: "prod_design", name: "B.A. (Hons.) Production Design & Art Direction" },
    ],
    "Department of Photography": [
      { id: "photo", name: "B.A. (Hons.) Photography" },
    ],
    "Department of Sports, Physical Education & Yog Science": [
      { id: "bpes", name: "B.P.E.S. Bachelor of Physical Education & Sports" },
    ],
    "Department of Education": [
      { id: "edu", name: "B.A. (Hons.) Education" },
    ],
    "Institute of Indian & Foreign Languages": [
      { id: "eng", name: "B.A. (Hons.) English" },
    ],
    "Leonardo Da Vinci School of Design": [
      { id: "applied_art", name: "BFA Applied Art" },
      { id: "interior_design", name: "B. Des. Interior Design" },
      { id: "fashion_design", name: "B. Des. Fashion Design" },
      { id: "textile_design", name: "B. Des. Textile Design" },
      { id: "industrial_design", name: "B. Des. Industrial Design" },
      { id: "visual_comm", name: "B. Des. Visual Communication" },
      { id: "contemporary_art", name: "BFA Contemporary Art" },
      { id: "traditional_art", name: "BFA Traditional Art and Craft" },
    ],
    "School of Legal Studies & Research": [
      { id: "llb", name: "Bachelor of Law (LL.B.)" },
      { id: "bba_llb", name: "Bachelor of Business Administration and Bachelor of Law" },
    ],
    "Nath School of Business & Technology": [
      { id: "bms", name: "Bachelor of Management Studies (BMS)" },
      { id: "bca_ctis", name: "BCA (Cloud Technology & Information Security)" },
      { id: "mca_dpt", name: "MCA (Digital Product Technology)" },
      { id: "mca_ai_ds", name: "MCA (Artificial Intelligence - Data Science)" },
      { id: "bms_efi", name: "BMS (Entrepreneurship, Family Business and Innovation)" },
    ],
    "University Department of Music & Theatre": [
      { id: "bpa_music", name: "BPA in Music" },
      { id: "bpa_theatre", name: "BPA in Theatre" },
    ],
    "University Department of Pharmaceutical Sciences": [
      { id: "b_pharm", name: "Bachelor of Pharmacy" },
    ],
    "MAHAGAMI GURUKUL Center for Performing Arts": [
      { id: "bpa_kathak", name: "BPA in Kathak (Lab and Kathak)" },
      { id: "bpa_odissi", name: "BPA in Odissi (Lab and Gurukul)" },
    ]
  };

  // When the institute changes, reset both the selected program and current preferences
  const handleInstituteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instituteName = e.target.value;
    setSelectedInstitute(instituteName);
    setSelectedProgram("");
    setPreferences([]);
  };

  const handleAddPreference = () => {
    if (!selectedProgram) return;
    const programObj = programs[selectedInstitute as keyof typeof programs].find(
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
    setSelectedProgram("");
  };

  const handleRemovePreference = (id: string) => {
    setPreferences(preferences.filter((p) => p.id !== id));
  };

  const isValid = selectedInstitute !== "" && preferences.length > 0;

  const handleNext = () => {
    if (isValid) {
      onNext({ selectedInstitute, preferences });
    }
  };

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
            {institutes.map((inst) => (
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
              programs[selectedInstitute as keyof typeof programs].map((prog) => (
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
                <li key={pref.id} className="flex items-center justify-between  p-2 rounded-md shadow">
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
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${isValid
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