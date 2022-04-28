"use strict";
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const productos = [
  { name: "Producto 1", price: 12.56 },
  { name: "Producto 2", price: 10.99 },
];

mongoose.connect("mongodb://localhost:27017/products", {
  useNewUrlParser: true,
});

const ProductsSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Products = mongoose.model("Products", ProductsSchema);

app.get("/products", async (req, res) => {
  const showProducts = await Products.find({});
  res.json(showProducts);
});

app.listen(3000, () => console.log("Running in port 3000"));
