const { Router } = require("express");
const SessionsRouter = require("./sessions");

const router = Router();

router.use("/sessions", SessionsRouter);

module.exports = router;
