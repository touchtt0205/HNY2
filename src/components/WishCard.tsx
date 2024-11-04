// src/components/WishCard.tsx
import React, { useState } from "react";
import "./WishCard.css"; // นำเข้า CSS ของ WishCard

interface WishCardProps {
  id: number;
  isOpen: boolean;
  wish?: string; // อนุญาตให้มีค่าเป็น undefined
  used: boolean;
  onCardClick: (id: number) => void;
  onWishSubmit: (id: number, wish: string) => void;
  onClose: (id: number) => void; // ฟังก์ชันสำหรับปิดการ์ด
}

const WishCard: React.FC<WishCardProps> = ({
  id,
  isOpen,
  wish,
  used,
  onCardClick,
  onWishSubmit,
  onClose,
}) => {
  const [currentWish, setCurrentWish] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation(); // หยุดการคลิกที่การ์ด
    if (currentWish.trim()) {
      onWishSubmit(id, currentWish); // ส่งคำขอไปยัง App
      setCurrentWish(""); // ล้างช่องกรอก
    }
  };

  const handleCardClick = () => {
    if (isOpen) {
      onClose(id); // ปิดการ์ดถ้าการ์ดเปิดอยู่
    } else {
      onCardClick(id); // เปิดการ์ดถ้ายังปิดอยู่
    }
  };

  return (
    <div
      className={`card ${isOpen ? "open" : ""} ${used ? "used" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-inner">
        {/* ด้านหน้า */}
        <div className="card-front">
          <p className="card-title">Wish {id + 1}</p> {/* แสดงหมายเลขการ์ด */}
        </div>
        {/* ด้านหลัง */}
        <div className="card-back">
          {/* <button className="close-button" onClick={() => onClose(id)}>
            &times; 
          </button> */}
          <div className="wish-content">
            {!used ? (
              <>
                <p>You can make a wish!</p>
                <input
                  type="text"
                  value={currentWish}
                  onChange={(e) => setCurrentWish(e.target.value)}
                  placeholder="Enter your wish"
                  onClick={(e) => e.stopPropagation()} // หยุดการคลิกที่การ์ดเมื่อคลิกที่ช่องกรอก
                />
                <button onClick={handleSubmit}>Submit</button>
              </>
            ) : (
              <p className="wish-text">
                เค้าได้รับคำขอพรแล้ว! <br></br> <strong>{wish}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
