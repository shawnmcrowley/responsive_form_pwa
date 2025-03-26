import snowflake from "snowflake-sdk"

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USERNAME,
  password: process.env.SNOWFLAKE_PASSWORD,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE
})

connection.connect((err, conn) => {
  if (err) {
    console.error("Unable to Connect: " + err.message)
  } else {
    console.log("Successfully Connected to Snowflake.")
    // You can assign the connection to a variable or export it for use elsewhere
  }
})

export default connection
