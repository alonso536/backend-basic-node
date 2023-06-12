import { request, response } from "express";
import { User } from "../models/user.js";
import { generateJWT } from "../helpers/generate-jwt.js";
import bcryptjs from "bcryptjs";

export const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                msg: "Datos incorrectos - email"
            });
        }

        if(!user.active) {
            return res.status(400).json({
                msg: "Datos incorrectos - active = false"
            });
        }

        if(!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: "Datos incorrectos - password"
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            msg: "Ha ocurrido un error. Hable con el administrador"
        });
    }    
}