import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const generateJWT = (uid = "") => {
    return new Promise((res, rej) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"
        }, (err, token) => {
            if(err) {
                console.log(err);
                rej("No se pudo generar el token");
            } else {
                res(token);
            }
        });
    });
}

export const comproveJWT = async (token) => {
    try {
        if(token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.find({ _id: uid, active: true } );

        if(user) {
            return user[0];
        }

        return null;

    } catch(error) {
        return null;
    }
}