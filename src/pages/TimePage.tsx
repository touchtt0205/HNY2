// src/components/TimeElapsedPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TimeElapsedPage.css"; // Import the CSS file
import image from "../image/nest.png";

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
      <h1 className="home-title text-center mb-5" style={{ fontSize: 'calc(1em + 5vmin)' }}>
        How long we've been together?
      </h1>

      <div className="content-container">
        <img src={image} alt="Description" className="corner-image" />
        {/* <div className="description">
        The time since that day until today
        </div> */}

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

      <button className="back-button-time" onClick={handleBack}>
        <svg viewBox="0 0 2050 2050" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24" height="24">
          <path d="M1582.2,1488.7a44.9,44.9,0,0,1-36.4-18.5l-75.7-103.9A431.7,431.7,0,0,0,1121.4,1189h-60.1v64c0,59.8-33.5,112.9-87.5,138.6a152.1,152.1,0,0,1-162.7-19.4l-331.5-269a153.5,153.5,0,0,1,0-238.4l331.5-269a152.1,152.1,0,0,1,162.7-19.4c54,25.7,87.5,78.8,87.5,138.6v98.3l161,19.6a460.9,460.9,0,0,1,404.9,457.4v153.4a45,45,0,0,1-45,45Z"></path>
        </svg>
      </button>

    </div>
  );
};

export default TimePage;
