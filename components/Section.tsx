// components/section.tsx
"use client";

import Guidelines from "../sections/Guidelines";
import ProgramSelection from "../sections/ProgramSelection";
import PersonalDetails from "../sections/PersonalDetails";
import EligibilityCriteria from "../sections/EligibilityCriteria";
import CategorySelection from "../sections/CategorySelection";
import EducationHistory from "../sections/EducationHistory";
import EntranceDetails from "../sections/EntranceDetails";
import UploadDocuments from "../sections/UploadDocuments";
import Declarations from "../sections/Declarations";
import ReviewSubmit from "../sections/ReviewSubmit";
import MakePayment from "../sections/MakePayment";
import { useAuth } from "@/lib/auth-context";
import ViewAllForms from "@/sections/ViewAllForms";
import ViewAcceptedForms from "../components/ViewAcceptedForms";
import ViewRejectedForms from "../components/ViewRejectedForms";

import ViewMeritList from "@/sections/ViewMeritList";


// Updated interface to include navigation callbacks
interface SectionProps {
  sectionId: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Section({ sectionId, onNext, onPrev }: SectionProps) {
  const renderSection = () => {
    switch (sectionId) {
      case 1:
        return <Guidelines onNext={onNext} onPrev={onPrev} />;
      case 2:
        return <ViewAllForms  />;
      case 3:
        return <ViewAcceptedForms  />;
      case 4:
        return <ViewRejectedForms />;
      case 5:
        return <ViewMeritList />;
      
      default:
        return (
          <div className="text-red-500 text-center">❌ Section Not Found</div>
        );
    }
  };

  return <div className="w-full">{renderSection()}</div>;
}
