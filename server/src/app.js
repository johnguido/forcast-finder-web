"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const emailRouter_1 = __importDefault(require("./routes/emailRouter"));
const locationRouter_1 = __importDefault(require("./routes/locationRouter"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.enable("strict routing");
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use("/login", loginRouter_1.default);
app.use("/email", emailRouter_1.default);
app.use("/location", locationRouter_1.default);
const buildPath = path_1.default.join(__dirname, "../../client/dist");
app.use(express_1.default.static(buildPath));
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});
