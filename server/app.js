import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.js";

const app = express();
app.use(cors());

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
