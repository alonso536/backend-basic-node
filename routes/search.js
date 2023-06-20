import { Router } from "express";
import { search } from "../controllers/search.js";

export const searchRoutes = Router();

searchRoutes.get("/:collection/:document", search);