import { Router } from "express";
import { check } from "express-validator";
import { index, store, update, destroy } from "../controllers/user.js"
import { validateUser } from "../middlewares/validate-user.js";
import { isEmail, emailExists, isRoleValid } from "../helpers/db-validators.js";

export const userRoutes = Router();

userRoutes.get("/", index);

userRoutes.post("/", [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("surname", "El apellido es obligatorio").notEmpty(),
    check("email").custom(isEmail).custom(emailExists),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("role").custom(isRoleValid),
    validateUser
], store);

userRoutes.put("/:id", update);

userRoutes.delete("/", destroy);