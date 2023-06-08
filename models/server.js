import express from "express";
import cors from "cors";
import { userRoutes } from "../routes/user.js"

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.usersPath, userRoutes);
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