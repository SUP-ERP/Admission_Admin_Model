"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Upload, X } from "lucide-react";
import { ImageCropper } from "@/components/ui/image-cropper";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [photo, setPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isPhotoUpload, setIsPhotoUpload] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Handle redirects during loading or when not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f2ed]">
        <p className="text-[#2e3653]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isPhoto: boolean
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        setCropperOpen(true);
        setIsPhotoUpload(isPhoto);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    if (isPhotoUpload) {
      setPhoto(croppedImage);
    } else {
      setSignature(croppedImage);
    }
    setCropperOpen(false);
    setCurrentImage(null);
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
  };

  const canContinue = photo && signature;
  const progress = ((photo ? 1 : 0) + (signature ? 1 : 0)) * 50;

  return (
    <div className="min-h-screen bg-[#f8f2ed]">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/LogoMGM.svg"
              alt="MGM Logo"
              className="h-10"
              onError={(e) => {
                e.currentTarget.src = "./LogoMGM.svg";
              }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-[#2e3653]">
              Online Assessment
            </Button>
            <Button variant="outline" className="text-[#2e3653]">
              View Score
            </Button>
            <Button
              variant="outline"
              className="text-[#2e3653]"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-[#2e3653] mb-8">
          Welcome to MGM University
        </h1>

        <Card className="p-6 bg-white shadow-md rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {photo && (
                <div className="w-16 h-16 border border-[#FC8939] rounded-full overflow-hidden">
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-[#FC8939] mb-1">
                  You are logged in as
                </h2>
                <h3 className="text-xl font-bold text-[#2e3653] mb-2">
                  {user.name}
                </h3>
                <div className="flex items-center text-[#2e3653]">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            <div>
              <Button
                className="bg-[#FC8939] hover:bg-[#e67b2e] text-white flex items-center gap-2"
                onClick={openUploadModal}
              >
                <Upload size={16} />
                Upload Profile And Signature Image
              </Button>
            </div>
          </div>


          <div className="mt-6 space-y-4 text-sm text-[#2e3653] bg-[#eed4c3] p-4 rounded-lg">
            <p>
              By submitting this application form, you confirm that you are
              requesting admission to a UCW educational program ("Program") and
              are providing the above information about you (your "personal data")
              for these purposes. UCW requires this information for legitimate
              business purposes, and, at your request, in order to make decisions
              about your admission to the Program.
            </p>
            <p>
              Your personal data will be collected, used and disclosed only for
              these purposes and, in the event you are admitted to the Program, to
              manage your enrollment and attendance at UCW, including registration,
              maintenance of your student records, the provision of related services
              to you, and for other purposes related to your participation in the
              Program and our evaluation and improvement of the Program.
            </p>
            <p>
              Failure to provide complete or accurate information may result in
              UCW's inability to process your application.
            </p>
          </div>
        </Card>

        <section>
          <h2 className="text-lg font-semibold text-[#2e3653] mb-4 mt-8">
            MY APPLICATIONS (1)
          </h2>
          <Card className="p-6 bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#FC8939]">
                {user ? user.selectedProgram : ''} Application Form 2025-26
              </h3>
              <div className="relative w-full h-2 bg-[#eed4c3] rounded-full mt-2">
                <div
                  className="absolute left-0 top-0 h-full bg-[#FC8939] rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-[#2e3653] mt-1">
                {progress}% Completed
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-[#2e3653]">
                 {user ? user.selectedProgram : ''} Application Form (2025 - 2026)
              </div>
              {!canContinue ? (
                <div className="text-sm text-[#FC8939]">
                  *Upload Profile Photo and Signature To Continue Application.
                </div>
              ) : (
                <Button
                  className="bg-[#FC8939] hover:bg-[#e67b2e] text-white"
                  onClick={() => router.push("/admission")}
                >
                  Continue Application
                </Button>
              )}
            </div>
          </Card>
        </section>
      </main>

      <footer className="bg-white border-t fixed bottom-0 w-full ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-right text-sm text-[#2e3653]">
          Developed by MGM ERP Team
        </div>
      </footer>

      {/* Image cropper modal */}
      {currentImage && (
        <ImageCropper
          open={cropperOpen}
          onClose={() => {
            setCropperOpen(false);
            setCurrentImage(null);
          }}
          image={currentImage}
          onCropComplete={handleCropComplete}
          aspectRatio={isPhotoUpload ? 1 : 3}
        />
      )}

      {/* Upload modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#2e3653]">Upload Profile & Signature</h2>
              <button
                onClick={closeUploadModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20}/>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-[#2e3653] mb-2"
                  htmlFor="photo-upload-modal"
                >
                  Profile Photo
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, true)}
                    className="hidden"
                    id="photo-upload-modal"
                  />
                  <label
                    htmlFor="photo-upload-modal"
                    className="cursor-pointer inline-block"
                  >
                    <div className="w-full h-40 border-2 border-dashed border-[#FC8939] rounded-lg flex items-center justify-center bg-[#f8f2ed]">
                      {photo ? (
                        <img
                          src={photo}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-[#FC8939]" />
                          <span className="mt-2 block text-sm font-medium text-[#FC8939]">Upload Photo</span>
                        </div>
                      )}
                    </div>
                  </label>
                  <p className="text-xs text-[#2e3653]">
                    Upload a clear passport size photo (max 1MB)
                  </p>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#2e3653] mb-2"
                  htmlFor="signature-upload-modal"
                >
                  Signature
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, false)}
                    className="hidden"
                    id="signature-upload-modal"
                  />
                  <label
                    htmlFor="signature-upload-modal"
                    className="cursor-pointer inline-block w-full"
                  >
                    <div className="w-full h-20 border-2 border-dashed border-[#FC8939] rounded-lg flex items-center justify-center bg-[#f8f2ed]">
                      {signature ? (
                        <img
                          src={signature}
                          alt="Signature"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-6 w-6 text-[#FC8939]" />
                          <span className="mt-1 block text-sm font-medium text-[#FC8939]">Upload Signature</span>
                        </div>
                      )}
                    </div>
                  </label>
                  <p className="text-xs text-[#2e3653]">
                    Upload your signature (max 1MB)
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-[#FC8939] hover:bg-[#e67b2e] text-white"
                  onClick={closeUploadModal}
                  disabled={!photo && !signature}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}