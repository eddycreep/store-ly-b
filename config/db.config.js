const mysql = require('mysql2');
require('dotenv').config({ path: '../configuration.env' });

// Database connection configuration
const dbConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: false
};

// Maximum number of retry attempts
const MAX_RETRIES = 5;

// Retry delay in milliseconds
const RETRY_DELAY = 2000;

// Function to connect to the database with retries
function connectWithRetry(retryCount = 0) {
    const dbConn = mysql.createConnection(dbConfig);

    dbConn.connect((error) => {
        console.log('HOST:', dbConfig.host);
        console.log('PORT:', dbConfig.port);
        console.log('USER:', dbConfig.user);
        console.log('PASSWORD:', dbConfig.password);
        console.log('DATABASE:', process.env.DATABASE);

        if (error) {
            console.error(`Error connecting: ${error.stack}`);
            retryCount++;

            if (retryCount < MAX_RETRIES) {
                console.log(`Retrying to connect (${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY / 1000} seconds...`);
                setTimeout(() => connectWithRetry(retryCount), RETRY_DELAY);
            } else {
                console.error('Max retries reached. Exiting application.');
                process.exit(1);
            }
        } else {
            console.log('DB connected successfully');
            module.exports = dbConn; // Export connection only after successful connection
        }
    });
}

// Start the connection process
connectWithRetry();