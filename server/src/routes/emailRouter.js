"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailController_1 = __importDefault(require("../controllers/emailController"));
const emailRouter = (0, express_1.default)();
emailRouter.post("/sendPinToEmail/:email/:pin", emailController_1.default.sendPinToEmail);
exports.default = emailRouter;
