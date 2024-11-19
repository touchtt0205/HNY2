import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EnvelopePage.css";
import song from "../song/spotifydown.com - พบรัก - Live Session.mp3";

const EnvelopePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying] = useState(true);


  const handleBack = () => {
    navigate(-1);
  };

  const handleEnvelopeToggle = () => {
    if (!isEnvelopeOpened) {
      setIsEnvelopeOpened(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEnvelope = () => {
    setIsEnvelopeOpened(false);
    setIsModalOpen(false);
  };

  // Close envelope or modal when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      envelopeRef.current &&
      !envelopeRef.current.contains(event.target as Node) &&
      (!modalRef.current || !modalRef.current.contains(event.target as Node))
    ) {
      if (isModalOpen) {
        handleCloseModal();
      } else if (isEnvelopeOpened) {
        handleCloseEnvelope();
      }
    }
  };
  useEffect(() => {
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    if (audio && isPlaying) {
      audio.play().catch((error) => {
        console.log('Auto-play blocked: ', error);
      });
    }
  }, [isPlaying]); // เมื่อ isPlaying เปลี่ยนค่า, useEffect จะทำงานใหม่

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEnvelopeOpened, isModalOpen]);

  return (
    <div className="envelope-page" role="main">
      
      <div
        className={`envelope-wrapper ${isEnvelopeOpened ? "flap" : ""}`}
        aria-label="Envelope containing a letter"
        ref={envelopeRef}
        onClick={handleEnvelopeToggle}
      >
        
        <div className="envelope">
          
          <div className="letter">
            <div className="text-enve">
            <h2>ถึงน้องเนสตัวจิ๋ว,</h2>
            <p>ก่อนอื่นไม่มีไรมาก พูดไม่เก่งแต่ลองอ่านดู วันนี้วันราย วันครบรอบช่ายม้ายยยยย 
                ผ่านไปแล้ว 2 ปี เป็นไงบ้าง ส่วนเรานั้น แฮปปี้สุดๆ เป็นรักที่ไม่ทำให้เหนื่อยเลย 
                มีความสุขมากๆ เราไม่เน้นพูดซึ้ง เราชอบบอกตรงๆ รักก็คือรัก หลังก็คือหลง แฮร่ 
                ก็ตามนั้นแหละ ผ่านมาจนถึงวันนี้ มันคงไ่มีอะไรจะต้องพูดแล้ว 
                ออ มีอยู่ พูดคำว่ารัก
              </p>
              
            </div>
          </div>
        </div>
        <div className="heart"></div>
      </div>

      {isModalOpen && (
        <div className="letter-modal" ref={modalRef}>
          <div className="modal-content">
            <button 
              className="close-modal-button" 
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="modal-text">
              <h2>ถึงน้องเนสตัวจิ๋ว,</h2>
              
              <p>ก่อนอื่นไม่มีไรมาก พูดไม่เก่งแต่ลองอ่านดู วันนี้วันราย วันครบรอบช่ายม้ายยยยย 
                ผ่านไปแล้ว 2 ปี เป็นไงบ้าง ส่วนเรานั้น แฮปปี้สุดๆ เป็นรักที่ไม่ทำให้เหนื่อยเลย 
                มีความสุขมากๆ เราไม่เน้นพูดซึ้ง เราชอบบอกตรงๆ รักก็คือรัก หลังก็คือหลง แฮร่ 
                ก็ตามนั้นแหละ ผ่านมาจนถึงวันนี้ มันคงไ่มีอะไรจะต้องพูดแล้ว 
                ออ มีอยู่ พูดคำว่ารัก
              </p>
              
              <p>สุดท้ายละ พิมพ์ยาวเกิน เดี๋ยวไม่โรแมนติก 5555 ทุกๆวันนี้เราคงไม่มีใครที่จะเพอร์เฟคไปหมด 
                มีทะเลาะมีงอนกันเป็นธรรมดา แต่อยากใ้ห้รู้ไว้ มีอะไร คุยกัน ปรับความเข้าใจกัน อยู่ด้วยกันตลอดไปนะ 
              </p>
              <p className="modal-signature">รักเสมอ รักที่สุด และตลอดไป</p>
            </div>
          </div>
        </div>
      )}

    <div className="enve-title mb-5 text-center p-3"  style={{ fontSize: 'calc(1em + 4vmin)' }}>
        {!isEnvelopeOpened 
          ? "จดหมายคร้าบบบ" 
          : (!isModalOpen 
            ? "กดก่อน มีของดีข้างใน!" 
            : "I love you!")}
      </div>

      {/* Audio Player - no controls, hidden */}
      <div className="audio-player">
        <audio 
          id="audio-player" 
          autoPlay 
          loop 
          style={{ display: 'none' }} // Hide the audio player completely
        >
          <source src={song} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Vinyl Record Animation */}
      <div className="vinyl-record">
        <div className={`record ${isPlaying ? 'spinning' : ''}`}></div>
      </div>

      <button 
        className="back-button-enve" 
        onClick={handleBack} 
        aria-label="Go back"
      >
        <svg viewBox="0 0 2050 2050" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24" height="24">
          <path d="M1582.2,1488.7a44.9,44.9,0,0,1-36.4-18.5l-75.7-103.9A431.7,431.7,0,0,0,1121.4,1189h-60.1v64c0,59.8-33.5,112.9-87.5,138.6a152.1,152.1,0,0,1-162.7-19.4l-331.5-269a153.5,153.5,0,0,1,0-238.4l331.5-269a152.1,152.1,0,0,1,162.7-19.4c54,25.7,87.5,78.8,87.5,138.6v98.3l161,19.6a460.9,460.9,0,0,1,404.9,457.4v153.4a45,45,0,0,1-45,45Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default EnvelopePage;