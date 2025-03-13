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
        return <ProgramSelection onNext={onNext} onPrev={onPrev} />;
      case 3:
        return <PersonalDetails onNext={onNext} onPrev={onPrev} />;
      case 4:
        return <EligibilityCriteria onNext={onNext} onPrev={onPrev} />;
      case 5:
        return <CategorySelection onNext={onNext} onPrev={onPrev} />;
      case 6:
        return <EducationHistory onNext={onNext} onPrev={onPrev} />;
      case 7:
        return <EntranceDetails onNext={onNext} onPrev={onPrev} />;
      case 8:
        return <UploadDocuments onNext={onNext} onPrev={onPrev} />;
      case 9:
        return <Declarations onNext={onNext} onPrev={onPrev} />;
      case 10:
        return <ReviewSubmit onNext={onNext} onPrev={onPrev} />;
      case 11:
        return <MakePayment onNext={onNext} onPrev={onPrev} />;
      default:
        return (
          <div className="text-red-500 text-center">❌ Section Not Found</div>
        );
    }
  };

  return <div className="w-full">{renderSection()}</div>;
}
