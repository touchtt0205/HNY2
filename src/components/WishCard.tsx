// src/components/WishCard.tsx
import React, { useState } from "react";

interface WishCardProps {
  id: number;
  isOpen: boolean;
  wish?: string; // อนุญาตให้มีค่าเป็น undefined
  used: boolean;
  onCardClick: (id: number) => void;
  onWishSubmit: (id: number, wish: string) => void;
}

const WishCard: React.FC<WishCardProps> = ({
  id,
  isOpen,
  wish,
  used,
  onCardClick,
  onWishSubmit,
}) => {
  const [currentWish, setCurrentWish] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation(); // หยุดการคลิกที่การ์ด
    if (currentWish.trim()) {
      // ตรวจสอบว่ามีการกรอกข้อความ
      onWishSubmit(id, currentWish); // ส่งคำขอไปยัง App
      setCurrentWish(""); // ล้างช่องกรอก
    }
  };

  return (
    <div
      className={`card ${isOpen ? "open" : ""} ${used ? "used" : ""}`}
      onClick={() => !isOpen && !used && onCardClick(id)}
    >
      {isOpen ? (
        <div className="card-content">
          {!used ? (
            <>
              <p>You can make a wish!</p>
              <input
                type="text"
                value={currentWish}
                onChange={(e) => setCurrentWish(e.target.value)}
                placeholder="Enter your wish"
              />
              <button onClick={handleSubmit}>Submit</button>
            </>
          ) : (
            <p>
              เค้าได้รับคำขอพรแล้ว! <br></br> <strong>{wish}</strong>
            </p> // แสดงคำขอที่ถูกส่ง
          )}
        </div>
      ) : (
        <p>Card {id + 1}</p> // แสดงหมายเลขการ์ด
      )}
    </div>
  );
};

export default WishCard;
