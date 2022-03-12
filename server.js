const koa = require("koa");
const koaRouter = require("koa-router");
const json = require("koa-json");

const app = new koa();
const router = new koaRouter();

app.use(json());

router.get("/", async (ctx) => {
    ctx.body = "Hello world";
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234);
console.log("Application is running on http://localhost:1234");