import { ChevronRight } from "lucide-react";

interface SidebarProps {
  sections: { id: number; title: string }[];
  selectedSection: number;
  setSelectedSection: (id: number) => void;
  progress: number;
}

export default function Sidebar({ sections, selectedSection, setSelectedSection, progress }: SidebarProps) {
  return (
    <div className="w-64 bg-[#2e3653] text-white">
      <div className="p-4 bg-[#FC8939] text-white">
        <h2 className="text-lg font-semibold">First Year B.Tech (JNEC) 2025-26</h2>
        <div className="mt-2">
          <div className="w-full bg-[#eed4c3] rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm mt-1">{progress}% completed</p>
        </div>
      </div>

      <nav className="mt-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[#FC8939] transition-colors ${
              selectedSection === section.id ? "bg-[#FC8939]" : ""
            }`}
          >
            <span>{section.title}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </nav>
    </div>
  );
}
