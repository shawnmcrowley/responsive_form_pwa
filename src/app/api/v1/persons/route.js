import { NextResponse } from "next/server";
import snowflake from "snowflake-sdk";

// Configure Snowflake
snowflake.configure({
  logLevel: "ERROR",
  additionalLogToConsole: false
});

// Promisify snowflake connection
const connectToSnowflake = (connection) => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Unable to connect to Snowflake:", err.message);
        reject(err);
      } else {
        console.log("Successfully connected to Snowflake");
        resolve();
      }
    });
  });
};

// Promisify snowflake query execution
const executeQuery = (connection, sqlText) => {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: sqlText,
      complete: (err, stmt, rows) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
        } else {
          console.log(`Query executed successfully, returned ${rows.length} records`);
          resolve(rows);
        }
      }
    });
  });
};

// Promisify connection destruction
const destroyConnection = (connection) => {
  return new Promise((resolve) => {
    connection.destroy(() => {
      console.log('Connection closed');
      resolve();
    });
  });
};


/**
 * @swagger
 * /api/v1/persons:
 *   get:
 *     summary: Retrieve a List of All Persons in Snowflake
 *     description: Returns users
 *     tags:
 *       - Persons
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           applicaton/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 propeties:
 *                    id:
 *                      type: integer
 *                      description: Person ID
 *                    firstname:
 *                      type: string
 *                      description: First Name
 *                    lastname:
 *                      type: string
 *                      description: Last Name
 *                    email:
 *                      type: string
 *                      description: Email
 *       404:
 *         description: Resource Not Found
 */


export async function GET(req) {
  try {
    // Create connection using environment variables
    const connection = snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT,
      username: process.env.SNOWFLAKE_USERNAME,
      password: process.env.SNOWFLAKE_PASSWORD,
      database: process.env.SNOWFLAKE_DATABASE,
      schema: process.env.SNOWFLAKE_SCHEMA,
      warehouse: process.env.SNOWFLAKE_WAREHOUSE
    });

    // Connect to Snowflake
    await connectToSnowflake(connection);

    // Execute query - modify the table name as needed
    const tableName = `${process.env.SNOWFLAKE_DATABASE}.${process.env.SNOWFLAKE_SCHEMA}.${process.env.SNOWFLAKE_TABLE}`;
    const rows = await executeQuery(connection, `SELECT * FROM ${tableName}`);

    // Close connection
    await destroyConnection(connection);

    // Return data as JSON
    return NextResponse.json({
      success: true,
      data: rows,
      count: rows.length
    });

  } catch (error) {
    console.error("Error in Snowflake API route:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, {
      status: 500
    });
  }
}

/**
 * @swagger
 * /api/v1/persons:
 *   post:
 *     summary: Create a new Person in Snowflake
 *     description: Create a Person with Name, Email
 *     tags:
 *       - Persons
 *     requestBody:
 *       requied: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                type: string
 *                description: First Name
 *               lastname:
 *                type: string
 *                description: Last Name
 *               email:
 *                 type: string
 *                 description: Email
 *     responses:
 *       200:
 *         description: Successful Creation
 *       404:
 *         description: Resource Not Found
 */

export async function POST(req, response) {
  return NextResponse({
    success: true,
    message: "Person Created Successfully"
  }, {}

  )
}



