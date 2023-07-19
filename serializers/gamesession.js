const { Word } = require("../models");

const maxLives = 6;

async function serializeGameSession(gameSession) {
  const gameSessionWord = await gameSession.getWord();
  
  const actualWord = await gameSessionWord.title;
  const playedLetters = await gameSession.playedLetters.split("");

  const word_set = new Set([...actualWord]);
  const played_set = new Set([...playedLetters]);
  const wrong_letters = playedLetters.filter((letter) => !word_set.has(letter));

  const lives = maxLives - wrong_letters.length;
  const maskedWord = actualWord
    .split("")
    .map((letter) => (played_set.has(letter) ? letter : "_"));
  return {
    id: gameSession.id,
    livesLeft: lives,
    result: !!gameSession.endedAt,
    maskedWord: maskedWord,
  };
}

module.exports = {
  serializeGameSession,
};
