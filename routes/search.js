import { Router } from "express";
import { check } from "express-validator";
import { search } from "../controllers/search.js";

export const searchRoutes = Router();

searchRoutes.get("/:collection/:document", search);