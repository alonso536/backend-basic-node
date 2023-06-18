import { validationResult } from "express-validator";
import { Pearl } from "../models/index.js";

export const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

export const isOwn = (req, res, next) => {
    const { _id } = req.auth;

    const id = req.params.id;

    if(_id != id) {
        return res.status(403).json({
            msg: "El recurso no es de tu autoría"
        });
    }

    next();
}