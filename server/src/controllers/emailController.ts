import formData from "form-data";
import Mailgun from "mailgun.js";

class EmailController {
  private static mailgunClient: any;

  private static initializeMailgun() {
    try {
      const mailgun = new Mailgun(formData);

      if (!process.env.MAILGUN_API_KEY) {
        throw new Error("MAILGUN_API_KEY environment variable is required");
      }

      EmailController.mailgunClient = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY,
      });

      return true;
    } catch (error) {
      console.error("Failed to initialize Mailgun client:", error);
      return false;
    }
  }

  static async sendPinToEmail(req, res): Promise<void> {
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
      const msg = await EmailController.mailgunClient.messages.create(
        "sandbox178507ca98d44b498cc24dba72887679.mailgun.org",
        {
          from: "Desktop Aquaponics <desktopaquaponicshelp@gmail.com>",
          to: [email],
          subject: "Desktop Aquaponics Email Verification",
          text: `Here is your 6 digit pin: ${pin}`,
        }
      );

      res.send({ pinSentToEmail: true });
    } catch (err) {
      console.error("There was an error sending pin to email:", err);
      res.send({
        pinSentToEmail: false,
        error: "Failed to send email",
      });
    }
  }
}

export default EmailController;
