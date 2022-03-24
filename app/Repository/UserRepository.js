import Db from "../../bootstrap/Db.js";

export default class UserRepository {
  constructor() {
    this.db = new Db();
  }

  async all() {
    const result = await this.db.client.query("SELECT * FROM users");
    return result.rows;
  }

  async get(id) {
    const result = await this.db.client.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async create(user) {
    const result = await this.db.client.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [user.name, user.email, user.password]
    );
    return result.rows[0];
  }

  async update(id, user) {
    const result = await this.db.client.query(
      "UPDATE users SET name = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING *",
      [user.name, user.email, user.password, new Date(), id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.db.client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
