import userModel from "../models/userModel";

class LoginController {
  static async verifyUser(req, res): Promise<void> {
    const { email, password } = req.params;

    const response = await userModel.verifyUser(email, password);

    res.send({ success: response });
  }

  static async checkIfUserEmailExists(req, res): Promise<void> {
    const { email } = req.params;

    const response = await userModel.checkIfUserEmailExists(email);

    res.send({
      success: response.success,
      userEmailExists: response.emailExists,
      error: response.error,
    });
  }

  static async regiserUser(req, res): Promise<void> {
    const { firstName, lastName, email, systemID, password } = req.params;

    const response = await userModel.registerUser(
      firstName,
      lastName,
      email,
      systemID,
      password
    );

    res.send({
      success: response.success,
      userID: response.userID,
      error: response.error,
    });
  }

  static async setNewPasswordForUser(req, res): Promise<void> {
    const { email, newPassword } = req.params;

    const response = await userModel.setNewPasswordForUser(email, newPassword);

    res.send({
      success: response.success,
      passwordMatches: response.passwordMatches,
      error: response.error,
    });
  }
}

export default LoginController;
