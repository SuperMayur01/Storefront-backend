"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe('test endpoint GET /orders/:id', () => {
    it('unauthorized call without token', async function () {
        const response = await (0, supertest_1.default)(server_1.default).get('/orders/1');
        expect(response.text).toBe(JSON.stringify('Unauthorized'));
        expect(response.status).toBe(401);
    });
});
describe('test endpoint POST /orders', () => {
    it('fetch order call with token', async function () {
        const responseUser = await (0, supertest_1.default)(server_1.default).post('/users').send({
            firstname: 'raman',
            lastname: 'raghav',
            password: 'helloworld123',
        });
        const token = responseUser.body.token;
        const responseOrder = await (0, supertest_1.default)(server_1.default).post('/orders')
            .send({
            "user_id": 1,
            "quantity": 3,
            "order_id": 1,
            "product_id": 2
        })
            .set('Authorization', `Bearer ${token}`);
        console.log(responseOrder.body);
        expect(responseOrder.body.status).toBe('active');
        expect(responseOrder.status).toBe(200);
    });
});
