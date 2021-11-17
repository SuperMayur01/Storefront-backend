"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../models/orderModel");
const verifyAuth_1 = __importDefault(require("../middleware/verifyAuth"));
const store = new orderModel_1.OrderStore();
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            quantity: req.body.quantity,
            order_id: req.body.order_id,
            product_id: req.body.product_id
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders/:id', verifyAuth_1.default, show);
    app.post('/orders', verifyAuth_1.default, create);
};
exports.default = orderRoutes;
