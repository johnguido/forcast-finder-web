"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const loginRouter = (0, express_1.default)();
loginRouter.get("/register/checkIfUserEmailExists/:email", loginController_1.default.checkIfUserEmailExists);
loginRouter.get("/user/verify/:email/:password", loginController_1.default.verifyUser);
loginRouter.post("/register/user/:firstName/:lastName/:email/:password", loginController_1.default.regiserUser);
loginRouter.post("/forgotPassword/:email/:newPassword", loginController_1.default.setNewPasswordForUser);
exports.default = loginRouter;
