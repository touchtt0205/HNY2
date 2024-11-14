// src/pages/WishPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WishCard from "../components/WishCard";
import "./WishPage.css";

interface Card {
  id: number;
  isOpen: boolean;
  wish?: string;
  used: boolean;
}

const initializeCards = (): Card[] => {
  const savedCards = localStorage.getItem("cards");
  
  if (savedCards) {
    const parsedCards = JSON.parse(savedCards);
    if (parsedCards.length !== 6) {
      localStorage.removeItem("cards");
      return Array.from({ length: 6 }, (_, i) => ({
        id: i,
        isOpen: false,
        wish: undefined,
        used: false,
      }));
    }
    return parsedCards;
  }
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    isOpen: false,
    wish: undefined,
    used: false,
  }));
};

const WishPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initializeCards());
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleCardClick = (id: number) => {
    setCards((prevCards) =>
      prevCards.map(
        (card) => (card.id === id ? { ...card, isOpen: !card.isOpen } : card)
      )
    );
  };

  const handleWishSubmit = (id: number, wish: string) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, wish, used: true, isOpen: false } : card
    );
    setCards(updatedCards);
  };

  const handleBack = () => {
    navigate(-1);
  };
  // Function to reset cards and clear localStorage
  // const handleReset = () => {
  //   const initialCards = Array.from({ length: 6 }, (_, i) => ({
  //     id: i,
  //     isOpen: false,
  //     wish: undefined,
  //     used: false,
  //   }));
  //   setCards(initialCards);
  //   localStorage.removeItem("cards"); // Clear localStorage
  // };
  return (
    <div className="wish-page-wrapper">
      <h1>Honey, any wishes?</h1>

      <div className="card-container">
        {cards.map((card) => (
          <WishCard
            key={card.id}
            id={card.id}
            isOpen={card.isOpen}
            wish={card.wish}
            used={card.used}
            onCardClick={handleCardClick}
            onWishSubmit={handleWishSubmit}
            onClose={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {/* <button onClick={handleReset} className="reset-button">
        Reset Wishes
      </button> */}
      <button className="back-button" onClick={handleBack}>
        x
      </button>
    </div>
  );
};

export default WishPage;
