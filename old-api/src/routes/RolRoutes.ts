import { Router } from "express";
import {
  createRol,
  deleteRol,
  getAllRoles,
  getRolById,
  updateRol,
} from "../controllers/RolController";
const VerifyToken = require("../middleware/VerifyToken");

const router = Router();
const prefix = "/roles";

router.post(prefix, createRol);

router.get(prefix + "/:id", getRolById);

router.get(prefix, getAllRoles);

router.put(prefix + "/:id", updateRol);

router.delete(prefix + "/:id", deleteRol);

export default router;
