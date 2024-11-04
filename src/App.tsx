// src/App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import WishCard from "./components/WishCard";

interface Card {
  id: number;
  isOpen: boolean;
  wish?: string; // คำขอที่ผู้ใช้กรอก
  used: boolean; // เช็คว่าการ์ดนี้ถูกใช้แล้วหรือไม่
}

const initialCards: Card[] = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  isOpen: false,
  wish: undefined, // เริ่มต้นคำขอเป็น undefined
  used: false,
}));

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  // โหลดการ์ดจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      setCards(parsedCards);
    }
  }, []);

  const handleCardClick = (id: number) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, isOpen: true } : card))
    );
  };

  const handleWishSubmit = (id: number, wish: string) => {
    const updatedCards = cards.map(
      (card) =>
        card.id === id ? { ...card, wish, used: true, isOpen: true } : card // ตั้ง isOpen เป็น true เพื่อให้การ์ดยังเปิดหลังส่งคำขอ
    );

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards)); // บันทึกการ์ดลง localStorage
  };

  const handleReset = () => {
    setCards(initialCards);
    localStorage.removeItem("cards"); // ลบการ์ดออกจาก localStorage
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Happy 2nd Anniversary!</h1>
        <div className="card-container">
          {cards.map((card) => (
            <WishCard
              key={card.id}
              id={card.id}
              isOpen={card.isOpen}
              wish={card.wish} // ส่งคำขอไปยังการ์ด
              used={card.used}
              onCardClick={handleCardClick}
              onWishSubmit={handleWishSubmit}
            />
          ))}
        </div>
        <button className="reset-button" onClick={handleReset}>
          Reset Wishes
        </button>
      </header>
    </div>
  );
};

export default App;
