import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectDB from "./config/database";
import routes from "./routes";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = 9000;

app.use(bodyParser.json());

ConnectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use("/", routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is Running Successfully on Port:: ${port}!!`);
});
