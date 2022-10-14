import { Router } from "express";
import {
  createVariable,
  getOneRegistro,
  getAllRegistros,
  updateRegistro,
  deleteRegistro,
  getAllByPlanta,
} from "../controllers/VariableController";

const router = Router();
const prefix = "/variables";
const VerifyToken = require("../middleware/VerifyToken");

router.post(prefix, createVariable);

router.get(prefix + "/:id", getOneRegistro);

router.get(prefix + "/:planta", getAllByPlanta);

router.get(prefix, getAllRegistros);

router.put(prefix + "/:id", updateRegistro);

router.delete(prefix + "/:id", deleteRegistro);

export default router;
