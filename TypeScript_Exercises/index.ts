import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello full stack!!!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    if (Number(height) <= 0 || Number(weight) <= 0) {
      res.send({ error: "numbers height and weight must both be positive" });
    } else {
      const bmi = calculateBmi(Number(height), Number(weight));
      res.send({
        weight,
        height,
        bmi,
      });
    }
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  if (!daily_exercises || !target) {
    return res.send({error: "missing arguments"});
  }
  if (isNaN(Number(target))) {
    return res.send({error: "invalid input for target"});
  }
  if (!(daily_exercises instanceof Array)) {
    return res.send({error: "Daily exercises should be passed as an array"});
  }
  if (daily_exercises.filter(de => isNaN(Number(de))).length) {
    return res.send({error: "Daily exercises must be an array of numbers only"});
  }
  const exerciseResults = calculateExercises(daily_exercises.map(de => Number(de)), Number(target));
  return res.send(exerciseResults);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
