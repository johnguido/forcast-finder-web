"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Database {
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool)
                return;
            try {
                this.pool = new pg_1.Pool({
                    host: "localhost",
                    user: process.env.DATABASE_USER,
                    database: "forcast_finder",
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
            }
            catch (error) {
                console.error("Failed to initialize pool: ", error);
                throw error;
            }
        });
    }
    static getPool() {
        return this.pool;
    }
}
exports.default = Database;
