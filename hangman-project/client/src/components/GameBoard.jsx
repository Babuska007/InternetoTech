import React, { useEffect, useState } from "react";
import { getGame, makeGuess } from "../api/gameApi";

const GameBoard = ({ gameId }) => {
  const [game, setGame] = useState(null);
  const [letter, setLetter] = useState("");

  useEffect(() => {
    getGame(gameId).then(res => setGame(res.data));
  }, [gameId]);

  const handleGuess = () => {
    makeGuess(gameId, letter).then(res => {
      setGame(res.data.game);
      setLetter("");
    });
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h2>Hangman Game</h2>
      <p>Word: {game.maskedWord}</p>
      <p>Guessed: {game.guessedLetters.join(", ")}</p>
      <p>Remaining: {game.remainingAttempts}</p>
      <p>Status: {game.status}</p>
      {game.status === "ongoing" && (
        <>
          <input value={letter} onChange={e => setLetter(e.target.value)} maxLength={1} />
          <button onClick={handleGuess}>Guess</button>
        </>
      )}
    </div>
  );
};

export default GameBoard;
