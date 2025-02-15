import React, { useState, useEffect } from "react";

const symbols = [
  { pair: "b/d", correct: "b", hint: "bat" },
  { pair: "p/q", correct: "p", hint: "pen" },
  { pair: "6/9", correct: "6", hint: "six" },
  { pair: "n/u", correct: "n", hint: "net" },
  { pair: "m/w", correct: "m", hint: "moon" },
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];

const FlipMatchGame = () => {
  const gridSize = 4;
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const startGame = () => {
    let duplicatedSymbols = symbols
      .slice(0, (gridSize * gridSize) / 2)
      .flatMap((s) => [s, s]);
    shuffle(duplicatedSymbols);
    setCards(
      duplicatedSymbols.map((symbolData, index) => ({
        id: index,
        symbol:
          typeof symbolData === "object" ? symbolData.correct : symbolData,
        hint: typeof symbolData === "object" ? symbolData.hint : "",
        flipped: false,
        matched: false,
      })),
    );
    setFlippedCards([]);
    setMatchedCount(0);
  };

  const flipCard = (id) => {
    if (
      flippedCards.length === 2 ||
      cards.find((card) => card.id === id).matched
    )
      return;
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card,
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 800);
    }
  }, [flippedCards]);

  const checkForMatch = () => {
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (firstCard.symbol === secondCard.symbol) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.symbol === firstCard.symbol ? { ...card, matched: true } : card,
        ),
      );
      setMatchedCount(matchedCount + 2);
    } else {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, flipped: false }
            : card,
        ),
      );
    }
    setFlippedCards([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-5">
      <h1 className="text-3xl font-bold text-gray-800">
        Flip and Match - Dyslexia Friendly
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-24 h-24 flex items-center justify-center border-2 rounded-lg text-2xl font-bold cursor-pointer transition-transform transform ${card.flipped ? "bg-blue-200" : "bg-white"} ${card.matched ? "bg-green-300 border-green-500" : "border-blue-400"}`}
            onClick={() => flipCard(card.id)}
          >
            {card.flipped || card.matched ? (
              <span
                className={`${card.matched ? "text-red-500" : "text-black"}`}
              >
                {card.symbol}
              </span>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-5 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={startGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default FlipMatchGame;
