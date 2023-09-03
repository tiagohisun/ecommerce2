const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce2", {});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  // Add any other fields you need for a customer
});

const Customer = mongoose.model("Customer", customerSchema);

const productSchema = new mongoose.Schema({
  SKU: Number,
  receivedDate: Date,
  isAvailable: Boolean,
  customerName: String,
  model: String,
  brand: String,
  location: String,
  category: String, // This is a mongoose built-in type, not a string. Learn more about it in the TypeScript specific section.
  year: Number,
  exposureCounter: Number,
  wholesalePrice: Number,
  retailPrice: Number, 
  profit: Number,
  description: String,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  tags: [String],
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = {
  Customer,
  Product,
  Blog
};
