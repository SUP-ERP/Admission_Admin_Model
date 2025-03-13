// sections/UploadPhotoSignature.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageCropper } from "@/components/ui/image-cropper";

interface UploadProps {
  onComplete?: (data: { photo: string; signature: string }) => void;
}

const UploadPhotoSignature = ({ onComplete }: UploadProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isPhotoUpload, setIsPhotoUpload] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isPhoto: boolean) => {
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

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Upload Your Photo & Signature</h2>
      <div className="grid grid-cols-2 gap-4 my-4">
        {/* Photo Section */}
        <div>
          <label className="block mb-2">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, true)}
            className="hidden"
            id="photo-upload-section"
          />
          <label htmlFor="photo-upload-section" className="cursor-pointer block border p-4 text-center">
            {photo ? <img src={photo} alt="Uploaded Photo" className="w-32 h-32 object-cover" /> : "Upload Photo"}
          </label>
        </div>
        {/* Signature Section */}
        <div>
          <label className="block mb-2">Signature</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, false)}
            className="hidden"
            id="signature-upload-section"
          />
          <label htmlFor="signature-upload-section" className="cursor-pointer block border p-4 text-center">
            {signature ? <img src={signature} alt="Uploaded Signature" className="w-32 h-20 object-cover" /> : "Upload Signature"}
          </label>
        </div>
      </div>
      <div>
        <Button disabled={!canContinue} onClick={() => onComplete && onComplete({ photo: photo!, signature: signature! })}>
          Continue
        </Button>
      </div>
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
};

export default UploadPhotoSignature;
