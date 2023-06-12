import { request, response } from "express";

export const isAdmin = (req = request, res = response, next) => {
    if(!req.auth) {
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token"
        });
    }

    const { role, name } = req.auth;

    if(role !== "ADMIN") {
        return res.status(403).json({
            msg: `${name} no es administrador`
        });
    }

    next();
}

export const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if(!req.auth) {
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token"
            });
        }

        if(!roles.includes(req.auth.role)) {
            return res.status(403).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }
        next();
    }
}