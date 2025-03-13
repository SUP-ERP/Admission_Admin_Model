"use client";

import { useState } from "react";

interface GuidelinesProps {
  onNext: () => void;
  onPrev?: () => void;
}

export default function Guidelines({ onNext, onPrev }: GuidelinesProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex-1">
      <h3 className="text-xl font-medium mb-4">Admission Guidelines</h3>

      <div className="space-y-4">
        <p className="text-gray-700">
          For any assistance or queries regarding the application, please call{" "}
          <strong>7038667292</strong>.
        </p>

        <h4 className="text-lg font-semibold">Steps: Following Information is Required</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>Personal Info:</strong> Name, Date of Birth, Mobile Number, Address, Category Details,
            etc.
          </li>
          <li>
            <strong>Education Details:</strong> Academic history, board/university details,
            and year of passing.
          </li>
          <li>
            <strong>Entrance Exam Details:</strong> Exam type, application ID, roll number,
            score, and rank.
          </li>
          <li>
            <strong>Upload Documents:</strong> Scanned mark sheets, category/caste certificates,
            and other required documents.
          </li>
          <li>
            <strong>Payment Details:</strong> Information related to admission form fees.
          </li>
        </ul>

        <h4 className="text-lg font-semibold">Program Selection</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Carefully select the appropriate program you wish to apply for.</li>
          <li>
            The application fee will be calculated based on the number of programs
            selected.
          </li>
        </ul>

        <h4 className="text-lg font-semibold">Education Details</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            Enter details starting from 10th, 12th/Diploma, Graduation (if applicable).
          </li>
          <li>Choose between the Percentage System or Grade System carefully.</li>
          <li>Ensure the year of passing is correctly specified.</li>
          <li>
            The Board of Examination decides the normalization factor, so provide accurate
            details.
          </li>
        </ul>

        <h4 className="text-lg font-semibold">Entrance Exam Details</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Select the entrance exam you have appeared for.</li>
          <li>Enter the correct application ID, roll number, and rank/score.</li>
        </ul>

        <h4 className="text-lg font-semibold">Upload Scanned Documents</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            Upload all necessary mark sheets, category/caste certificates, migration
            certificates, and domicile certificates.
          </li>
          <li>
            Scanned photograph must be <strong>less than 40KB</strong> in{" "}
            <strong>JPG/JPEG</strong> format.
          </li>
        </ul>

        <h4 className="text-lg font-semibold">Payment Options for Admission Form</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>Online:</strong> Credit/Debit card.
          </li>
          <li>
            <strong>UPI Payment:</strong> Use BHIM, PhonePe, Google Pay, etc.
          </li>
          <li>
            <strong>Net Banking:</strong> Pay through internet banking.
          </li>
          <li>
            <strong>QR Scanner:</strong> Scan and pay via QR code.
          </li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p className="font-medium">Important Note:</p>
          <p>
            The last date for submission is <strong>[Application Deadline]</strong>.
            No applications will be accepted after this date.
          </p>
        </div>
      </div>

      {/* Mandatory Checkbox */}
      <div className="mt-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="ml-2 text-gray-700">
            I have read, understood, and agree to all the above statements.
          </span>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 pt-4 border-t">
        
        <button
          onClick={onNext}
          disabled={!isChecked}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isChecked
              ? "bg-[#2e3653] text-white hover:bg-[#FC8939] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
