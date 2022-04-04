const Router = require("koa-router");
const records = require('../services/mongoClientService').db('WeightConversion').collection('WeightHistory');

const router = new Router();

router.get("/api", async (ctx) => {
    ctx.body = "Hello world";
});


router.get("/api/weights", async (ctx) => {
    const weights = await records.find();
    ctx.body = await weights.toArray();
});

module.exports = router;