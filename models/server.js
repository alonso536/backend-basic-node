import express from "express";
import cors from "cors";
import { userRoutes } from "../routes/user.js";
import { authRoutes } from "../routes/auth.js";
import { dbConnection } from "../database/config.js";
import { categoryRoutes } from "../routes/category.js";

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            users: "/api/users",
            categories: "/api/categories"
        }

        this.database();

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.categories, categoryRoutes);
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static("./public"));
    }

    lister() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}