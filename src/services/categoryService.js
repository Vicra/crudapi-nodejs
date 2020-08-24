const dbManager = new (require('../db/dbmanager'));

class CategoryService {
    async getCategories() {
        const selectSQL =
            `SELECT c.*
            FROM categories c`;
        return await dbManager.execute('crudapp', selectSQL);
    }
}

module.exports = new CategoryService();