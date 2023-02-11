import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height * weight)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const message = calculateBmi(height, weight);
  const responseObject = {
    height,
    weight,
    bmi: message,
  };
  return res.json(responseObject);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/hello`);
});
