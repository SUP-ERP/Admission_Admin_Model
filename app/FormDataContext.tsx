// FormDataContext.tsx
"use client";  

import React, { createContext, useContext, useState } from "react";

interface FormData {
  personalDetails: any;
  educationHistory: any[];
  categorySelection: any;
  programSelection: any;
  eligibilityCriteria: any;
  entranceDetails: any;
  uploadDocuments: any;
}

interface FormContextProps {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const FormDataContext = createContext<FormContextProps | undefined>(undefined);

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {},
    educationHistory: [],
    categorySelection: {},
    programSelection: {},
    eligibilityCriteria: {},
    entranceDetails: {},
    uploadDocuments: {},
    
  });

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
