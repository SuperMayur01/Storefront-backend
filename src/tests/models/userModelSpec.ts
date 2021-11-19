import {  User, UserStore } from '../../models/userModel'

const store = new UserStore();

describe('test user model methods', () => {

    it('fetch all users', async function () {
        const user: User = {
            firstname: "Faiz",
            lastname: "Ah",
            password: "password123",
        }
        await store.create(user)
        const users = await store.index()
  
      expect(users.length).toBeGreaterThan(0);
    });

    it('fetch user by id', async function () {
        const user = await store.show(1)
  
      expect(user.id).toBe(1);
    });

    it('create a new user', async function () {
        const user: User = {
            firstname: "Ramadhir",
            lastname: "Singh",
            password: "kkl",
        }
        const newUser = await store.create(user)
  
      expect(newUser.firstname).toBe("Ramadhir");
    });
  });