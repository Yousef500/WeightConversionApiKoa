const Router = require("koa-router");

const router = new Router();

router.get("/test", async (ctx) => {
  ctx.body = "Test page";
});

module.exports = router;
