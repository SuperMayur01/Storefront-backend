"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe('test endpoints for products', () => {
    it('POST product create new', async function () {
        const response = await (0, supertest_1.default)(server_1.default).post('/users').send({
            firstname: 'raman',
            lastname: 'raghav',
            password: 'helloworld123',
        });
        const token = response.body.token;
        const responseProduct = await (0, supertest_1.default)(server_1.default).post('/products').send({
            name: "Mac Pro",
            price: 1500,
            category: "Electronics"
        })
            .set('Authorization', `Bearer ${token}`);
        expect(responseProduct.body.name).toBe('Mac Pro');
        expect(responseProduct.status).toBe(200);
    });
    it('GET all products', async function () {
        const responseGetProducts = await (0, supertest_1.default)(server_1.default).get('/products');
        expect(responseGetProducts.status).toBe(200);
    });
    it('GET product by id', async function () {
        const responseProduct = await (0, supertest_1.default)(server_1.default).get('/products').query({
            id: 1
        });
        expect(responseProduct.status).toBe(200);
    });
    it('GET products by category', async function () {
        const responseProductCategory = await (0, supertest_1.default)(server_1.default).get('/products').query({
            category: 'Electronics'
        });
        expect(responseProductCategory.body.length).toBeGreaterThan(2);
        expect(responseProductCategory.status).toBe(200);
    });
});
