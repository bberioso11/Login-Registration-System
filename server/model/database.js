const mysql = require("mysql2/promise");

class Database {
  async dbconnect() {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "login_system",
    });
    return connection;
  }
}

module.exports = Database;
