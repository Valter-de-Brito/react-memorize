import React, { useState, useEffect } from "react";

import "./Memorize.css";

interface ICard {
  id: number;
  content: string;
  isFaceUp: boolean;
}

const Memorize = () => {
  const cards: ICard[] = [];
  const [score, setScore] = useState(0);
  //const [isFaceUp, setIsFaceUp] = useState(false);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);

  const emoji = ["💘", "🚂", "🏹", "🤞"];
  const [card, setCard] = useState<ICard[]>(() => {
    for (let index = 0; index < emoji.length; index++) {
      let content = emoji[index];
      cards.push({ id: index * 2, content, isFaceUp: false });
      cards.push({ id: index * 2 + 1, content, isFaceUp: false });
    }

    return cards;
  });

  useEffect(() => {}, []);

  function handleCellClick(id: number) {
    const alreadySelected = selectedCars.findIndex((cardId) => cardId === id);

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

    //console.log(selectedCars.length);

    selectedCars.map((item) => console.log(item));

    /*if (alreadySelected >= 0) {
      //setSelectedCars([id]);
      //return;
    } else {
      setSelectedCars([...selectedCars, id]);
      setCard(
        card.map((item) =>
          item.id === id ? { ...item, isFaceUp: true } : item
        )
      );
    }

    if (selectedCars.length === 1) {
      console.log(selectedCars[0]);
      console.log(selectedCars[1]);

      const card1 = card.filter((item) => item.id === selectedCars[0]);

      const card2 = card.filter((item) => item.id === selectedCars[1]);
      //console.log([card1, card2]);
    }*/
  }

  return (
    <main>
      <h1 className="title-base title">Memorize</h1>

      <div className="board">
        {card.map((item, index) => (
          <div
            key={index}
            className="cell"
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
