const dbAdapter = require("../adapters/mongoDbAdapter");
const updateUserScore = async (userDetails) => {
  const user = await dbAdapter.getUserByName(userDetails.name);

  if (!user) {
    dbAdapter.addNewUser(userDetails);
    return;
  }
  if (user.score < userDetails.score) {
    await dbAdapter.updateUserScore(userDetails);
  }
};

const getScoreBoard = async () => {
  const leaderBoard = await dbAdapter.getScoreBoard();
  return leaderBoard;
};
module.exports = {
  updateUserScore,
  getScoreBoard,
};
