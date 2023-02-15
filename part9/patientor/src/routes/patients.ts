import express from "express";
const router = express.Router();

import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

router.get("/", (_req, res) => {
  res.json(patientService.getAllWithoutSsn());
});

router.post("/", (req, res) => {
  try {
    const patient = toNewPatient(req.body);
    console.log("added:", patient);
    return res.status(201).json(patientService.addPatient(patient));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
    return res.status(400).send("Something went wrong.");
  }
});

export default router;
