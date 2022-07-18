const { MongoClient } = require("mongodb");
const uri = process.env.DB_URI;

const client = new MongoClient(uri);

const init = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
};

const getUserByName = async (userName) => {
  try {
    const user = await client
      .db("users")
      .collection("score")
      .findOne({ name: userName });
    return user;
  } catch (e) {
    console.log(e);
  }
};

const updateUserScore = async (userDetails) => {
  try {
    await client
      .db("users")
      .collection("score")
      .updateOne(
        { name: userDetails.name },
        {
          $set: { name: userDetails.name, score: userDetails.score },
        }
      );
  } catch (e) {
    console.error(e);
  }
};

const addNewUser = async (userDetails) => {
  await client.db("users").collection("score").insertOne(userDetails);
};

const getScoreBoard = async () => {
  try {
    const data = await client
      .db("users")
      .collection("score")
      .find({})
      .sort({ score: -1 });
    const res = await data.toArray();
    return res;
  } catch (e) {
    console.error(e);
  }
};

init();
module.exports = {
  updateUserScore,
  getScoreBoard,
  getUserByName,
  addNewUser,
};
