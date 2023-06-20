import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { userRoutes, authRoutes, categoryRoutes, pearlRoutes, searchRoutes, uploadsRoutes } from "../routes/index.js";
import { dbConnection } from "../database/config.js";

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            users: "/api/users",
            categories: "/api/categories",
            pearls: "/api/pearls",
            search: "/api/search",
            uploads: "/api/uploads"
        }

        this.database();

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.categories, categoryRoutes);
        this.app.use(this.paths.pearls, pearlRoutes);
        this.app.use(this.paths.search, searchRoutes);
        this.app.use(this.paths.uploads, uploadsRoutes);
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static("./public"));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/"
        }));
    }

    lister() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}