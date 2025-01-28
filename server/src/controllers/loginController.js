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
const userModel_1 = __importDefault(require("../models/userModel"));
class LoginController {
    static verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.params;
            const response = yield userModel_1.default.verifyUser(email, password);
            res.send({ success: response });
        });
    }
    static checkIfUserEmailExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const response = yield userModel_1.default.checkIfUserEmailExists(email);
            res.send({
                success: response.success,
                userEmailExists: response.emailExists,
                error: response.error,
            });
        });
    }
    static regiserUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = req.params;
            const response = yield userModel_1.default.registerUser(firstName, lastName, email, password);
            res.send({
                success: response.success,
                userID: response.userID,
                error: response.error,
            });
        });
    }
    static setNewPasswordForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, newPassword } = req.params;
            const response = yield userModel_1.default.setNewPasswordForUser(email, newPassword);
            res.send({
                success: response.success,
                passwordMatches: response.passwordMatches,
                error: response.error,
            });
        });
    }
}
exports.default = LoginController;
