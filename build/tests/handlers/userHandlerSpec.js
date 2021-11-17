"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe('test endpoints for users', () => {
    it('POST user create new', async function () {
        const responseUser = await (0, supertest_1.default)(server_1.default).post('/users').send({
            firstname: 'mnv',
            lastname: 'rama',
            password: 'hellowor',
        });
        expect(responseUser.body.firstname).toBe('mnv');
        expect(responseUser.status).toBe(200);
    });
    it('GET all users', async function () {
        const response = await (0, supertest_1.default)(server_1.default).post('/users').send({
            firstname: 'raman',
            lastname: 'raghav',
            password: 'helloworld123',
        });
        const token = response.body.token;
        const responseGetUsers = await (0, supertest_1.default)(server_1.default).get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(responseGetUsers.status).toBe(200);
    });
    it('GET user by id without token', async function () {
        const responseUser = await (0, supertest_1.default)(server_1.default).get('/users').query({
            id: 1
        });
        expect(responseUser.text).toBe(JSON.stringify('Unauthorized'));
        expect(responseUser.status).toBe(401);
    });
});
