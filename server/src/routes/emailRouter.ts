import Router from "express";
import EmailController from "../controllers/emailController";

const emailRouter = Router();

emailRouter.post("/sendPinToEmail/:email/:pin", EmailController.sendPinToEmail);

export default emailRouter;
