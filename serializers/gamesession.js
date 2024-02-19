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
  if (lives == 0 && maskedWord.join("") !== actualWord) {
    // maskedWord = actualWord.split("");
    result = false;
  } else if (maskedWord.join("") === actualWord) {
    result = true;
  } else {
    result = false;
  }
  // const result = maskedWord.join("") === actualWord && lives > 0;
  return {
    id: gameSession.id,
    livesLeft: lives,
    result: result,
    maskedWord: maskedWord,
  };
}

module.exports = {
  serializeGameSession,
};
