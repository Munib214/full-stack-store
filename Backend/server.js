const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf-8"));
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8"));

const categories = [...new Set(products.map((p) => p.category))].map((slug) => {
  const name = slug.replace(/-/g, " ");
  return { slug, name, url: `https://dummyjson.com/products/category/${slug}` };
});

app.get("/", (req, res) => {
  res.json({ message: "Store API is running", endpoints: ["/api/products", "/api/products/:id", "/api/products/categories", "/api/featured", "/api/users"] });
});

app.get("/api/products", (req, res) => {
  const { limit, sortBy, order } = req.query;
  let result = [...products];

  if (sortBy === "rating") {
    result.sort((a, b) => (order === "asc" ? a.rating - b.rating : b.rating - a.rating));
  }

  if (limit) {
    result = result.slice(0, parseInt(limit));
  }

  res.json({ products: result, total: result.length });
});

app.get("/api/products/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.get("/api/featured", (req, res) => {
  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20);
  res.json({ products: featured, total: featured.length });
});

app.get("/api/users", (req, res) => {
  const { limit } = req.query;
  let result = [...users];
  if (limit) result = result.slice(0, parseInt(limit));
  res.json({ users: result, total: result.length });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
