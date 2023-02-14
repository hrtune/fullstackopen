import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

import diagnosisRouter from "./routes/diagnoses";

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("ping pong");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
