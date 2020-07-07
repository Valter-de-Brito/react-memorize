import React, { useState, useEffect } from "react";

import "./Memorize.css";

interface ICard {
  id: number;
  content: string;
  isFaceUp: boolean;
  isMatched: boolean;
}

const Memorize = () => {
  const cards: ICard[] = [];
  const [score, setScore] = useState(0);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);

  const emoji = ["💘", "🚂", "🏹", "🤞"];
  const [card, setCard] = useState<ICard[]>(() => {
    for (let index = 0; index < emoji.length; index++) {
      let content = emoji[index];
      cards.push({ id: index * 2, content, isFaceUp: false, isMatched: false });
      cards.push({
        id: index * 2 + 1,
        content,
        isFaceUp: false,
        isMatched: false,
      });
    }

    return cards;
  });

  useEffect(() => {
    console.log(selectedCars);

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

  function handleCellClick(id: number) {
    const alreadySelected = selectedCars.findIndex((cardId) => cardId === id);
    const [isMatched] = card.filter((itemCard) => itemCard.id === id);

    if (isMatched.isMatched !== true) {
      if (alreadySelected !== -1) {
        return;
      } else {
        setSelectedCars([...selectedCars, id]);
        setCard(
          card.map((item) =>
            item.id === id ? { ...item, isFaceUp: true } : item
          )
        );
      }
    }
  }

  return (
    <main>
      <h1 className="title-base title">Memorize</h1>

      <div className="board">
        {card.map((item, index) => (
          <div
            key={index}
            className={item.isMatched ? "cell matched" : "cell"}
            onClick={() => handleCellClick(item.id)}
          >
            {item.isFaceUp && item.content}
          </div>
        ))}
      </div>

      <h1 className="title-base footer">Score: {score}</h1>
    </main>
  );
};

export default Memorize;
