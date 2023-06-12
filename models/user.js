import {Schema, model} from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    surname: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"], 
        unique: true
    },
    password: {
        type: String,
        required: [true, "El contraseña es obligatoria"], 
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "USER"]
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
}
);

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export const User = model("User", UserSchema);