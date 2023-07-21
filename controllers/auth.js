import { request, response } from "express";
import { User } from "../models/user.js";
import { generateJWT } from "../helpers/generate-jwt.js";
import bcryptjs from "bcryptjs";
import { googleVerify } from "../helpers/google-verify.js";

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

export const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, surname, email, img } = await googleVerify(id_token);
        
        let user = await User.findOne({ email });

        if(!user) {
            const data = {
                name,
                surname,
                email,
                password: ":P",
                role: "USER",
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if(!user.active) {
            return res.status(401).json({
                msg: "Usuario bloqueado. Hable con el administrador"
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch(error) {

    }
}

export const renewToken = async (req, res) => {
    const { auth } = req;
    const token = await generateJWT(auth.id);

    return res.json({
        auth,
        token
    });
}