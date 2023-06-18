import {Schema, model} from "mongoose";

const PearlSchema = Schema({
    title: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    body: {
        type: String,
        required: [true, "El cuerpo es obligatorio"]
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
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
},
{
    timestamps: true
}
);

PearlSchema.methods.toJSON = function() {
    const {__v, _id, ...pearl} = this.toObject();
    pearl.uid = _id;
    return pearl;
}

export const Pearl = model("Pearl", PearlSchema);