const snowflake = require('snowflake-sdk')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')


// Load environment variables from .env.local file
const envPath = path.resolve(process.cwd(), '../../../.env.local');
console.log(envPath)
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    console.warn('.env.local file not found. Using existing environment variables.');
}
snowflake.configure({ logLevel: 'DEBUG' })

const connection = snowflake.createConnection({

    // Update to pull from Evironment Variables
    // include passcode for DUO/MFA if implemented, retreive passcode from DUO App
    //passcode: "831012",
    // include EXTERNALBROWSER to trigger SSO redirect login
    //authenticator: 'EXTERNALBROWSER',
    // include SNOWFLAKE_JWT for Key/Value Pair login passing in key path/file
    // Account gets appended to Snowflakecomputing.com URL has to be entire Account Name

    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    account: process.env.SNOWFLAKE_ACCOUNT,  
    role: process.env.SNOWFLAKE_ROLE,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    authenticator: process.env.SNOWFLAKE_AUTHENTICATOR,
    privateKeyPath: process.env.SNOWFLAKE_PRIVATEKEYPATH_FALLBACK,
    privateKeyPass: "",

});

// Use "connectAsync" with authenticator, "connect" with username/password login

connection.connectAsync((err, conn) => {

    if (err) {

        console.error('Unable to connect: ' + err.message);

    } else {

        console.debug('Successfully connected to Snowflake.');

    }



    // Check if script was executed with arguments
    if (process.argv.length > 2) {
        try {
            // Parse the JSON argument
            const jsonData = JSON.parse(process.argv[2]);

            // Execute insert operation
            insertData(jsonData);
        } catch (e) {
            console.error('Error parsing JSON argument:', e.message);
            process.exit(1);
        }
    } else {
        // No arguments, run select operation only
        selectData();
    }
});

// Function to insert data - Argument Format - '{"FIRSTNAME": "Steve", "LASTNAME": "Balmer", "EMAIL": "steveb@microsoft.com", "PASSWORD": "*******", "DELETED": true}'

function insertData(data) {
    // Build the dynamic SQL insert statement
    const columns = Object.keys(data).join(', ');
    const valuePlaceholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const tableName = process.env.SNOWFLAKE_TABLE || 'PERSONS';
    const sqlText = `INSERT INTO ${process.env.SNOWFLAKE_DATABASE || 'DB_TEST'}.${process.env.SNOWFLAKE_SCHEMA || 'SCHEMA_TEST'}.${tableName} (${columns}) VALUES (${valuePlaceholders})`;

    connection.execute({
        sqlText: sqlText,
        binds: values,
        complete: function (err, stmt, rows) {
            if (err) {
                console.error('Unable to insert data: ', err);
            } else {
                console.log('Data inserted successfully!', rows);
            }

            // Close connection after insert
            connection.destroy();
        }
    });
}

// Function to select data
function selectData() {
    connection.execute({
        sqlText: `SELECT * FROM ${process.env.SNOWFLAKE_DATABASE}.${process.env.SNOWFLAKE_SCHEMA}.${process.env.SNOWFLAKE_TABLE}`,
        complete: function (err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Number of rows returned: ' + rows.length);

                // Loop through query results
                for (let i = 0; i < rows.length; i++) {
                    console.log('ID: ', rows[i].ID);
                    console.log('First Name: ', rows[i].FIRSTNAME);
                    console.log('Last Name: ', rows[i].LASTNAME);
                    console.log('Email: ', rows[i].EMAIL);
                }
            }

            // Close connection after select
            connection.destroy();
        }
    });
}

