// 1.Srvr - Importing required modules
console.log("1.Srvr - Importing required modules");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const serve = require("koa-static");
const koaBody = require("koa-body");

// 2.Srvr - Creating new Koa application
console.log("2.Srvr - Creating new Koa application");
const app = new Koa();

// 3.Srvr - Creating new Router
console.log("3.Srvr - Creating new Router");
const router = new Router();

// 4.Srvr - Using CORS middleware
console.log("4.Srvr - Using CORS middleware");
app.use(cors());

// 5.Srvr - Using static serve middleware for Products
console.log("5.Srvr - Using static serve middleware for Products");
app.use(serve("C:/ecommerce2/server/Images/Products"));

// 6.Srvr - Using static serve middleware for Blogs
console.log("6.Srvr - Using static serve middleware for Blogs");
app.use(serve("C:/ecommerce2/server/Images/Blogs"));

// 7.Srvr - Using koaBody middleware
console.log("7.Srvr - Using koaBody middleware");
app.use(koaBody({ multipart: true }));

// 8.Srvr - Importing routers
console.log("8.Srvr - Importing routers");
const productRoutes = require("./routes/router.products.cjs");
const blogRoutes = require("./routes/router.blogs.cjs");
const customerRoutes = require("./routes/router.customers.cjs");

// 9.Srvr - Using product routes
console.log("9.Srvr - Using product routes");
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());

// 10.Srvr - Using blog routes
console.log("10.Srvr - Using blog routes");
app.use(blogRoutes.routes()).use(blogRoutes.allowedMethods());

// 11.Srvr - Using customer routes
console.log("11.Srvr - Using customer routes");
app.use(customerRoutes.routes()).use(customerRoutes.allowedMethods());

// 12.Srvr - Starting the server
console.log("12.Srvr - Starting the server");
app.listen(4000, function () {
  console.log("13.Srvr - Koa server is listening on port 4000");
});
