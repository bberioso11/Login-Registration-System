const Database = require("./database");

class UserData extends Database {
  async getUserData(id) {
    const db = await this.dbconnect();
    try {
      const [data] = await db.execute(
        `SELECT id, firstname, lastname, email FROM accounts WHERE id = ?`,
        [id]
      );
      return data[0];
    } catch (err) {
      console.log(err);
    } finally {
      db.end();
    }
  }
}

module.exports = UserData;
