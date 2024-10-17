const mysql = require('mysql2');
require('dotenv').config({ path: './configuration.env' });

const dbConn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Legend1501',
    database: 'store_loyalty'
});

// PORT = 3306
// HOST = localhost
// USER = root
// PASSWORD = Legend1501
// DATABASE = store_loyalty

dbConn.connect(function (error) {
    // console.log('HOST:', process.env.HOST);
    // console.log('USER:', process.env.PORT);
    // console.log('HOST:', process.env.USER);
    // console.log('USER:', process.env.PASSWORD);
    // console.log('USER:', process.env.DATABASE);

    if (error) {
        console.error('error connecting:' + error.stack);
        process.exit(1);
    }
    else {
        console.log('DB connected successfully');
    }

});

module.exports = dbConn;
