"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  open: boolean;
  onClose: () => void;
  image: string;
  onCropComplete: (croppedImage: string) => void;
  aspectRatio?: number;
}

export function ImageCropper({
  open,
  onClose,
  image,
  onCropComplete,
  aspectRatio = 1
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  
  const imgRef = useRef<HTMLImageElement>(null);

  const getCroppedImg = () => {
    if (!imgRef.current) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = crop.width;
    canvas.height = crop.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    onCropComplete(base64Image);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={aspectRatio}
          >
            <img
              ref={imgRef}
              src={image}
              alt="Crop me"
              className="max-h-[400px] w-auto"
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={getCroppedImg}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}