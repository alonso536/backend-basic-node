import express from "express";
import cors from "cors";
import { userRoutes } from "../routes/user.js";
import { authRoutes } from "../routes/auth.js";
import { dbConnection } from "../database/config.js";

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = "/api/users";
        this.authPath = "/api/auth";

        this.database();

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.usersPath, userRoutes);
        this.app.use(this.authPath, authRoutes)
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