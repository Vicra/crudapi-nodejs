const dbManager = new (require('../db/dbmanager'));

class ProductService {
    async getProducts() {
        const selectSQL =
            `SELECT p.*, c.name as category, c.id as categoryId
            FROM products p 
            INNER JOIN categories c on c.id = p.category_id`;
        return await dbManager.execute('crudapp', selectSQL);
    }

    async getProductById (productId){
        const selectSQL =
            `SELECT p.*, c.name as category, c.id as categoryId
            FROM products p
            INNER JOIN categories c on c.id = p.category_id
            WHERE p.id = ${productId}`;
        return await dbManager.execute('crudapp', selectSQL);
    }

    async updateProduct(product){
        const updateSQL =
            `UPDATE products
            SET name = '${product.name}',
                description = '${product.description}',
                price = ${product.price},
                image = '${product.image}',
                category_id = ${product.categoryId}
            WHERE id = ${product.id}`;
        return await dbManager.execute('crudapp', updateSQL);
    }

    async createProduct(product){
        const insertSQL =
            `INSERT INTO products
            (name, description, price, image, category_id)
            VALUES (
                '${product.name}'
                , '${product.description}'
                , ${product.price}
                , '${product.image}'
                , ${product.categoryId}
            )`;
        return await dbManager.execute('crudapp', insertSQL);
    }

    async deleteProduct(productId){
        const deleteSQL =
            `DELETE 
            FROM products
            WHERE id = ${productId}`;
        return await dbManager.execute('crudapp', deleteSQL);
    }
}

module.exports = new ProductService();