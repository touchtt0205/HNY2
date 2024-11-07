// src/pages/Moment.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Moment: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="moment">
      <h1>Moments</h1>
      <p>This is the Moments page.</p>
      {/* Add your content and styles here */}
      <button className="back-button" onClick={handleBack}>
        x
      </button>
    </div>
  );
};

export default Moment;
