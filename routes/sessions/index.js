const { Router } = require("express");
const Controller = require("./controller");

const router = Router();

router.post("/", Controller.CreateSession);
router.post("/:id/play", Controller.PlaySession);

module.exports = router;
