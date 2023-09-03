// Function to handle debug logging
const debugLog = (message) => {
    if (process.env.DEBUG === 'true') {
        console.log(message);
    }
};

// Import Required Modules
debugLog("1. Importing Required Modules");
const Router = require('koa-router');
const multer = require('@koa/multer');
const { Product } = require("../db.ts"); // Assuming you have a Product model in db.ts
const { storage, limits } = require('../middlewares/multerConfig.ts'); // Assuming you have multerConfig in middlewares
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
require('moment-timezone');
const bodyParser = require('koa-bodyparser');

// Initialize Multer Middleware
debugLog("2. Initializing Multer Middleware");
const upload = multer({ storage, limits });

const router = new Router();

// Define GET Route for All Products
debugLog("3. Defining GET Route for All Products");
router.get("/api/products", async (ctx) => {
    debugLog("4. Inside GET /api/products");
    const products = await Product.find();
    debugLog("5. Fetched products from database");
    ctx.body = products;
    debugLog("6. Set response body");
});

// Define POST Route for Creating Product
debugLog("7. Defining POST Route for Creating Product");
router.post("/api/products", upload.single("image"), async (ctx) => {
    debugLog("8. Inside POST /api/products");
    const { data } = ctx.request.body;
    debugLog("9. Extracted data from request body");
    if (!data) {
        debugLog("10. Missing product data");
        ctx.status = 400;
        ctx.body = { error: "Missing product data" };
        return;
    }
    const productData = typeof data === "string" ? JSON.parse(data) : data;
    debugLog("11. Parsed product data");
    if (ctx.request.file) {
        const { filename } = ctx.request.file;
        productData.image = filename;
        debugLog("12. Image filename set");
    }
    const newProduct = new Product(productData);
    await newProduct.save();
    ctx.status = 201;
    ctx.body = { message: "Product successfully created", data: newProduct };
    debugLog("13. Set response status and body");
});

// Define PUT Route for Updating Product
debugLog("14. Defining PUT Route for Updating Product");
router.put("/api/products/:id", upload.single("image"), async (ctx) => {
    debugLog("15. Inside PUT /api/products/:id");
    const id = ctx.params.id;
    debugLog("16. Extracted id from params");
    const { data } = ctx.request.body;
    debugLog("17. Parsed product data from request body");
    const productData = typeof data === "string" ? JSON.parse(data) : data;
    if (ctx.request.file) {
        const { filename } = ctx.request.file;
        productData.image = filename;
        debugLog("18. Image filename set");
    }
    const existingProduct = await Product.findById(id);
    debugLog("19. Fetched existing product by id");

    if (!existingProduct) {
        debugLog("20. Product not found");
        ctx.status = 404;
        ctx.body = { error: "Product not found" };
        return;
    }

    debugLog("21. Constructing update object");
    let updateObj = productData;

    debugLog("22. Performing update operation");
    await Product.findByIdAndUpdate(id, updateObj, { new: true });

    debugLog("23. Fetching updated product");
    const updatedProduct = await Product.findById(id);

    debugLog("24. Setting response status and body");
    ctx.status = 200;
    ctx.body = updatedProduct;
});

// Define DELETE Route for Deleting Product
debugLog("25. Defining DELETE Route for Deleting Product");
router.delete("/api/products/:id", async (ctx) => {
    debugLog("26. Inside DELETE /api/products/:id");
    const id = ctx.params.id;
    debugLog("27. Extracted id from params");
    const product = await Product.findById(id);
    debugLog("28. Fetched product by id");

    if (!product) {
        debugLog("29. Product not found");
        ctx.status = 404;
        ctx.body = { error: "Product not found" };
        return;
    }

    debugLog("30. Deleting product by id");
    await Product.findByIdAndDelete(id);

    debugLog("31. Setting response status and body");
    ctx.status = 200;
    ctx.body = { message: "Product deleted" };
});

// Export Router
debugLog("32. Exporting Router");
module.exports = router;
