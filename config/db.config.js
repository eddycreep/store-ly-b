const mysql = require('mysql');
require('dotenv').config({ path: '../configuration.env' });

const dbConn = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: false
});

dbConn.connect(function (error) {
    console.log('HOST:', process.env.HOST);
    console.log('PORT:', process.env.PORT);
    console.log('USER:', process.env.USER);
    console.log('PASSWORD:', process.env.PASSWORD);
    console.log('DATABASE', process.env.DATABASE);

    if (error) {
        console.error('error connecting:' + error.stack);
        process.exit(1);
    }
    else {
        console.log('DB connected successfully');
    }

});

module.exports = dbConn;