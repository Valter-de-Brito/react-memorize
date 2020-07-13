import React from "react";

interface ICard {
  id: number;
  content: string;
  isFaceUp: boolean;
  isMatched: boolean;
}

interface IProps {
  card: ICard;
  handleCellClick: (id: number) => void;
}

const Card: React.FC<IProps> = ({ card, handleCellClick }: IProps) => {
  return (
    <div
      className={card.isMatched ? "cell matched" : "cell"}
      onClick={() => handleCellClick(card.id)}
    >
      {
        <div
          className={
            card.isFaceUp
              ? card.isMatched && card.isFaceUp
                ? "down"
                : "up"
              : "down"
          }
        >
          {card.content}
        </div>
      }
    </div>
  );
};

export default Card;
