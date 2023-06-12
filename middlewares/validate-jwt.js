import jwt from "jsonwebtoken";
import { request, response } from "express";
import { User } from "../models/user.js";

export const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    if(!token) {
        return res.status(401).json({
            msg: "No se encontró el token"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const authUser = await User.findOne({ _id: uid });

        if(!authUser) {
            return res.status(401).json({
                msg: "El usuario no existe"
            });
        }

        if(!authUser.active) {
            return res.status(401).json({
                msg: "El usuario ha cerrado su cuenta"
            });
        }

        req.auth = authUser;

        next();
    } catch(error) {
        return res.status(401).json({
            msg: "Token inválido"
        });
    }
}