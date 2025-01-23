import Router from "express";
import LoginController from "../controllers/loginController";

const loginRouter = Router();

loginRouter.get(
  "/register/checkIfUserEmailExists/:email",
  LoginController.checkIfUserEmailExists
);

loginRouter.get("/user/verify/:email/:password", LoginController.verifyUser);

loginRouter.post(
  "/register/user/:firstName/:lastName/:email/:systemID/:password",
  LoginController.regiserUser
);

loginRouter.post(
  "/forgotPassword/:email/:newPassword",
  LoginController.setNewPasswordForUser
);

export default loginRouter;
