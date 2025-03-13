"use client";
import { useState } from "react";

export interface MakePaymentData {
  paymentMethod: string;
}

interface MakePaymentProps {
  onNext: (data: MakePaymentData) => void;
  onPrev?: () => void;
}

export default function MakePayment({ onNext, onPrev }: MakePaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const isFormValid = (): boolean => {
    return paymentMethod.trim() !== "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      onNext({ paymentMethod });
    } else {
      alert("Please select a payment method to proceed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <h3 className="text-xl font-medium mb-4">Make Payment</h3>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 p-4 rounded-md">
          <p className="text-gray-700">
            Please proceed with the payment to complete your admission process. Ensure you use the correct payment method.
          </p>
        </div>

        <div className="border border-gray-300 p-4 rounded-md bg-white shadow-sm">
          <p className="text-gray-700">
            Admission Fee: <strong>₹50,000</strong>
          </p>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Select Payment Method</h4>
            <select
              value={paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">-- Select Payment Method --</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="net-banking">Net Banking</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 bg-[#2e3653] text-white rounded-md hover:bg-[#FC8939] transition"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`px-4 py-2 rounded-md transition ${
              isFormValid()
                ? "bg-[#FC8939] text-white hover:bg-[#e57830] cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
}
