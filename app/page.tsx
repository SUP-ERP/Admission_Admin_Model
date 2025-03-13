"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { ImageCropper } from "@/components/ui/image-cropper";
import '../app/globals.css';

export default function Home() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isPhotoUpload, setIsPhotoUpload] = useState(false);

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
            <Button variant="outline" className="text-[#2e3653]">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-[#2e3653] mb-8">
          Welcome to MGM
        </h1>

        <Card className="p-6 mb-8 bg-white">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#FC8939] mb-1">
                You are logged in as
              </h2>
              <h3 className="text-xl font-bold text-[#2e3653] mb-2">
                MHIAT VARIABLE LAYA
              </h3>
              <div className="flex items-center text-[#2e3653] mb-6">
                <Mail className="w-4 h-4 mr-2" />
                <span>lala@gmail.com</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-[#2e3653] mb-2"
                    htmlFor="photo-upload"
                  >
                    Profile Photo
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, true)}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer inline-block"
                    >
                      <div className="w-40 h-40 border-2 border-dashed border-[#FC8939] rounded-lg flex items-center justify-center bg-[#f8f2ed]">
                        {photo ? (
                          <img
                            src={photo}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-[#FC8939]">Upload Photo</span>
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
                    htmlFor="signature-upload"
                  >
                    Signature
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, false)}
                      className="hidden"
                      id="signature-upload"
                    />
                    <label
                      htmlFor="signature-upload"
                      className="cursor-pointer inline-block"
                    >
                      <div className="w-40 h-20 border-2 border-dashed border-[#FC8939] rounded-lg flex items-center justify-center bg-[#f8f2ed]">
                        {signature ? (
                          <img
                            src={signature}
                            alt="Signature"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-[#FC8939]">Upload Signature</span>
                        )}
                      </div>
                    </label>
                    <p className="text-xs text-[#2e3653]">
                      Upload your signature (max 1MB)
                    </p>
                  </div>
                </div>
              </div>
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
          <h2 className="text-lg font-semibold text-[#2e3653] mb-4">
            MY APPLICATIONS (1)
          </h2>
          <Card className="p-6 bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#FC8939]">
                First Year B.Tech (JNEC) 2025-26
              </h3>
              <div className="relative w-full h-2 bg-[#eed4c3] rounded-full mt-2">
                <div
                  className="absolute left-0 top-0 h-full bg-[#FC8939] rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-[#2e3653] mt-1">
                {progress} %Completed
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-[#2e3653]">
                JNEC - First Year B.Tech (2025 - 2026)
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

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-right text-sm text-[#2e3653]">
          Developed by MGM ERP Team
        </div>
      </footer>

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
    </div>
  );
}
