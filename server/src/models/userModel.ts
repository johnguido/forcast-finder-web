import crypto from "crypto";
import database from "./database";
import bcrypt from "bcrypt";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface UserModelResponse {
  success: boolean | null;
  user?: User | null;
  emailExists?: boolean | null;
  userID?: string | null;
  passwordMatches?: boolean | null;
  error?: any;
}

class UserModel {
  static async verifyUser(email: string, password: string) {
    try {
      await database.initialize();

      const response = await database
        .getPool()
        .query(
          "SELECT id, first_name, last_name, password FROM users WHERE email = $1",
          [email]
        );

      if (response.rows.length > 0) {
        const hashedPassword = response.rows[0].password;
        const passwordMatches = await bcrypt.compare(password, hashedPassword);

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
    } catch (err) {
      console.error("Error verifying user:", err);
      return {
        success: false,
        error: err,
      };
    }
  }

  static async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    systemID: string,
    password: string
  ) {
    try {
      await database.initialize();

      const userID = crypto.randomUUID().replace(/-/g, "");

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await database
        .getPool()
        .query(
          "INSERT INTO users (id, first_name, last_name, email, password, created_at, updated_at, deleted_at, is_active, system_id) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, true, $6)",
          [userID, firstName, lastName, email, hashedPassword, systemID]
        );

      return {
        userID: userID,
        success: true,
      };
    } catch (error) {
      console.error("Register user database error:", error);
      return {
        userID: null,
        success: false,
        error: error,
      };
    }
  }

  static async checkIfUserEmailExists(
    email: string
  ): Promise<UserModelResponse> {
    try {
      await database.initialize();

      const response = await database
        .getPool()
        .query("SELECT email FROM users WHERE email = $1", [email]);

      return {
        success: true,
        emailExists: response.rows.length > 0,
      };
    } catch (err) {
      return {
        success: false,
        emailExists: null,
        error: err,
      };
    }
  }

  static async setNewPasswordForUser(
    email: string,
    newPassword: string
  ): Promise<UserModelResponse> {
    try {
      await database.initialize();

      const response = await database
        .getPool()
        .query("SELECT password FROM users WHERE email = $1", [email]);

      if (response.rows.length > 0) {
        const hashedPassword = response.rows[0].password;
        const passwordMatches = await bcrypt.compare(
          newPassword,
          hashedPassword
        );

        if (passwordMatches) {
          return {
            success: false,
            passwordMatches: true,
          };
        } else {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(newPassword, salt);

          const response = await database
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

          console.log(
            "Something very strange happened trying to set password for user, row count zero"
          );
          return {
            success: false,
            passwordMatches: null,
          };
        }
      } else {
        console.log(
          "Something very strange happened trying to set password for user"
        );
        return {
          success: false,
          passwordMatches: null,
        };
      }
    } catch (err) {
      return {
        success: false,
        passwordMatches: null,
        error: err,
      };
    }
  }
}

export default UserModel;
