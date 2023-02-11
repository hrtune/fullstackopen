import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

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

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body || !req.body.daily_exercises || !req.body.target) {
    console.log(req.body);
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (
    !Array.isArray(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isNaN(daily_exercises.reduce((p, n) => Number(n) * p, 1)) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const parsedDailyExercises = daily_exercises.map((n) => Number(n));
  const parsedTarget = Number(target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(parsedDailyExercises, parsedTarget);

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
