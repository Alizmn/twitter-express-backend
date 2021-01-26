const pg = require("pg");
require("dotenv").config();
// env and config here provided to separate testing and developement database
const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

const connectionString = `postgres://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}?sslmode=disable`;

const client = new pg.Client({
  connectionString: connectionString || process.env.DATABASE_URL,
});

console.log(`Connected to ${config.dbName} on ${config.host} in ${env} mode`);
client.connect();

module.exports = client;
