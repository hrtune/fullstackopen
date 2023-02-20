import express from "express";
import diagnosisService from "../services/diagnosisService";
import { toNewDiagnosis } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnosisService.getAll();
  return res.json(diagnoses);
});

router.post("/", (req, res) => {
  try {
    const diagnosis = toNewDiagnosis(req.body);
    diagnosisService.add(diagnosis);
    console.log("add diagnosis:", diagnosis.code);
    return res.status(201).json(diagnosis);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    return res.status(500).json(error);
  }
});

export default router;
