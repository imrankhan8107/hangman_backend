const { Word, GameSession, sequelize } = require("../../models");
const { serializeGameSession } = require("../../serializers/gamesession");
const gameSessionService = require("../../services/game_session_service");

async function CreateSession(req, res) {
  const name = req.body.name;
  console.log(req.body);

  const word = await Word.findOne({ order: sequelize.random() });
  const gameSession = await GameSession.create({
    player_name: name,
    playedLetters: "",
    wordId: word.id,
    startedAt: new Date(),
  });
  console.log(word.title);

  res.json(await serializeGameSession(gameSession));
}

async function PlaySession(req, res) {
  const gameId = req.params.id;
  const letter = req.body.letter;

  console.log(letter);

  // TODO: do something with letter
  const gameSession = await GameSession.findByPk(gameId);

  await gameSessionService.playedWordInGameSession(gameSession, letter);

  res.json(await serializeGameSession(gameSession));
}

module.exports = {
  CreateSession,
  PlaySession,
};
