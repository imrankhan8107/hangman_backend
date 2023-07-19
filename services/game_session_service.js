const maxLives = 6;

async function markGameCompleted(gameSession) {
  const gameSessionWord = await gameSession.getWord();
  

  const actualWord = await gameSessionWord.title;
  const playedLetters = await gameSession.playedLetters.split("");

  const word_set = new Set([...actualWord]);
  const played_set = new Set([...playedLetters]);
  const wrong_letters = playedLetters.filter((letter) => !word_set.has(letter));

  const isWon = [...word_set].reduce((acc, letter) => {
    if (!played_set.has(letter)) return false;
    return acc;
  }, true);

  const lives = maxLives - wrong_letters.length;
  if (lives == 0 || isWon) {
    gameSession.endedAt = new Date();
    await gameSession.save();
  }
}

async function playedWordInGameSession(gameSession, letter) {
  const playedLetters = await gameSession.playedLetters.split("");
  const played_set = new Set([...playedLetters]);
  if (played_set.has(letter)) {
    return;
  }

  playedLetters.push(letter);
  gameSession.playedLetters = playedLetters.join("");
  await gameSession.save();
  await markGameCompleted(gameSession);
}

module.exports = {
  playedWordInGameSession,
};
