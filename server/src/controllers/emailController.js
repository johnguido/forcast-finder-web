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
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
class EmailController {
    static initializeMailgun() {
        try {
            const mailgun = new mailgun_js_1.default(form_data_1.default);
            if (!process.env.MAILGUN_API_KEY) {
                throw new Error("MAILGUN_API_KEY environment variable is required");
            }
            EmailController.mailgunClient = mailgun.client({
                username: "api",
                key: process.env.MAILGUN_API_KEY,
            });
            return true;
        }
        catch (error) {
            console.error("Failed to initialize Mailgun client:", error);
            return false;
        }
    }
    static sendPinToEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!EmailController.mailgunClient) {
                const initialized = EmailController.initializeMailgun();
                if (!initialized) {
                    res.send({
                        pinSentToEmail: false,
                        error: "Email service configuration error",
                    });
                    return;
                }
            }
            const { email, pin } = req.params;
            try {
                const msg = yield EmailController.mailgunClient.messages.create("sandbox178507ca98d44b498cc24dba72887679.mailgun.org", {
                    from: "Forcast Finder <forcastfinder@gmail.com>",
                    to: [email],
                    subject: "Forcast Finder Email Verification",
                    text: `Here is your 6 digit pin: ${pin}`,
                });
                res.send({ pinSentToEmail: true });
            }
            catch (err) {
                console.error("There was an error sending pin to email:", err);
                res.send({
                    pinSentToEmail: false,
                    error: "Failed to send email",
                });
            }
        });
    }
}
exports.default = EmailController;
