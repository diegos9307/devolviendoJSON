"use strict";
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const productos = [
  { name: "Producto 1", price: 12.56 },
  { name: "Producto 2", price: 10.99 },
];

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/products",
  { useNewUrlParser: true }
);

const ProductsSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
});
const Products = mongoose.model("Products", ProductsSchema);

app.get("/products", async (req, res) => {
  productos.map((el) => {
    const products = new Products({ name: el.name, price: el.price });
    products.save();
  });
  const showProducts = await Products.find();
  if (!showProducts) {
    res.set("Content-Type", "application/json").json([{}]);
  } else {
    // res.set("Content-Type", "application/json");
    console.log(showProducts);
    res.set("Content-Type", "application/json").json(showProducts);
  }
});

app.listen(3000, () => console.log("Running in port 3000"));
