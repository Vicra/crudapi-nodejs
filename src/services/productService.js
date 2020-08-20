const dbManager = new (require('../db/dbmanager'));

class ProductService {
    async getProducts() {
        const selectSQL =
            `SELECT *
            FROM products`;
        return await dbManager.execute('crudapp', selectSQL);
    }
}

module.exports = new ProductService();