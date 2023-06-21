import { request, response } from "express";

export const validateFile = (req = request, res = response, next) => {
    if(!req.files) {
        return res.status(400).json({
            msg: "No se ha subido ningún archivo"
        });
    }

    next();
}