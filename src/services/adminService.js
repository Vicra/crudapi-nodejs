const dbManager = new (require('../db/dbmanager'));

class AdminService {
    async createUser(user) {
        const insertSQL =
            `INSERT INTO users
            (user, password, salt)
            VALUES 
            (
                '${user.user}'
                , '${user.password}'
                , '${user.salt}'
            )`;
        return await dbManager.execute('crudapp', insertSQL);
    }

    async getUser(user){
        const selectSQL =
            `SELECT * FROM users
            WHERE user = '${user}'`;
        return await dbManager.execute('crudapp', selectSQL);
    }
}

module.exports = new AdminService();