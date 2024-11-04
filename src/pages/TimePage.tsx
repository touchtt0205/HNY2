// src/components/TimeElapsedPage.tsx
import React, { useEffect, useState } from "react";
import "./TimeElapsedPage.css"; // Import the new CSS file

const TimePage: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date("2022-11-22T00:00:00Z"); // Start date
    const interval = setInterval(() => {
      const now = new Date();
      const elapsedTime = Math.floor(
        (now.getTime() - startDate.getTime()) / 1000 // Convert to seconds
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
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="time-elapsed-page">
      <h1 className="title">How Long Have We Been Together?</h1>
      <div className="time-display">
        <p className="time-text">
          ผ่านมาแล้ว <span className="time-value days">{timeElapsed.days}</span>{" "}
          วัน <span className="time-value hours">{timeElapsed.hours}</span>{" "}
          ชั่วโมง{" "}
          <span className="time-value minutes">{timeElapsed.minutes}</span> นาที{" "}
          <span className="time-value seconds">{timeElapsed.seconds}</span>{" "}
          วินาที
        </p>
      </div>
    </div>
  );
};

export default TimePage;
