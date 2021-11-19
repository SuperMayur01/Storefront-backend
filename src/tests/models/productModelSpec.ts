import { Product, ProductStore } from '../../models/productModel';


const store = new ProductStore();

describe('test product model methods', () => {

    it('fetch all products', async function () {
        const product: Product = {
            name: "Legion Laptop",
            price: 800,
            category: "Laptop"
        }
        await store.create(product)
        const products = await store.index()
  
      expect(products.length).toBeGreaterThan(0);
    });

    it('fetch product by id', async function () {
        const product = await store.show(1)
  
      expect(product.id).toBe(1);
    });

    it('create a new product', async function () {
        const product: Product = {
            name: "Mac air",
            price: 900,
            category: "Laptop"
        }
        const newProduct = await store.create(product)
  
      expect(newProduct.name).toBe("Mac air");
    });

    it('fetch product by category', async function () {
        const allProductsByCategory = await store.byCategory("Laptop")
  
        expect(allProductsByCategory.length).toBeGreaterThan(0);
    });
  });