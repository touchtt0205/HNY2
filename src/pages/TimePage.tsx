// src/components/TimeElapsedPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TimeElapsedPage.css"; // Import the CSS file
import image from "../assets/test.jpg";

const TimePage: React.FC = () => {
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date("2022-11-22T00:00:00Z");
    const interval = setInterval(() => {
      const now = new Date();
      const elapsedTime = Math.floor(
        (now.getTime() - startDate.getTime()) / 1000
      );

      const days = Math.floor(elapsedTime / 86400);
      const hours = Math.floor((elapsedTime % 86400) / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      const seconds = elapsedTime % 60;

      setTimeElapsed({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="time-elapsed-page">
      <h1 className="title">The time we spend together?</h1>

      <div className="content-container">
        <img src={image} alt="Description" className="corner-image" />
        <div className="description">
          This is a beautiful description of our time together.
        </div>

        <div className="time-display">
          <div className="time-labels">
            <div>day</div>
            <div>hour</div>
            <div>minute</div>
            <div>second</div>
          </div>
          <div className="time-values">
            <div>{timeElapsed.days.toString().padStart(3, "0")}</div>
            <div>{timeElapsed.hours.toString().padStart(2, "0")}</div>
            <div>{timeElapsed.minutes.toString().padStart(2, "0")}</div>
            <div>{timeElapsed.seconds.toString().padStart(2, "0")}</div>
          </div>
        </div>
      </div>

      <button className="back-button" onClick={handleBack}>
        x
      </button>
    </div>
  );
};

export default TimePage;
