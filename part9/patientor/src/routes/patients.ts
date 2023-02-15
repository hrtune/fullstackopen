import express from "express";
const router = express.Router();

import patientService from "../services/patientService";
import { NewPatient } from "../types";

router.get("/", (_req, res) => {
  res.json(patientService.getAllWithoutSsn());
});

router.post("/", (req, res) => {
  const patient = req.body as NewPatient;
  res.status(201).json(patientService.addPatient(patient));
});

export default router;
