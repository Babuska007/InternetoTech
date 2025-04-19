import axios from "axios";

const API_URL = "http://localhost:5000";

export const createGame = (playerName, difficulty = "normal") =>
  axios.post(`${API_URL}/games?difficulty=${difficulty}`, null, {
    headers: { "X-Player-Name": playerName }
  });

export const getGame = id => axios.get(`${API_URL}/games/${id}`);

export const makeGuess = (id, letter) =>
  axios.post(`${API_URL}/games/${id}/guess`, { letter });
