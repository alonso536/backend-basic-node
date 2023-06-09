import { User } from "../models/user.js";
import { Role } from "../models/role.js";

export const isEmail = (email = "") => {
    const emailRegex = new RegExp(`^[a-zA-Z0-9_.+-]{3,30}@[a-zA-Z0-9-]{3,30}\\.[a-zA-Z0-9-.]{2,10}$`);
    if(!emailRegex.test(email)) {
        throw new Error("El email ingresado no está en un formato correcto");
    }

    return true;
}

export const emailExists = async (email = "") => {
    const emailExists = await User.findOne({ email });
    if(emailExists) {
        throw new Error(`El email ingresado ya está registrado`);
    }
}

export const isRoleValid = async (role = "") => {
    const roleExists = await Role.findOne({ role });
    if(!roleExists) {
        throw new Error(`El rol ${ role } no está registrado en la base de datos`);
    }
}