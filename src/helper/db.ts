import mariadb from 'mariadb';
import { envConfig } from '../config';

const pool = mariadb.createPool({
    host: envConfig.db.host,
    user: envConfig.db.user,
    password: envConfig.db.password,
    database: envConfig.db.database,
    connectionLimit: 5
});

const queryDatabase = async (sql: string, params: Array<any>) => {
    let conn: mariadb.PoolConnection | undefined;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql, params);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

async function queryDatabasePaginated(sql: string, params: Array<any>, page = 1, pageSize = 10) {
    let conn: mariadb.PoolConnection | undefined;
    try {
        conn = await pool.getConnection();
        const offset = (page - 1) * pageSize;
        const paginatedSql = `${sql} LIMIT ?, ?`;
        const paginatedParams = [...params, offset, pageSize];
        const rows = await conn.query(paginatedSql, paginatedParams);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

const testConnection = async () => {
    let connection: mariadb.Connection | undefined;
    try {
        connection = await mariadb.createConnection({
            host: envConfig.db.host,
            user: envConfig.db.user,
            password: envConfig.db.password,
            database: envConfig.db.database,
        });

        console.log('[database]: Connection to MariaDB successful!');
        console.log(`[database]: host: ${envConfig.db.host}`);
        console.log(`[database]: user: ${envConfig.db.user}`);
        console.log(`[database]: database: ${envConfig.db.database}`);
    } catch (error) {
        console.error('Error connecting to MariaDB:', error);
    } finally {
        if (connection) {
            await connection.end(); // Close the connection
        }
    }
}


export const db = {
    queryDatabase,
    queryDatabasePaginated,
    testConnection
}
