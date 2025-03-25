import React from "react";

interface Props {
  onAccept: (formData: any) => void;
  onReject: (formData: any) => void;
}

const ReviewFormComponent: React.FC<Props> = ({ onAccept, onReject }) => {
  const formData = {
    personalDetails: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    },
  };

  const handleAccept = () => {
    console.log("Accept Button Clicked");
    onAccept(formData); // Send form data to parent
  };

  const handleReject = () => {
    console.log("Reject Button Clicked");
    onReject(formData); // Send form data to parent
  };

  return (
    <div>
      <h2>Review Form</h2>
      <p>Name: {formData.personalDetails.firstName} {formData.personalDetails.lastName}</p>
      <p>Email: {formData.personalDetails.email}</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default ReviewFormComponent;
