import express from "express";
import bodyParser from 'body-parser';

import { calculator } from "./calculator";
const app = express();
app.use(bodyParser.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {value1, value2, op} = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.sendStatus(400).send({error: 'Wtf'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.send(result.toString());
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
