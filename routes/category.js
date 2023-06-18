import { Router } from "express";
import { check } from "express-validator";
import { validateUser, validateJWT, hasRole } from "../middlewares/index.js";
import { index, store, show, update, destroy } from "../controllers/category.js";
import { categoryExists } from "../helpers/db-validators.js";

export const categoryRoutes = Router();

categoryRoutes.get("/", [
    validateJWT,
    validateUser
], index);

categoryRoutes.get("/:id", [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoryExists),
    validateUser
], show);

categoryRoutes.post("/", [
    validateJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    validateUser
], store);

categoryRoutes.put("/:id", [
    validateJWT,
    hasRole("ADMIN"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoryExists),
    check("name", "El nombre es obligatorio").notEmpty(),
    validateUser
], update);

categoryRoutes.delete("/:id", [
    validateJWT,
    hasRole("ADMIN"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoryExists),
    validateUser
], destroy);