import React from "react";
import "./ReviewFormComponent.css"; // Importing the CSS file

export default function ReviewFormComponent() {
  const formData = {
    personalDetails: {
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      studentName: "John M. Doe",
      motherName: "Jane Doe",
      personalEmail: "john.doe@example.com",
      mobileNumber: "1234567890",
      address: "123 Main Street, Cityville",
      dateOfBirth: "2000-01-01",
      birthPlace: "Cityville",
      gender: "Male",
      aadharNumber: "1234-5678-9012",
      category: "General",
      religion: "Christianity",
      nationality: "American",
      domicile: "New York",
      familyIncome: "$50,000",
      ruralUrban: "Urban",
      admissionSource: "Entrance Exam",
      abcID: "ABC123",
      city: "New York",
    },
    programSelection: {
      selectedFaculty: "Engineering",
      selectedInstitute: "XYZ Institute of Technology",
      preferences: [
        { programId: "101", programName: "Computer Science" },
        { programId: "102", programName: "Mechanical Engineering" },
      ],
    },
    educationHistory: [
      {
        level: "High School",
        institution: "Cityville High",
        board: "State Board",
        yearOfPassing: "2018",
        percentage: "85%",
        subjects: "Math, Science, English",
      },
      {
        level: "Senior Secondary",
        institution: "Cityville Senior High",
        board: "State Board",
        yearOfPassing: "2020",
        percentage: "90%",
        subjects: "Physics, Chemistry, Math",
      },
    ],
    eligibilityCriteria: {
      age: "22",
      qualifyingExam: "High School Diploma",
      percentage: "90%",
      entranceExam: "XYZ Entrance Exam",
      entranceScore: "95",
      residency: true,
    },
    uploadDocuments: {
      matricMarksheet: "matric_marksheet.pdf",
      seniorMarksheet: "senior_marksheet.pdf",
      entranceScorecard: "entrance_scorecard.pdf",
      transferCertificate: "transfer_certificate.pdf",
    },
    declaration: {
      agreed: true,
    },
    paymentDetails: {
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    },
  };

  const handleAccept = () => {
    console.log("Form Accepted:", formData);
    alert("Form has been accepted!");
  };

  const handleReject = () => {
    console.log("Form Rejected:", formData);
    alert("Form has been rejected!");
  };

  const formatHeading = (heading) => {
    return heading
      .replace(/([A-Z])/g, " $1") // Add spaces for camelCase keys
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first character
  };

  const renderTableRows = (data) => {
    if (typeof data !== "object" || data === null) return null;

    return Object.entries(data).map(([key, value]) => (
      <tr key={key}>
        <td className="table-heading">{formatHeading(key)}</td>
        <td className="table-value">
          {typeof value === "boolean"
            ? value
              ? "Yes"
              : "No"
            : value === null || value === undefined
            ? "N/A"
            : Array.isArray(value)
            ? value.join(", ")
            : typeof value === "object"
            ? JSON.stringify(value)
            : value}
        </td>
      </tr>
    ));
  };

  return (
    <div className="form-container">
      <h1 className="header-title">MGM University</h1>

      <div className="section">
        <h2 className="section-title">Personal Details</h2>
        <table className="data-table">
          <tbody>{renderTableRows(formData.personalDetails)}</tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Program Selection</h2>
        <table className="data-table">
          <tbody>
            <tr>
              <td className="table-heading">Selected Faculty</td>
              <td className="table-value">
                {formData.programSelection.selectedFaculty || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="table-heading">Selected Institute</td>
              <td className="table-value">
                {formData.programSelection.selectedInstitute || "N/A"}
              </td>
            </tr>
            {formData.programSelection.preferences.map((pref, index) => (
              <tr key={index}>
                <td className="table-heading">Preference {index + 1}</td>
                <td className="table-value">{pref.programName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Education History</h2>
        {formData.educationHistory.map((edu, index) => (
          <div key={index} className="border-box">
            <h3>Level: {edu.level}</h3>
            <table className="data-table">
              <tbody>{renderTableRows(edu)}</tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Eligibility Criteria</h2>
        <table className="data-table">
          <tbody>{renderTableRows(formData.eligibilityCriteria)}</tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Uploaded Documents</h2>
        <table className="data-table">
          <tbody>
            {Object.entries(formData.uploadDocuments).map(([docName, filePath]) => (
              <tr key={docName}>
                <td className="table-heading">{formatHeading(docName)}</td>
                <td className="table-value">
                  <a
                    href={`/${filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    Open Document
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Payment Details</h2>
        <table className="data-table">
          <tbody>{renderTableRows(formData.paymentDetails)}</tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Declaration</h2>
        <p>
          {formData.declaration.agreed
            ? "The student has agreed to the terms."
            : "The student has not agreed to the terms."}
        </p>
      </div>

      <div className="button-container">
        <button type="button" className="accept-button" onClick={handleAccept}>
          Accept
        </button>
        <button type="button" className="reject-button" onClick={handleReject}>
          Reject
        </button>
      </div>
    </div>
  );
}
