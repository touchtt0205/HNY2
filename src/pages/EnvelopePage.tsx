// src/pages/EnvelopePage.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EnvelopePage.css"; // Import the CSS file for styling

const EnvelopePage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false); // สร้าง state สำหรับติดตามสถานะซองจดหมาย
  const envelopeRef = useRef<HTMLDivElement>(null); // สร้าง ref สำหรับซองจดหมาย

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleEnvelope = () => {
    setIsOpened((prev) => !prev); // เปลี่ยนสถานะเมื่อเปิดหรือปิดซองจดหมาย
  };

  // ฟังก์ชันนี้จะจัดการการคลิกที่พื้นที่อื่น
  const handleClickOutside = (event: MouseEvent) => {
    if (
      envelopeRef.current &&
      !envelopeRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false); // ปิดซองเมื่อคลิกนอกซอง
    }
  };

  // ใช้ useEffect เพื่อเพิ่มและลบ event listener สำหรับการคลิกนอก
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="envelope-page" role="main">
      <div
        className="wrapper"
        aria-label="Envelope containing a letter"
        ref={envelopeRef} // ตั้งค่า ref ที่ซองจดหมาย
        onClick={handleToggleEnvelope}
      >
        <div
          className={`lid one ${isOpened ? "opened" : ""}`}
          aria-hidden="true"
        ></div>
        <div
          className={`lid two ${isOpened ? "opened" : ""}`}
          aria-hidden="true"
        ></div>
        <div className="envelope" aria-hidden="true"></div>
        <div className="letter">
          <p>Dear Baby,</p>
          <p>Happy 2nd Anniversary!</p>
        </div>
      </div>
      <div className="instruction">
        {isOpened ? "I love you!" : "You got mail!"}
      </div>
      <button className="back-button" onClick={handleBack} aria-label="Go back">
        &times;
      </button>
    </div>
  );
};

export default EnvelopePage;
