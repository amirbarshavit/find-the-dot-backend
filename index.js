const PORT = 3333;

const express = require("express");
const cors = require("cors");
const leaderBoardController = require("./controllers/leaderBoardController");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/update-user", async (req, res) => {
  const userDetails = req.body.data;
  await leaderBoardController.updateUserScore(userDetails);
  res.send();
});

app.get("/score-board", async (req, res) => {
  const data = await leaderBoardController.getScoreBoard();
  res.send({ data });
});

app.listen(PORT, () => {
  console.log("Server has started! on port:", PORT);
});
