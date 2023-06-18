import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import { validateUser } from "../middlewares/validate-user.js";

export const authRoutes = Router();

authRoutes.post("/login", [
    check("email", "El email es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validateUser
], login);

authRoutes.post("/google", [
    check("id_token", "El id_token es obligatorio"),
    validateUser
], googleSignIn);