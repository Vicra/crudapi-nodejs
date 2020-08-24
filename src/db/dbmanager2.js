class dbmanager {
    constructor() {
        this.fs = require('fs');
    }

    getDBConfig() {
        return JSON.parse(this.fs.readFileSync(__dirname + '/db_credentials.json', 'utf8'));
    }

    async execute(datasource, sql, parameters) {
        const dbconfig = this.getDBConfig()[datasource];
        if (!dbconfig) throw (`Datasource '${datasource}' was not found`);

        let result, Adapter;
        Adapter = require('./mysql');
        const mysqlConn = new Adapter(dbconfig);
        result = await mysqlConn.execute(sql, parameters);
        mysqlConn.close();
        return result;
    }
}

module.exports = dbmanager;