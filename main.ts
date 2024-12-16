// main imports
import express from "express";
import { Server } from "http";
import hpp from "hpp";
import Dotenv from "dotenv";
import i18n from "i18n";
import cors from "cors";  
import cookieParser from "cookie-parser";
import path from "path";
import dbConnection from "./src/config/database";
import mountRouts from "./src/index";

const app: express.Application = express();
app.use(express.json({ limit: "10kb" }));

app.use(cors({
  origin: ["http://localhost:4200"],
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));
app.use(cookieParser());

let server: Server;

Dotenv.config();
app.use(express.static("uploads"));
app.use(hpp({ whitelist: ["price"] }));
i18n.configure({
  locales: ["en", "ar"],
  defaultLocale: "en",
  directory: path.join(__dirname, "locales"),
  queryParameter: "lang",
});
app.use(i18n.init);
dbConnection();
mountRouts(app);

server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`Unhandled rejection ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("shutting the app down");
    process.exit(1);
  });
});
