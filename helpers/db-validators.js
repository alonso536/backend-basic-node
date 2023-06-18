import { User, Category, Role, Pearl } from "../models/index.js";

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
        throw new Error(`El rol ${ rocategoriale } no está registrado en la base de datos`);
    }
}

export const userExists = async (id) => {
    const userExists = await User.findById(id);
    if(!userExists) {
        throw new Error(`No existe un usuario con el id ${id}`);
    }
}

export const categoryExists = async (id) => {
    const categoryExists = await Category.findById(id);
    if(!categoryExists) {
        throw new Error(`No existe una categoria con el id ${id}`);
    }
}

export const pearlExists = async (id) => {
    const pearlExists = await Pearl.findById(id);
    if(!pearlExists) {
        throw new Error(`No existe una perla con el id ${id}`);
    }
}