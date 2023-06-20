import { Router } from "express";
import { check } from "express-validator";
import { validateUser, validateJWT } from "../middlewares/index.js";
import { upload } from "../controllers/upload.js";

export const uploadsRoutes = Router();

uploadsRoutes.post("/", upload);