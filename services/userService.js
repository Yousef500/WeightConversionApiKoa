const bcrypt = require('bcrypt');
const Users = require("../services/mongoClientService").db("WeightConversion").collection("Users");
const jwt = require('jsonwebtoken');


const registerUser = async (user) => {
    await bcrypt.hash(user.password, 10, async (hashErr, hash) => {
        if (hashErr) {
            return hashErr
        }
        try {
            await Users.insertOne({
                ...user,
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
    return await Users.findOne({username});
}

const loginUser = async (username, password) => {
    const user = await getUserByUsername(username);
    if (!user) {
        return {code: 404, message: "No such user exists"};
    } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const data = {
                iss: process.env.ISSUER,
                aud: process.env.AUDIENCE,
                exp: Math.floor(Date.now() / 1000) * (60),
                nbf: Math.floor(Date.now() / 1000),
                jti: process.env.UNIQUE_IDENTIFIER,
                data: {username: username}
            }

            const encrypted = jwt.sign(data, process.env.PRIVATE_KEY, {algorithm: 'ES512'});

            return {code: 200, message: encrypted};
        } else {
            return {code: 404, message: "Please check your credentials"};
        }
    }
}

module.exports = {registerUser, getUsers, getUserByUsername, loginUser};
