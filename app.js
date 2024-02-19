const express = require("express");
const Router = require("./routes");
const { sequelize, Word } = require("./models");

async function initialize() {
  const app = express();

  app.use(express.json());
  const PORT = process.env.PORT || 8000;

  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", [
      "https://hangman-frontend-seven.vercel.app",
      // "http://localhost:3000",
    ]);
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
  });

  app.use("/api", Router);

  app.get("/cookie", (req, res) => {
    res.setHeader("Set-Cookie", "name=Hangman App");
    res.send("Hello World");
  });
  // await Word.bulkCreate([
  //   { title: "apple" },
  //   { title: "banana" },
  //   { title: "orange" },
  //   { title: "mango" },
  //   { title: "grapes" },
  //   { title: "pineapple" },
  //   { title: "strawberry" },
  //   { title: "blueberry" },
  //   { title: "watermelon" },
  //   { title: "kiwi" },
  //   { title: "papaya" },
  //   { title: "pear" },
  //   { title: "peach" },
  //   { title: "pomegranate" },
  // ]);
  await sequelize.sync();
  // Run only once as it will create duplicate entries
  // await Word.bulkCreate([
  //   { title: "apple" },
  //   { title: "banana" },
  //   { title: "orange" },
  //   { title: "mango" },
  //   { title: "grapes" },
  //   { title: "pineapple" },
  //   { title: "strawberry" },
  //   { title: "blueberry" },
  //   { title: "watermelon" },
  //   { title: "kiwi" },
  //   { title: "papaya" },
  //   { title: "pear" },
  //   { title: "peach" },
  //   { title: "pomegranate" },
  // ]);
  app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`);
  });
}

initialize();
