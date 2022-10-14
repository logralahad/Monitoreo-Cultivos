import { Router } from "express";
import {
  createPlanta,
  deletePlanta,
  getAllPlantas,
  getPlantaById,
  updatePlanta,
} from "../controllers/PlantaController";
const VerifyToken = require("../middleware/VerifyToken");

const router = Router();
const prefix = "/plantas";

router.post(prefix, createPlanta);

router.get(prefix + "/:id", getPlantaById);

router.get(prefix, getAllPlantas);

router.put(prefix + "/:id", updatePlanta);

router.delete(prefix + "/:id", deletePlanta);

export default router;
