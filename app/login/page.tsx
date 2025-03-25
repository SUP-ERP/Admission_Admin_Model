"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { useFormData } from "../FormDataContext"; // Import useFormData

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const { updateFormData } = useFormData(); // Get updateFormData from context

  // Load faculty from local storage on component load
  useEffect(() => {
    const savedFaculty = localStorage.getItem("selectedFaculty");
    if (savedFaculty) {
      setSelectedProgram(savedFaculty);
      updateFormData("selectedFaculty", savedFaculty);
    }
  }, []);

  // Handle faculty selection and save to local storage
  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const faculty = e.target.value;
    setSelectedProgram(faculty);
    updateFormData("selectedFaculty", faculty);
    localStorage.setItem("selectedFaculty", faculty); // Save to local storage
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password || !name || !selectedProgram) {
      setError("Please fill in all fields");
      return;
    }

    // Save selected faculty to local storage before login
    localStorage.setItem("selectedFaculty", selectedProgram);

    // Login logic
    const success = await login(email, password, name, selectedProgram);

    if (success) {
      router.push("/admission"); // Redirect to homepage or dashboard after login
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f2ed]">
      <Card className="w-full max-w-md p-6 bg-white">
        <div className="flex justify-center mb-6">
          <img
            src="/LogoMGM.svg"
            alt="MGM Logo"
            className="h-16"
            onError={(e) => {
              e.currentTarget.src = "./LogoMGM.svg";
            }}
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-[#2e3653] mb-6">
          Login to MGM University
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#2e3653] mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-[#eed4c3] focus:ring-[#FC8939] focus:border-[#FC8939]"
                placeholder="Enter your email"
              />
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-[#2e3653] mb-1">
                Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-[#eed4c3] focus:ring-[#FC8939] focus:border-[#FC8939]"
                placeholder="Enter your name"
              />
            </div>

            {/* Program Selection (Faculty) */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#2e3653] mb-1">
                Faculty
              </label>
              <select
                value={selectedProgram}
                onChange={handleFacultyChange}
                className="w-full border-[#eed4c3] focus:ring-[#FC8939] focus:border-[#FC8939] p-2 rounded-md"
              >
                <option value="" disabled>
                  Select a faculty
                </option>
                <option value="Engineering & Technology">
                  Engineering & Technology
                </option>
                <option value="Management & Commerce">
                  Management & Commerce
                </option>
                <option value="Basic & Applied Science">
                  Basic & Applied Science
                </option>
                <option value="Social Science & Humanities">
                  Social Science & Humanities
                </option>
                <option value="Interdisciplinary Studies">
                  Interdisciplinary Studies
                </option>
                <option value="Design">Design</option>
                <option value="Performing Arts">Performing Arts</option>
              </select>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-[#2e3653] mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[#eed4c3] focus:ring-[#FC8939] focus:border-[#FC8939]"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FC8939] hover:bg-[#e67b2e] text-white"
            >
              Login
            </Button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-4 text-sm text-center text-[#2e3653]">
          <p>Use any email and password "password" to login</p>
        </div>
      </Card>
    </div>
  );
}
