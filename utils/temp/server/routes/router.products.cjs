const Router = require('koa-router');
const multer = require('@koa/multer');
const { Product } = require("../db.ts");
const { storage, limits } = require('../middlewares/multerConfig.ts');
const fs = require('fs-extra');
const path = require('path');
const router = new Router();
const moment = require('moment');
require('moment-timezone');
const bodyParser = require('koa-bodyparser');

const upload = multer({ storage, limits });

router.get("/api/products", async (ctx) => {
  console.log("Received request for /api/products");
  const products = await Product.find();
  ctx.body = products;
});


router.post("/api/products", upload.single("image"), async (ctx) => {
  console.log("Received request for /api/products");

  // Access FormData directly from ctx.request.body
  const { data } = ctx.request.body;

  // Validate existence of data
  if (!data) {
    ctx.status = 400;
    ctx.body = { error: "Missing product data" };
    return;
  }

  // If data is a string, attempt to parse it as JSON (remove this if you're sure it will always be an object)
  const productData = typeof data === "string" ? JSON.parse(data) : data;

  // Image Handling
  if (ctx.request.file) {
    const { filename } = ctx.request.file;
    productData.image = filename;
  }

  // TODO: Insert database operations here
  // e.g., await insertProductIntoDatabase(productData);

  // If everything goes well
  ctx.status = 201;
  ctx.body = { message: "Product successfully created", data: productData };
});


router.put("/api/products/:id", upload.single("image"), async (ctx) => {
  try {
    console.log("Received PUT request for product update");

    const id = ctx.params.id;
    console.log(`Product ID: ${id}`);

    const productData = JSON.parse(ctx.request.body.data);
    console.log(`Product Data: ${JSON.stringify(productData)}`);
    if (productData.isAvailable === undefined) {
  productData.isAvailable = false;
}

    const image = ctx.request.file;
    console.log(`Image: ${JSON.stringify(image)}`);

    const existingProduct = await Product.findById(id);
    console.log(`Existing Product: ${JSON.stringify(existingProduct)}`);

    if (!existingProduct) {
      console.log("Product not found");
      ctx.status = 404;
      ctx.body = { error: "Product not found" };
      return;
    }

   let updateObj = {
  SKU: productData.SKU,
  receivedDate: productData.receivedDate,
  isAvailable: productData.isAvailable,
  customerName: productData.customerName,
  model: productData.model,
  brand: productData.brand, 
  location: productData.location,
  category: productData.category, 
  year: productData.year,
  exposureCounter: productData.exposureCounter,
  wholesalePrice: productData.wholesalePrice,
  profit: productData.wholesalePrice - productData.retailPrice,
  retailPrice: productData.retailPrice, 
  description: productData.description,
  imageUrl: existingProduct.imageUrl // keep old imageUrl by default
};
    console.log(`Update Object: ${JSON.stringify(updateObj)}`);

    const timestamp = moment().tz('America/Sao_Paulo').format('DD-MM-YYYY-HH-mm-ss');
    const existingImagePath = path.join(__dirname, "..", existingProduct.imageUrl);
    const originalFolderPath = path.dirname(existingImagePath);

    if (image) {
      const newFolderPath = path.join(__dirname, "..", "Images", "Products", `${productData.customerName}-${productData.model}-${productData.year}-${productData.location}-${timestamp}`);

      if (!fs.existsSync(newFolderPath)) {
        fs.mkdirSync(newFolderPath, { recursive: true });
      }

      const imageFormat = image.mimetype.split('/')[1];
      const newImageName = `${productData.model}-${productData.year}.${imageFormat}`;
      const newImagePath = path.join(newFolderPath, newImageName);

      fs.renameSync(image.path, newImagePath);
      
      // Update imageUrl only if a new image is uploaded
      const newImageUrl = `/Images/Products/${productData.customerName}-${productData.model}-${productData.year}-${productData.location}-${timestamp}/${newImageName}`;

      existingProduct.imageUrl = newImageUrl;
      updateObj.imageUrl = newImageUrl;

      // Remove the old image folder
      await fs.remove(originalFolderPath);
    }

       // Update the product in the database
    await Product.findByIdAndUpdate(id, updateObj, { new: true });

    const updatedProduct = await Product.findById(id);
    console.log(`Updated Product: ${JSON.stringify(updatedProduct)}`);

    ctx.status = 200;
    ctx.body = updatedProduct;
    console.log("Product update completed successfully.");
  } catch (error) {
    console.error(`Error while updating product: ${error}`);
    ctx.status = 500;
    ctx.body = { error: "Error while updating product" };
  }
});

router.delete("/api/products/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    const product = await Product.findById(id);

    if (!product) {
      console.log("Product not found");
      ctx.status = 404;
      ctx.body = { error: "Product not found" };
      return;
    }

    console.log(`Product found: ${JSON.stringify(product)}`);
    console.log(`Product Image URL: ${product.imageUrl}`);

    // Store the product data before deleting
    const deletedProduct = {...product._doc};

    await Product.findByIdAndDelete(id);

    // Extract the directory path from the imageUrl
    const imageUrlSegments = product.imageUrl.split('/');
    const folderPathSegments = imageUrlSegments.slice(0, imageUrlSegments.length - 1);
    const folderPath = path.join(__dirname, "..", ...folderPathSegments);

    console.log(`Folder path to delete: ${folderPath}`);

    try {
      await fs.remove(folderPath);
      console.log("Folder successfully deleted");
      ctx.status = 200;
      ctx.body = { message: "Product and image folder deleted successfully", deletedProduct: deletedProduct };
    } catch (err) {
      console.error(`Error deleting image folder: ${err}`);
      ctx.status = 500;
      ctx.body = { error: `Error deleting image folder: ${err}` };
    }

  } catch (error) {
    console.error("Error deleting product:", error);
    ctx.status = 500;
    ctx.body = { error: "An error occurred while deleting the product" };
  }
});

module.exports = router;
