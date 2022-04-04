const Router = require("Koa-router");
const db = require("../services/mongoClientService").db("WeightConversion");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/api/users/register", async (ctx) => {
    const user = ctx.request.body;
    user.password = await bcrypt.hash(user.password, 10);



    // await db.collection("Users").insertOne({
    //     ...user,
    //     password: hashedPassword
    // });

    console.log(user);
});

router.get("/api/users", async (ctx) => {
    const users = await db.collection("Users").find();
    ctx.body = await users.toArray();
});

module.exports = router;