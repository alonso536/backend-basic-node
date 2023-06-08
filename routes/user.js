import { Router } from "express";
import { usersGet, usersPost, usersPut, usersDelete } from "../controllers/user.js"

export const userRoutes = Router();

userRoutes.get("/", usersGet);

userRoutes.post("/", usersPost);

userRoutes.put("/", usersPut);

userRoutes.delete("/", usersDelete);