"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async create(order) {
        try {
            const sql1 = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
            const conn1 = await database_1.default.connect();
            const result1 = await conn1.query(sql1, [order.user_id]);
            const orderResponse = result1.rows[0];
            conn1.release();
            const sql2 = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn2 = await database_1.default.connect();
            const result2 = await conn2.query(sql2, [order.quantity, order.order_id, order.product_id]);
            const orderProductResponse = result2.rows[0];
            conn2.release();
            const response = { ...orderResponse, ...orderProductResponse };
            return response;
        }
        catch (err) {
            throw new Error(`Could not add order. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
