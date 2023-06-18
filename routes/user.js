import { Router } from "express";
import { check } from "express-validator";
import { index, store, show, update, destroy } from "../controllers/user.js"
import { isEmail, emailExists, isRoleValid, userExists } from "../helpers/db-validators.js";
import { validateJWT, validateUser, hasRole } from "../middlewares/index.js";
import { isOwn } from "../middlewares/validate-user.js";


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

userRoutes.get("/:id", [
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(userExists),
    validateUser
], show);

userRoutes.put("/:id", [
    validateJWT,
    isOwn,
    check("id").isMongoId(),
    check("id").custom(userExists),
    check("role").optional().custom(isRoleValid),
    validateUser
], update);

userRoutes.delete("/:id", [
    validateJWT,
    hasRole("ADMIN"),
    check("id").isMongoId(),
    check("id").custom(userExists),
    validateUser
], destroy); 