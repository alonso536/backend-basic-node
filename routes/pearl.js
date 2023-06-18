import { Router } from "express";
import { check } from "express-validator";
import { validateUser, validateJWT } from "../middlewares/index.js";
import { index, store, show, update, destroy } from "../controllers/pearl.js";
import { pearlExists } from "../helpers/db-validators.js";

export const pearlRoutes = Router();

pearlRoutes.get("/", [
    validateJWT,
    validateUser
], index);

pearlRoutes.get("/:id", [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(pearlExists),
    validateUser
], show);

pearlRoutes.post("/", [
    validateJWT,
    check("title", "El titulo es obligatorio").notEmpty(),
    check("body", "El cuerpo es obligatorio").notEmpty(),
    check("category", "La categoría es obligatoria").notEmpty(),
    check("category", "La categoría no existe").isMongoId(),
    validateUser
], store);

pearlRoutes.put("/:id", [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(pearlExists),
    check("title", "El titulo es obligatorio").optional().notEmpty(),
    check("body", "El cuerpo es obligatorio").optional().notEmpty(),
    check("category", "La categoría es obligatoria").optional().notEmpty(),
    check("category", "La categoría no existe").optional().isMongoId(),
    validateUser
], update);

pearlRoutes.delete("/:id", [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(pearlExists),
    validateUser
], destroy);