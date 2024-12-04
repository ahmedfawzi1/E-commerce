// main imports
import express from "express";
import Dotenv from "dotenv";
import dbConnection from "./src/config/database";
import mountRouts from "./src/index";

const app: express.Application = express();
app.use(express.json({ limit: "10kb" }));

Dotenv.config();
dbConnection();
mountRouts(app);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
