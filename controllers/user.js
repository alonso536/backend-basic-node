import { request, response } from "express";
import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";

const index = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: "GET desde el controlador",
        query
    })
}

const store = async (req = request, res = response) => {
    const { name, surname, email, password, role} = req.body;

    const user = new User({
        name,
        surname,
        email,
        password: bcryptjs.hashSync(password, bcryptjs.genSaltSync()),
        role
    });

    await user.save();
    res.json({
        user
    })
}

const update = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, email, password, google, ...user } = req.body;

    if(password) {
        user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
    }

    const userUpdate = await User.findByIdAndUpdate(id, user);
    res.json({
        userUpdate
    })
}

const destroy = (req = request, res = response) => {
    res.json({
        msg: "DELETE desde el controlador"
    })
}

export {
    index,
    store,
    update,
    destroy
}
