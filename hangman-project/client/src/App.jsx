import React, { useState } from "react";
import { createGame } from "./api/gameApi";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [gameId, setGameId] = useState(null);
  const [name, setName] = useState("");

  const startGame = () => {
    createGame(name).then(res => setGameId(res.data.id));
  };

  return (
    <div>
      {!gameId ? (
        <div>
          <h1>Start Hangman</h1>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Player Name" />
          <button onClick={startGame}>Start</button>
        </div>
      ) : (
        <GameBoard gameId={gameId} />
      )}
    </div>
  );
};

export default App;
