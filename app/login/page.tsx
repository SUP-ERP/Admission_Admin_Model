"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password || !name || !selectedProgram) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password, name, selectedProgram);

    if (success) {
      router.push("/");
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
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
            <div>
              <label className="block text-sm font-medium text-[#2e3653] mb-1">
                Name
              </label>
              <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-[#eed4c3] focus:ring-[#FC8939] focus:border-[#FC8939]"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#2e3653] mb-1">
                Program
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full border-[#eed4c3] focus:ring-[#FC8939] focus:border-[#FC8939] p-2 rounded-md"
              >
                <option value="" disabled>Select a faculty</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Management & Commerce">Management & Commerce</option>
                <option value="Basic & Applied Science">Basic & Applied Science</option>
                <option value="Social Science & Humanities">Social Science & Humanities</option>
                <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
                <option value="Design">Design</option>
                <option value="Performing Arts">Performing Arts</option>

              </select>
            </div>


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

            <Button
              type="submit"
              className="w-full bg-[#FC8939] hover:bg-[#e67b2e] text-white"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-sm text-center text-[#2e3653]">
          <p>Use any email and password "password" to login</p>
        </div>
      </Card>
    </div>
  );
}