import snowflake from "snowflake-sdk"
import { resolve } from "path";

snowflake.configure({ logLevel: 'DEBUG' })

     // Update to pull from Evironment Variables
 
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

 // Use "connectAsync" with authenticator, "connect" with username/password login

connection.connectAsync((err, conn) => {
  if (err) {
    console.error("Unable to Connect: " + err.message)
  } else {
    console.log("Successfully Connected to Snowflake In Utility Handler.")
        
  }
})

export default connection;

