"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../models/productModel");
const verifyAuth_1 = __importDefault(require("../middleware/verifyAuth"));
const store = new productModel_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productByCategory = async (req, res) => {
    try {
        const allProductsByCategory = await store.byCategory(req.params.category);
        if (allProductsByCategory) {
            res.json(allProductsByCategory);
        }
        else {
            res.status(401).json("Could not find products with given category.");
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuth_1.default, create);
    app.get('/products/:category', productByCategory);
};
exports.default = productRoutes;
