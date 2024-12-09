const mysql = require('mysql2');
require('dotenv').config({ path: '../configuration.env' });

const MAX_RETRIES = 5;
let retryCount = 0;

function connectToDatabase() {
    console.log('Attempting to connect to the database...');

    const dbConn = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: false,
        connectTimeout: 10000 // 10 seconds
    });

    dbConn.connect((error) => {
        console.log('HOST:', process.env.HOST);
        console.log('PORT:', process.env.PORT);
        console.log('USER:', process.env.USER);
        console.log('PASSWORD:', process.env.PASSWORD);
        console.log('DATABASE:', process.env.DATABASE);

        if (error) {
            console.error('Error connecting:', error.stack);

            if (retryCount < MAX_RETRIES) {
                retryCount++;
                console.log(`Retrying connection (${retryCount}/${MAX_RETRIES})...`);
                setTimeout(connectToDatabase, 2000); // Wait 2 seconds before retrying
            } else {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
        } else {
            console.log('DB connected successfully');
            retryCount = 0; // Reset the retry counter if connection is successful
            // Keep the connection open and available for the rest of the app
        }
    });

    return dbConn;
}

// Export the connection object
const dbConn = connectToDatabase();

module.exports = dbConn;