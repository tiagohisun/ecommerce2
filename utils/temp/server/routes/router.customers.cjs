const Router = require('koa-router');
const { multer, MulterError } = require('@koa/multer');
const { Customer } = require("../db.ts");
const { storage, limits } = require('../middlewares/multerConfig.ts');
const fs = require('fs');
const path = require('path');
const router = new Router();


// Get all customers
router.get("/api/customers", async (ctx) => {
  const customers = await Customer.find();
  ctx.body = customers;
});

router.post("/api/customers", async (ctx) => {
  try {
    const customerData = ctx.request.body;
    const newCustomer = new Customer(customerData);
    const savedCustomer = await newCustomer.save();
    ctx.status = 200;
    ctx.body = savedCustomer;
  } catch (error) {
    console.error("Error creating customer:", error);
    ctx.status = 500;
    ctx.body = { error: "An error occurred while creating the customer" };
  }
});


// Update a customer
router.put("/api/customers/:id", async (ctx) => {
  // Your logic for updating a customer and syncing with Google Contacts
});

// Delete a customer
router.delete("/api/customers/:id", async (ctx) => {
  // Your logic for deleting a customer and syncing with Google Contacts
});

module.exports = router;
