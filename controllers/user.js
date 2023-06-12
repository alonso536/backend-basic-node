import { request, response } from "express";
import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";

const index = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query; 

    const [total, users] = await Promise.all([
        User.countDocuments({ active: true }),
        User.find({ active: true })
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        users,
        total
    });
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
    });
}

const show = async (req = request, res = response) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    res.json({
        user
    });
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
    });
}

const destroy = async (req = request, res = response) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    user.active = false;

    const userDelete = await User.findByIdAndUpdate(id, user);
    const auth = req.auth;

    res.json({
        id,
        auth
    });
}

export {
    index,
    store,
    show,
    update,
    destroy
}
