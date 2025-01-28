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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const database_1 = __importDefault(require("./database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    static verifyUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("SELECT id, first_name, last_name, password FROM users WHERE email = $1", [email]);
                if (response.rows.length > 0) {
                    const hashedPassword = response.rows[0].password;
                    const passwordMatches = yield bcrypt_1.default.compare(password, hashedPassword);
                    if (passwordMatches) {
                        return {
                            success: true,
                            user: {
                                id: response.rows[0].id,
                                firstName: response.rows[0].first_name,
                                lastName: response.rows[0].last_name,
                            },
                        };
                    }
                }
                return {
                    success: true,
                    user: null,
                };
            }
            catch (err) {
                console.error("Error verifying user:", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
    static registerUser(firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const userID = crypto_1.default.randomUUID().replace(/-/g, "");
                const salt = yield bcrypt_1.default.genSalt();
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const response = yield database_1.default
                    .getPool()
                    .query("INSERT INTO users (id, first_name, last_name, email, password, created_at, updated_at, deleted_at, is_active) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, true)", [userID, firstName, lastName, email, hashedPassword]);
                return {
                    userID: userID,
                    success: true,
                };
            }
            catch (error) {
                console.error("Register user database error:", error);
                return {
                    userID: null,
                    success: false,
                    error: error,
                };
            }
        });
    }
    static checkIfUserEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("SELECT email FROM users WHERE email = $1", [email]);
                return {
                    success: true,
                    emailExists: response.rows.length > 0,
                };
            }
            catch (err) {
                return {
                    success: false,
                    emailExists: null,
                    error: err,
                };
            }
        });
    }
    static setNewPasswordForUser(email, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.initialize();
                const response = yield database_1.default
                    .getPool()
                    .query("SELECT password FROM users WHERE email = $1", [email]);
                if (response.rows.length > 0) {
                    const hashedPassword = response.rows[0].password;
                    const passwordMatches = yield bcrypt_1.default.compare(newPassword, hashedPassword);
                    if (passwordMatches) {
                        return {
                            success: false,
                            passwordMatches: true,
                        };
                    }
                    else {
                        const salt = yield bcrypt_1.default.genSalt();
                        const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
                        const response = yield database_1.default
                            .getPool()
                            .query("UPDATE users SET password = $1 WHERE email = $2", [
                            hashedPassword,
                            email,
                        ]);
                        if (response.rowCount === 1) {
                            return {
                                success: true,
                                passwordMatches: false,
                            };
                        }
                        console.log("Something very strange happened trying to set password for user, row count zero");
                        return {
                            success: false,
                            passwordMatches: null,
                        };
                    }
                }
                else {
                    console.log("Something very strange happened trying to set password for user");
                    return {
                        success: false,
                        passwordMatches: null,
                    };
                }
            }
            catch (err) {
                return {
                    success: false,
                    passwordMatches: null,
                    error: err,
                };
            }
        });
    }
}
exports.default = UserModel;
