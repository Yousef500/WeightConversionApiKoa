require('dotenv').config();
const koa = require("koa");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const homeController = require('./controllers/homeController');
const testController = require('./controllers/testController');

const app = new koa();

app.use(bodyParser());
app.use(json());
app.use(homeController.routes()).use(homeController.allowedMethods());
app.use(testController.routes()).use(testController.allowedMethods());
app.listen(1234);
console.log("Application is running on http://localhost:1234");