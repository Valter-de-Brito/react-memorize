import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import EmojisArray from "./utils/emojis";

import "./Memorize.css";

import Card from "./components/Card";

const NumCardOnTable = 2;

interface ICard {
  id: number;
  content: string;
  isFaceUp: boolean;
  isMatched: boolean;
}

const Memorize: React.FC = () => {
  const [score, setScore] = useState(0);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);

  const emojisArray = EmojisArray();

  const [card, setCard] = useState<ICard[]>(() => loadBoard(NumCardOnTable));

  function loadBoard(numCard: number): ICard[] {
    let cards: ICard[] = [];

    for (let index = 0; index < numCard; index++) {
      const indexEmoji = Math.floor(Math.random() * emojisArray.length);
      const content = emojisArray.splice(indexEmoji, 1)[0];

      cards.push({ id: index * 2, content, isFaceUp: false, isMatched: false });
      cards.push({
        id: index * 2 + 1,
        content,
        isFaceUp: false,
        isMatched: false,
      });
    }

    return shuffle(cards);
  }

  useEffect(() => {
    if (selectedCars.length === 2) {
      console.log("2 no array");

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

  function handleCellClick(id: number) {
    const cardIndex = card.findIndex((item) => item.id === id);

    const [isMatched] = card.filter((itemCard) => itemCard.id === id);
    const alreadySelected = selectedCars.findIndex(
      (cardId) => cardId === cardIndex
    );

    if (isMatched.isMatched === true || alreadySelected !== -1) return;

    setSelectedCars([...selectedCars, cardIndex]);
    setCard(
      card.map((item) => (item.id === id ? { ...item, isFaceUp: true } : item))
    );
  }

  function resetGame() {
    setCard(loadBoard(NumCardOnTable));
    setSelectedCars([]);
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
