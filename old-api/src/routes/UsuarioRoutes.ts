import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByRol,
  login,
  updateUser,
} from "../controllers/UsuarioController";
const verifyToken = require("../middleware/VerifyToken");

const router = Router();
const prefix = "/users";

router.post(prefix, createUser);

router.post(prefix + "/login", login);

router.get(prefix + "/getById/:id", getUserById);

router.get(prefix + "/getByRol/:rol", getUserByRol);

router.get(prefix, getAllUsers);

router.put(prefix + "/:id", updateUser);

router.delete(prefix + "/:id", deleteUser);

export default router;
