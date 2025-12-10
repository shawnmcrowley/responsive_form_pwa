import { NextResponse } from "next/server";
import { withSnowflake } from "@/app/lib/snowflake";


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
    const rows = await withSnowflake(async (client) => {
      const tableName = client.getTableName();
      return await client.execute(`SELECT * FROM ${tableName}`);
    });

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
 *         multipart/form-data:
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
 *                type: string
 *                description: Email
 *               password:
 *                 type: string
 *                 description: Password
 *     responses:
 *       200:
 *         description: Successful Creation
 *       404:
 *         description: Resource Not Found
 */

export async function POST(req) {
  try {
    const formData = await req.formData();
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400
      }, { status: 400 });
    }

    console.log('Received data:', firstname, lastname, email, password);

    const rows = await withSnowflake(async (client) => {
      const tableName = client.getTableName();
      const sqlText = `INSERT INTO ${tableName} (FIRSTNAME, LASTNAME, EMAIL, PASSWORD) VALUES (?,?,?,?)`;
      return await client.execute(sqlText, [firstname, lastname, email, password]);
    });

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






