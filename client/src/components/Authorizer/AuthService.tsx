import axios from "axios";

interface AuthResponse {
  success?: boolean | null;
  passwordMatches?: boolean | null;
  userEmailExists?: boolean | null;
  pinSentToEmail?: boolean | null;
  userID?: string | null;
}

class AuthService {
  private static baseURL: string = "http://localhost:3000";

  static async loginUser(email: string, password: string) {
    try {
      const url = `${this.baseURL}/login/user/verify/${email}/${password}`;

      const response = await axios.get(url);

      return { user: response.data.success.user };
    } catch (error) {
      console.error("Error signing user in: ", error);
      return { user: null };
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
      const url = `${this.baseURL}/login/register/user/${firstName}/${lastName}/${email}/${systemID}/${password}`;

      const response = await axios.post(url);

      return { userID: response.data.userID };
    } catch (error) {
      console.error("Error registering user: ", error);
      return { userID: null };
    }
  }

  static async checkIfUserEmailExists(email: string): Promise<AuthResponse> {
    try {
      const url = `${this.baseURL}/login/register/checkIfUserEmailExists/${email}`;

      const response = await axios.get(url);

      return { userEmailExists: response.data.userEmailExists };
    } catch (error) {
      console.error(
        "Error checking if user email exists within the database: ",
        error
      );

      return { userEmailExists: null };
    }
  }

  static async setNewPasswordForUser(
    email: string,
    newPassword: string
  ): Promise<AuthResponse> {
    try {
      const url = `${this.baseURL}/login/forgotPassword/${email}/${newPassword}`;

      const response = await axios.post(url);

      return {
        success: response.data.success,
        passwordMatches: response.data.passwordMatches,
      };
    } catch (error) {
      console.error("Error setting new password for user", error);

      return { success: false };
    }
  }

  static async sendPinToEmail(
    email: string,
    pin: string
  ): Promise<AuthResponse> {
    try {
      const url = `${this.baseURL}/email/sendPinToEmail/${email}/${pin}`;

      const response = await axios.post(url);

      return { pinSentToEmail: response.data.pinSentToEmail };
    } catch (error) {
      console.error(
        "Error checking if user email exists within the database: ",
        error
      );
      return { pinSentToEmail: false };
    }
  }
}

export default AuthService;
