const bcrypt = require('bcrypt');
const Users = require("../services/mongoClientService").db("WeightConversion").collection("Users");

const registerUser = async (body) => {
  await bcrypt.hash(body.password, 10, async (hashErr, hash) => {
    if (hashErr) {
      return hashErr
    }
    try {
      await Users.insertOne({
        ...body,
        password: hash
      });
    } catch (e) {
      return e;
    }
  });
}

const getUsers = async () => {
  return await Users.find().toArray();
}

const getUserByUsername = async (username) => {
  return await Users.findOne({ username });
}

const loginUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) {
    return { code: 404, message: "No such user exists" };
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return { code: 200, message: "Logged in successfully" };
    } else {
      return { code: 404, message: "Please check your credentials" };
    }
  }
}

module.exports = { registerUser, getUsers, getUserByUsername, loginUser };
