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
  selectedFaculty: string; // NEW FIELD
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
    programSelection: {
      selectedInstitute: "",
      preferences: []
    },
    eligibilityCriteria: {},
    entranceDetails: {},
    uploadDocuments: {},
    selectedFaculty: "",
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
