const pg = require('pg');

class PostgresService {
    constructor() {
        this.connectionString = "postgresql://postgres:admin@localhost:5432/smart-solutions";
        this.pool = new pg.Pool({
            connectionString: this.connectionString
        });
    }

    async executeSql(sql) {
        let result = await this.pool.query(sql);
        return result;
    }
}

module.exports = PostgresService