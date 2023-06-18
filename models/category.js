import {Schema, model} from "mongoose";
import { User } from "./user.js";

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, "El rol es obligatorio"],
        unique: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
}
);

CategorySchema.methods.toJSON = function() {
    const {__v, _id, ...category} = this.toObject();
    category.uid = _id;
    return category;
}

export const Category = model("Category", CategorySchema);