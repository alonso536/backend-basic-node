import { Router } from "express";
import { check } from "express-validator";
import { validateUser, validateJWT, validateFile } from "../middlewares/index.js";
import { upload, showImg, updateImgCloudinary } from "../controllers/upload.js";
import { allowCollections } from "../helpers/db-validators.js";

export const uploadsRoutes = Router();

uploadsRoutes.get("/:collection/:id", [
    check("id", "Debe ser un id válido").isMongoId(),
    check("collection").custom(c => allowCollections(c, ["users"])),
    validateUser
], showImg);

uploadsRoutes.post("/", upload);

uploadsRoutes.put("/:collection/:id", [
    validateFile,
    check("id", "Debe ser un id válido").isMongoId(),
    check("collection").custom(c => allowCollections(c, ["users"])),
    validateUser
], updateImgCloudinary);