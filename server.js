const koa = require("koa");
const json = require("koa-json");
const homeController = require('./controllers/homeController');
const testController = require('./controllers/testController');

const app = new koa();

app.use(json());

app.use(homeController.routes()).use(homeController.allowedMethods());
app.use(testController.routes()).use(testController.allowedMethods());
app.listen(1234);
console.log("Application is running on http://localhost:1234");