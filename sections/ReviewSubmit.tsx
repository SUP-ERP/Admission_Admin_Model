"use client";
import React from "react";

interface ReviewSubmitProps {
  onNext: () => void;
  onPrev?: () => void;
  // Optionally pass in reviewData; here we provide defaults for demonstration.
  reviewData?: { [key: string]: string | number };
}

export default function ReviewSubmit({ onNext, onPrev, reviewData }: ReviewSubmitProps) {
  // Placeholder review data; in a real application, this data would be passed down.
  const data = reviewData || {
    Name: "John Doe",
    Email: "johndoe@example.com",
    "Program Selected": "B.Tech Computer Science",
    "Entrance Exam": "JEE Main",
  };

  // When the form is submitted, trigger the onNext callback.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <h3 className="text-xl font-medium mb-4">Review &amp; Submit</h3>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <p className="text-gray-700">
            Please review all the details you have entered before submitting. Once submitted,
            changes may not be allowed.
          </p>
        </div>

        <div className="border border-gray-300 p-4 rounded-md bg-white shadow-sm">
          <p className="text-gray-700">
            Check your details below. If you need to make any corrections, navigate to the relevant section.
          </p>

          {/* Dynamically render review details */}
          <ul className="mt-4 space-y-2 text-gray-700">
            {Object.entries(data).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Edit Details
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-[#FC8939] text-white rounded-md hover:bg-[#e57830] transition"
          >
            Confirm &amp; Submit
          </button>
        </div>
      </div>
    </form>
  );
}
