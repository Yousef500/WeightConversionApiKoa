const Router = require("Koa-router");
const Users = require("../services/mongoClientService").db("WeightConversion").collection("Users");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/api/users/register", async (ctx) => {
    const body = ctx.request.body;
    const user = await Users.findOne({username: body.username});
    if (user) {
        ctx.status = 400;
        ctx.body = {
            message: "Username already exists"
        };
    } else {
        await bcrypt.hash(body.password, 10, async (hashErr, hash) => {
            if (hashErr) {
                ctx.status = 403;
                return ctx.throw(403, hashErr.toString());
            }
            try {
                await Users.insertOne({
                    ...body,
                    password: hash
                });
                ctx.status = 201;
                ctx.body = "";
            } catch (e) {
                ctx.status = 403;
                ctx.throw(403, e.toString());
            }
        });

    }


    // await db.collection("Users").insertOne({
    //     ...user,
    //     password: hashedPassword
    // });
});

router.get("/api/users", async (ctx) => {
    const users = await db.collection("Users").find();
    ctx.body = await users.toArray();
});

module.exports = router;