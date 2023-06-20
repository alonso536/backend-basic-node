import "dotenv/config";
import { Server } from "./models/server.js";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const server = new Server();
server.lister();