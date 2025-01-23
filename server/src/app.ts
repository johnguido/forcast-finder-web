import express from "express";
import cors from "cors";
import loginRouter from "./routes/loginRouter";
import emailRouter from "./routes/emailRouter";
import path from "path";
import { config } from "dotenv";

config();

const app = express();

app.enable("strict routing");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/login", loginRouter);
app.use("/email", emailRouter);

const buildPath = path.join(__dirname, "../../client/dist");
app.use(express.static(buildPath));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
