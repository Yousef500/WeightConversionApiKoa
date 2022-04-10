const Router = require("koa-router");
const {registerUser, getUsers, getUserByUsername, loginUser} = require("../services/userService");

const router = new Router();

router.post("/api/users/register", async (ctx) => {
    const body = ctx.request.body;
    const user = await getUserByUsername(body.username);
    if (user) {
        ctx.status = 400;
        ctx.body = {
            message: "Username already exists"
        };
    } else {
        try {
            await registerUser(body);
            ctx.status = 201;
            return ctx.body = '';
        } catch (err) {
            ctx.status = 403;
            return ctx.throw(403, err);
        }
    }
});

router.post('/api/users/login', async (ctx) => {
    const body = ctx.request.body;
    const result = await loginUser(body.username, body.password);
    ctx.status = result.code;
    ctx.body = {
        message: result.message
    };
});

router.get("/api/users", async (ctx) => {
    ctx.body = await getUsers();
});

module.exports = router;