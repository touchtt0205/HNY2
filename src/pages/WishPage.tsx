// src/pages/WishPage.tsx
import React, { useState, useEffect } from "react";
import WishCard from "../components/WishCard";

interface Card {
  id: number;
  isOpen: boolean;
  wish?: string;
  used: boolean;
}

// Function to initialize the cards with local storage data
const initializeCards = (): Card[] => {
  const savedCards = localStorage.getItem("cards");
  if (savedCards) {
    return JSON.parse(savedCards);
  }
  return Array.from({ length: 9 }, (_, i) => ({
    id: i,
    isOpen: false,
    wish: undefined,
    used: false,
  }));
};

const WishPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initializeCards());

  // Effect to save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleCardClick = (id: number) => {
    setCards((prevCards) =>
      prevCards.map(
        (card) => (card.id === id ? { ...card, isOpen: !card.isOpen } : card) // Toggle isOpen
      )
    );
  };

  const handleWishSubmit = (id: number, wish: string) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, wish, used: true, isOpen: false } : card
    );
    setCards(updatedCards); // Update state
  };

  // Function to reset cards and clear localStorage
  const handleReset = () => {
    const initialCards = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      isOpen: false,
      wish: undefined,
      used: false,
    }));
    setCards(initialCards);
    localStorage.removeItem("cards"); // Clear localStorage
  };

  return (
    <div className="wish-page">
      <h1>Make a Wish!</h1>

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
      <button onClick={handleReset} className="reset-button">
        Reset Wishes
      </button>
    </div>
  );
};

export default WishPage;
