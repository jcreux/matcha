const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'matcha',
    //port:'3308',
    password: 'rootroot'
});
module.exports = pool.promise();