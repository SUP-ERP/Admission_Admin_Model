import { useFormData } from "../app/FormDataContext";
import { useRef } from "react";



type Program = {
  name: string;
};

export default function ReviewSubmit({ onNext, onPrev }: { onNext: () => void, onPrev?: () => void }) {
  const { formData } = useFormData();
  const printSectionRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printSectionRef.current;
    if (!printContent) return;

    // Store original document content
    const originalContents = document.body.innerHTML;
    const printContents = printContent.innerHTML;

    // Create themed print layout
    document.body.innerHTML = `
      <style>
        @media print {
          @page { margin: 1.5cm; }
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333333; 
            background-color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .print-container {
            max-width: 100%;
            margin: 0 auto;
          }
          .print-header { 
            text-align: center; 
            margin-bottom: 25px; 
            padding-bottom: 15px; 
            border-bottom: 2px solid #2e3653; 
          }
          .print-logo {
            max-height: 60px;
            margin-bottom: 10px;
          }
          .print-section { 
            margin-bottom: 20px; 
            padding: 15px; 
            border: 1px solid #e0e0e0; 
            border-radius: 5px;
            break-inside: avoid; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          h1 { 
            color: #2e3653; 
            font-size: 24px; 
            margin-bottom: 5px; 
          }
          h2 { 
            color: #2e3653; 
            font-size: 18px; 
            margin-top: 0; 
            margin-bottom: 10px; 
            padding-bottom: 5px; 
            border-bottom: 1px solid #eee; 
          }
          .print-row { 
            display: flex; 
            margin-bottom: 8px; 
            align-items: flex-start;
          }
          .print-label { 
            font-weight: bold; 
            width: 180px; 
            color: #444;
          }
          .print-value { 
            flex-grow: 1; 
          }
          .signature-section { 
            margin-top: 60px; 
            display: flex; 
            justify-content: space-between; 
          }
          .signature-box { 
            width: 45%; 
          }
          .signature-line { 
            border-top: 1px solid #333; 
            margin-top: 40px; 
            padding-top: 5px; 
            text-align: center; 
          }
          .print-footer { 
            margin-top: 40px; 
            text-align: center; 
            font-size: 13px; 
            color: #666; 
            border-top: 1px solid #eee;
            padding-top: 15px;
          }
          .document-id {
            font-size: 14px;
            color: #555;
            margin-bottom: 5px;
          }
          .document-date {
            font-size: 14px;
            color: #555;
          }
          .no-print { 
            display: none; 
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          table th {
            background-color: #f6f8fa;
            color: #2e3653;
          }
        }
      </style>
      <div class="print-container">
        <div class="print-header">
          <h1>Application Review Summary</h1>
          <div class="document-id">Application ID: APP-${Math.floor(100000 + Math.random() * 900000)}</div>
          <div class="document-date">Date: ${new Date().toLocaleDateString()}</div>
        </div>
        ${printContents}
        <div class="signature-section">
          <div class="signature-box">
            <div class="signature-line">Applicant's Signature</div>
          </div>
          <div class="signature-box">
            <div class="signature-line">Date</div>
          </div>
        </div>
        <div class="print-footer">
          <p>This is a computer-generated document. Electronic submissions are legally binding.</p>
          <p>Please verify all information before final submission.</p>
        </div>
      </div>
    `;

    // Trigger print dialog
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContents;
  };

  console.log("FormData:", formData);
  console.log("Program Selection:", formData.programSelection);
  console.log("Preferences:", formData.programSelection.preferences);
  console.log("Program Selection data:", formData.programSelection);



  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#2e3653]">Application Review Summary</h2>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#3a4266] transition"
        >
          Print Review
        </button>
      </div>

      <div ref={printSectionRef} className="print-content">
        {/* Personal Details */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Personal Details</h2>
          <div className="space-y-2">
            {Object.entries(formData.personalDetails).map(([key, value]) => (
              <div key={key} className="flex print-row">
                <div className="w-1/3 font-semibold print-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</div>
                <div className="w-2/3 print-value">{value as React.ReactNode}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education History */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Education History</h2>

          {formData.educationHistory && formData.educationHistory.length > 0 ? (
            <div className="space-y-4">
              {formData.educationHistory.map((record, index) => (
                <div key={index} className={`pb-3 ${index < formData.educationHistory.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">{record.level}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                      <div>
                        <span className="text-gray-600 text-sm">Institution:</span>
                        <span className="ml-1">{record.institution}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Board/University:</span>
                        <span className="ml-1">{record.board}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Year of Passing:</span>
                        <span className="ml-1">{record.yearOfPassing}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Percentage/CGPA:</span>
                        <span className="ml-1">{record.percentage}</span>
                      </div>
                      {record.subjects && (
                        <div className="col-span-2">
                          <span className="text-gray-600 text-sm">Major Subjects:</span>
                          <span className="ml-1">{record.subjects}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No education records added</p>
          )}
        </div>

        {/* Category Selection */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Category</h2>
          <div className="flex print-row mt-1 ">
            <div className="w-1/3 font-semibold print-label ">Selected Category: </div>
            <div className="w-2/3 print-value "> {formData.categorySelection.category} - {formData.categorySelection.subcategory}</div>
          </div>
        </div>

        {/* Program Selection */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Program Preferences</h2>

          {/* Institute Information */}
          <div className="mt-1">
            <div className="flex print-row mb-3">
              <div className="w-1/3 font-semibold print-label">Institute:</div>
              <div className="w-2/3 print-value">
                {formData.programSelection?.selectedInstitute || "Not selected"}
              </div>
            </div>
          </div>

          {/* Program Preferences Table */}
          <div className="mt-2">
            <div className="font-semibold mb-2">Program Preferences:</div>

            {Array.isArray(formData.programSelection?.preferences) &&
              formData.programSelection.preferences.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-3 py-2 text-left w-16">No.</th>
                    <th className="border px-3 py-2 text-left">Program Name</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.programSelection.preferences.map((prog, index) => (
                    <tr key={index}>
                      <td className="border px-3 py-2 text-center">{index + 1}</td>
                      <td className="border px-3 py-2">
                        {prog && typeof prog === 'object' && 'name' in prog ? prog.name : 'Unknown program'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No preferences selected</p>
            )}
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Eligibility Criteria</h2>
          <div className="space-y-2">
            {Object.entries(formData.eligibilityCriteria).map(([key, value]) => (
              <div key={key} className="flex print-row">
                <div className="w-1/3 font-semibold print-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</div>
                <div className="w-2/3 print-value">{String(value)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Entrance Examination Details */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Entrance Examination Details</h2>
          <div className="space-y-2">
            {Object.entries(formData.entranceDetails).map(([key, value]) => (
              <div key={key} className="flex print-row">
                <div className="w-1/3 font-semibold print-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</div>
                <div className="w-2/3 print-value">{(value as string | number | boolean).toString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="border p-4 rounded-md mb-6 print-section">
          <h2 className="font-medium text-lg border-b pb-2 mb-3">Uploaded Documents</h2>
          <div className="space-y-4 mt-2">
            {formData.uploadDocuments && Object.keys(formData.uploadDocuments).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData.uploadDocuments).map(([key, file], index) => (
                  <div key={key} className="border rounded-md p-3 shadow-sm bg-white">
                    <h3 className="font-medium text-sm mb-2">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </h3>

                    {/* File Preview Section */}
                    {file instanceof File ? (
                      <div className="mb-3">
                        {/* Show image preview */}
                        {file.name.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={key}
                            className="w-full h-40 object-cover rounded-md border"
                          />
                        ) : file.name.match(/\.(pdf)$/i) ? (
                          // Show embedded PDF for preview
                          <iframe
                            src={URL.createObjectURL(file)}
                            title={key}
                            className="w-full h-40 border rounded-md"
                          />
                        ) : (
                          <div className="text-gray-500 italic">Cannot preview this file type</div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No document available</p>
                    )}

                    {/* View/Download Button */}
                    {file instanceof File ? (
                      <a
                        href={URL.createObjectURL(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-black px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                      >
                        View/Download
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm cursor-not-allowed"
                      >
                        No File
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No documents uploaded</p>
            )}
          </div>
        </div>




        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between no-print">
          {onPrev && (
            <button onClick={onPrev} className="px-4 py-2 rounded-md bg-[#2e3653] text-white hover:bg-[#3a4266] transition">
              Edit Details
            </button>
          )}
          <button onClick={onNext} className="px-4 py-2 rounded-md transition bg-[#FC8939] text-white hover:bg-[#e57830] cursor-pointer">
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}