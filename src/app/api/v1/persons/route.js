import { NextResponse } from "next/server";
import snowflake from "snowflake-sdk";
import { resolve } from "path";


// Configure Snowflake
snowflake.configure({
  logLevel: "ERROR",
  additionalLogToConsole: false
});

// Promisify snowflake connection
const connectToSnowflake = (connection) => {
  return new Promise((resolve, reject) => {
    connection.connectAsync((err) => {
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
const executeQuery = (connection, sqlText, bindsArray) => {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: sqlText,
      binds: bindsArray,
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
      warehouse: process.env.SNOWFLAKE_WAREHOUSE,
      role: process.env.SNOWFLAKE_ROLE,
      authenticator: process.env.SNOWFLAKE_AUTHENTICATOR,
      // Use resolve for straight Private Key Authentication
      privateKeyPath: resolve(process.cwd(), process.env.SNOWFLAKE_PRIVATEKEYPATH),
      // Use readFileSync funtion if you need to read the file directly
      //privateKeyPath: readFileSync(resolve(process.cwd(),process.env.SNOWFLAKE_PRIVATEKEYPATH ),'utf8'),
      privateKeyPass: process.env.SNOWFLAKE_PRIVATEKEYPASS
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

export async function POST(req) {

  const connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    role: process.env.SNOWFLAKE_ROLE,
    authenticator: process.env.SNOWFLAKE_AUTHENTICATOR,
    // Use resolve for straight Private Key Authentication
    privateKeyPath: resolve(process.cwd(), process.env.SNOWFLAKE_PRIVATEKEYPATH),
    // Use readFileSync funtion if you need to read the file directly
    //privateKeyPath: readFileSync(resolve(process.cwd(),process.env.SNOWFLAKE_PRIVATEKEYPATH ),'utf8'),
    privateKeyPass: process.env.SNOWFLAKE_PRIVATEKEYPASS
  });

  try {
    const formData = await req.formData()
    const firstname = formData.get('firstname')
    const lastname = formData.get('lastname')
    const email = formData.get('email')
    const password = formData.get('password')

    // Validate input
    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400
      }, { status: 400 })
    }

    console.log('Received data: ', firstname, lastname, email, password)

    // Connect to Snowflake
    await connectToSnowflake(connection);

    // Execute query - modify the table name as needed
    const tableName = `${process.env.SNOWFLAKE_DATABASE}.${process.env.SNOWFLAKE_SCHEMA}.${process.env.SNOWFLAKE_TABLE}`;
     // Updating insert statement to include only column data, ID is autogenerated and will be returned
     const sqlText =  "INSERT INTO DB_TEST.SCHEMA_TEST.PERSONS_DATA (FIRSTNAME, LASTNAME, EMAIL, PASSWORD)VALUES (?,?,?,?)"
     const bindsArray = [firstname, lastname, email, password];
     const rows = await executeQuery(connection,sqlText,bindsArray);

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






