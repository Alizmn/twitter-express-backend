require("dotenv").config();

module.exports = {
  development: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  test: {
    host: process.env.TDB_HOST,
    user: process.env.TDB_USER,
    pass: process.env.TDB_PASS,
    dbName: process.env.TDB_NAME,
    port: process.env.TDB_PORT,
    dialect: "postgres",
  },
};
