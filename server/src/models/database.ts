import { Pool } from "pg";

class Database {
  private static pool;

  static async initialize() {
    if (this.pool) return;

    try {
      this.pool = new Pool({
        host: "localhost",
        user: process.env.DATABASE_USER,
        database: "desktop_aquaponics",
        password: process.env.DATABASE_PASS,
        port: 5432,
      });

      this.pool.on("error", (error) => {
        console.error("Unexpected error on idle client: ", error);
      });

      return this.pool.query("SELECT 1").catch((error) => {
        console.error("Database connection failed: ", error);
        throw error;
      });
    } catch (error) {
      console.error("Failed to initialize pool: ", error);
      throw error;
    }
  }

  static getPool() {
    return this.pool;
  }
}

export default Database;
