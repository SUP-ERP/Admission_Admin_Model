"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Import Components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Section from "@/components/Section";

const sections = [
  { id: 1, title: "Enquiry" },
  { id: 2, title: "View all forms" },
  { id: 3, title: "View accepted forms" },
  { id: 4, title: "View rejected forms" },
  { id: 5, title: "Merit List" },
  
];

export default function Admission() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState(1);
  const [progress] = useState(0);

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && selectedSection > 1) {
      setSelectedSection(selectedSection - 1);
    } else if (direction === "next" && selectedSection < sections.length) {
      setSelectedSection(selectedSection + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar
          sections={sections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          
        />

        {/* Main Content Area */}
        <div className="flex-1 bg-[#f8f2ed] p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 min-h-[calc(100vh-10rem)] flex flex-col">
            <h2 className="text-2xl font-semibold text-[#2e3653] mb-6">
              {sections.find((s) => s.id === selectedSection)?.title}
            </h2>

            {/* Dynamic Section Rendering with Navigation */}
            <Section
              sectionId={selectedSection}
              onNext={() => handleNavigation("next")}
              onPrev={() => handleNavigation("prev")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
