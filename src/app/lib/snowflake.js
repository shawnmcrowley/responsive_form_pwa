import snowflake from "snowflake-sdk";
import { resolve } from "path";

snowflake.configure({
  logLevel: "ERROR",
  additionalLogToConsole: false
});

export class SnowflakeClient {
  constructor(config = {}) {
    this.config = {
      account: config.account || process.env.SNOWFLAKE_ACCOUNT,
      username: config.username || process.env.SNOWFLAKE_USERNAME,
      password: config.password || process.env.SNOWFLAKE_PASSWORD,
      database: config.database || process.env.SNOWFLAKE_DATABASE,
      schema: config.schema || process.env.SNOWFLAKE_SCHEMA,
      warehouse: config.warehouse || process.env.SNOWFLAKE_WAREHOUSE,
      role: config.role || process.env.SNOWFLAKE_ROLE,
      authenticator: config.authenticator || process.env.SNOWFLAKE_AUTHENTICATOR,
      privateKeyPath: config.privateKeyPath || (process.env.SNOWFLAKE_PRIVATEKEYPATH 
        ? resolve(process.cwd(), process.env.SNOWFLAKE_PRIVATEKEYPATH) 
        : undefined),
      privateKeyPass: config.privateKeyPass || process.env.SNOWFLAKE_PRIVATEKEYPASS
    };
  }

  async connect() {
    this.connection = snowflake.createConnection(this.config);
    return new Promise((resolve, reject) => {
      this.connection.connectAsync((err) => {
        if (err) {
          console.error("Unable to connect to Snowflake:", err.message);
          reject(err);
        } else {
          console.log("Successfully connected to Snowflake", process.env.SNOWFLAKE_SCHEMA);
          resolve();
        }
      });
    });
  }

  async execute(sqlText, binds = []) {
    return new Promise((resolve, reject) => {
      this.connection.execute({
        sqlText,
        binds,
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
  }

  async close() {
    return new Promise((resolve) => {
      this.connection.destroy(() => {
        console.log('Connection closed');
        resolve();
      });
    });
  }

  getTableName(table) {
    return `${this.config.database}.${this.config.schema}.${table || process.env.SNOWFLAKE_TABLE}`;
  }
}

export async function withSnowflake(callback) {
  const client = new SnowflakeClient();
  try {
    await client.connect();
    return await callback(client);
  } finally {
    await client.close();
  }
}
