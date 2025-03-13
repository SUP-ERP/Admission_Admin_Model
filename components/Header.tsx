import Image from "next/image";
import { LogOut } from "lucide-react";
import '../app/globals.css';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative">
            <Image src="/LogoMGM.svg" alt="Institute Logo" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-[#2e3653]">MGM University</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, Student</span>
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#FC8939]">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
