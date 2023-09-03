const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const serve = require("koa-static");
const koaBody = require("koa-body"); // Use koa-body instead of koa-bodyparser

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(serve("C:/ecommerce2/server/Images/Products"));
app.use(serve("C:/ecommerce2/server/Images/Blogs"));

// Use koa-body for handling both JSON and multipart requests
app.use(koaBody({ multipart: true }));

// Import your routers
const productRoutes = require("./routes/router.products.cjs");
const blogRoutes = require("./routes/router.blogs.cjs");
const customerRoutes = require("./routes/router.customers.cjs");

// Use your routers
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());
app.use(blogRoutes.routes()).use(blogRoutes.allowedMethods());
app.use(customerRoutes.routes()).use(customerRoutes.allowedMethods());

app.listen(4000, function () {
  console.log("Koa server is listening on port 4000");
});
