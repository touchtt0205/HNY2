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
      <h1 className="wish-title">Honey, any wishes?</h1>

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
      <button className="back-button-wish" onClick={handleBack}>
      <svg viewBox="0 0 2050 2050" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24" height="24">
          <path d="M1582.2,1488.7a44.9,44.9,0,0,1-36.4-18.5l-75.7-103.9A431.7,431.7,0,0,0,1121.4,1189h-60.1v64c0,59.8-33.5,112.9-87.5,138.6a152.1,152.1,0,0,1-162.7-19.4l-331.5-269a153.5,153.5,0,0,1,0-238.4l331.5-269a152.1,152.1,0,0,1,162.7-19.4c54,25.7,87.5,78.8,87.5,138.6v98.3l161,19.6a460.9,460.9,0,0,1,404.9,457.4v153.4a45,45,0,0,1-45,45Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default WishPage;
