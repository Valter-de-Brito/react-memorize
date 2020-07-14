import shuffle from "lodash.shuffle";
import EmojisArray from "./emojis";

interface ICard {
  id: number;
  content: string;
  isFaceUp: boolean;
  isMatched: boolean;
}

const loadBoard = (numCard: number): ICard[] => {
  const emojisArray = EmojisArray();
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
};

export default loadBoard;
