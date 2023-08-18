const Database = require("./database");

class Authentication extends Database {
  async checkDuplicatedEmail(email) {
    const db = await this.dbconnect();
    try {
      const [data] = await db.execute(
        `SELECT email FROM accounts WHERE email = ?`,
        [email]
      );
      if (!data.length) {
        return {
          isDuplicated: false,
        };
      }
      return {
        isDuplicated: true,
      };
    } catch (err) {
      console.log(err);
    } finally {
      db.connect();
    }
  }
  async register(form) {
    const { firstname, lastname, email, password } = form;
    const { isDuplicated } = await this.checkDuplicatedEmail(email);
    const db = await this.dbconnect();
    try {
      if (isDuplicated) {
        return {
          isSuccess: false,
          message: "Email is already used.",
        };
      }
      await db.execute(
        `INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ? )`,
        [firstname, lastname, email, password]
      );
      return {
        isSuccess: true,
      };
    } catch (err) {
      console.log(err);
    } finally {
      db.end();
    }
  }
  async login(form) {
    const { email, password } = form;
    const db = await this.dbconnect();
    try {
      const [data] = await db.execute(
        `SELECT id, email, password FROM accounts WHERE email = ? && password = ?`,
        [email, password]
      );
      if (!data.length) {
        return {
          isSuccess: false,
          message: "Email or Password is Incorrect.",
        };
      }
      return {
        isSuccess: true,
        userid: data[0].id,
      };
    } catch (err) {
      console.log(err);
    } finally {
      db.end();
    }
  }
}

module.exports = Authentication;
