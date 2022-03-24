import PG from "pg";
import APP from "../config/app.js";

export default class Db {
  constructor() {
    this.client = new PG.Pool({
      user: APP.DB.USER,
      host: APP.DB.HOST,
      database: APP.DB.DATABASE,
      password: APP.DB.PASSWORD,
      port: APP.DB.PORT,
    });
  }
}
