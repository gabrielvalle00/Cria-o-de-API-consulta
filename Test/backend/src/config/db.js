import mysql2 from 'mysql2/promise.js';

const connection = async () => {
    if(global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const con = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1234',
        database: 'SIMULADO_SAEP',
        multipleStatements: true,
    })
    global.connection = con;
    return con;
}
export default connection;

