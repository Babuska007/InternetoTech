const { v4: uuidv4 } = require("uuid");
const words = require("../utils/wordList");

let games = [];

const createGame = (req, res) => {
  const word = words[Math.floor(Math.random() * words.length)];
  const game = {
    id: uuidv4(),
    word,
    guessedLetters: [],
    remainingAttempts: 6,
    status: "ongoing",
    player: req.headers["x-player-name"] || "anonymous",
    difficulty: req.query.difficulty || "normal"
  };
  games.push(game);
  res.status(201).json({ id: game.id });
};

const getGame = (req, res) => {
  const game = games.find(g => g.id === req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });

  const maskedWord = game.word.split("").map(letter =>
    game.guessedLetters.includes(letter) ? letter : "_"
  ).join("");

  res.json({ ...game, maskedWord });
};

const makeGuess = (req, res) => {
  const { letter } = req.body;
  const game = games.find(g => g.id === req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });

  if (game.status !== "ongoing") return res.status(400).json({ error: "Game already finished" });

  if (game.guessedLetters.includes(letter)) return res.status(400).json({ error: "Letter already guessed" });

  game.guessedLetters.push(letter);

  if (!game.word.includes(letter)) {
    game.remainingAttempts -= 1;
  }

  if (game.word.split("").every(l => game.guessedLetters.includes(l))) {
    game.status = "won";
  } else if (game.remainingAttempts <= 0) {
    game.status = "lost";
  }

  res.json({ message: "Guess registered", game });
};

const deleteGame = (req, res) => {
  games = games.filter(g => g.id !== req.params.id);
  res.json({ message: "Game deleted" });
};

module.exports = { createGame, getGame, makeGuess, deleteGame };
