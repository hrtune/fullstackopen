import express from "express";
const router = express.Router();

import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";

router.get("/", (_req, res) => {
  res.json(patientService.getAllWithoutSsn());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientService.getById(id);
    return res.json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(404).send(error.message);
    } else {
      console.log(error);
      return res.status(500).send("Somethng wrong.");
    }
  }
});

router.post("/", (req, res) => {
  try {
    const patient = toNewPatient(req.body);
    return res.status(201).json(patientService.addPatient(patient));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send("Something went wrong.");
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    const entry = toNewEntry(req.body);
    return res.status(201).json(patientService.addEntry(id, entry));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send("Something went wrong.");
  }
});

export default router;
