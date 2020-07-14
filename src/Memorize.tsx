import React, { useState, useEffect } from "react";
import loadBoard from "./utils/loadBoard";

import "./Memorize.css";

import Card from "./components/Card";

const NumCardOnTable = 10;

interface ICard {
  id: number;
  content: string;
  isFaceUp: boolean;
  isMatched: boolean;
}

const Memorize: React.FC = () => {
  const [score, setScore] = useState(0);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);

  const initializeBoard = () => loadBoard(NumCardOnTable);
  const [card, setCard] = useState<ICard[]>(initializeBoard);

  useEffect(() => {
    if (selectedCars.length === 2) {
      const isMatched =
        card[selectedCars[0]].content === card[selectedCars[1]].content;

      if (isMatched) {
        card.forEach((element) => {
          if (element.isFaceUp === true) {
            element.isMatched = true;
          }
        });

        setScore(score + 2);
      } else {
        card.forEach((element) => {
          if (element.isFaceUp === true && element.isMatched === false) {
            element.isFaceUp = false;
          }
        });

        setScore(score - 1);
      }

      setSelectedCars([]);
    }
  }, [card, score, selectedCars]);

  function handleCellClick(idCard: number) {
    const cardIndex = card.findIndex((item) => item.id === idCard);
    const alreadySelected = selectedCars.findIndex(
      (index) => index === cardIndex
    );

    if (alreadySelected !== -1) return;

    setSelectedCars([...selectedCars, cardIndex]);
    setCard(
      card.map((item) =>
        item.id === idCard ? { ...item, isFaceUp: true } : item
      )
    );
  }

  function resetGame() {
    setCard(initializeBoard);
    setSelectedCars([]);
    setScore(0);
  }

  return (
    <main>
      <h1 className="title-base title">Memorize</h1>

      <div className="board">
        {card &&
          card.map((card) => (
            <Card key={card.id} card={card} handleCellClick={handleCellClick} />
          ))}
      </div>

      <h1 className="title-base footer">Score: {score}</h1>
      <button onClick={resetGame}>Reset Game</button>
    </main>
  );
};

export default Memorize;
