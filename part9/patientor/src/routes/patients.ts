import express from "express";
const router = express.Router();

import patientService from "../services/patientService";

router.get("/", (_req, res) => {
  res.json(patientService.getAllWithoutSsn());
});

export default router;
