import { request, response } from "express";
import { Pearl } from "../models/index.js";

const index = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query; 

    const [total, pearls] = await Promise.all([
        Pearl.countDocuments({ active: true }),
        Pearl.find({ active: true })
            .skip(Number(skip))
            .limit(Number(limit))
            .populate("user")
            .populate("category")
            .exec()
    ]);

    res.json({
        pearls,
        total
    });
}

const store = async (req = request, res = response) => {
    const { title, body, category } = req.body;

    const data = {
        title,
        body,
        category,
        user: req.auth._id
    }

    const pearl = new Pearl(data);
    await pearl.save();

    res.status(201).json({
        pearl   
    });
}

const show = async (req = request, res = response) => {
    const id = req.params.id;
    const pearl = await Pearl.findOne({ _id: id })
                            .populate("user")
                            .populate("category")
                            .exec();

    res.json({
        pearl
    });
}

const update = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id } = req.auth;

    const { title, body, category, active, user } = req.body;

    if(user.toString() != _id) {
        return res.status(403).json({
            msg: "El recurso no es de tu autoría"
        });
    }

    const data = {
        title,
        body,
        category,
        user
    }

    const pearlUpdate = await Pearl.findByIdAndUpdate(id, data);
    res.json({
        pearlUpdate
    });
}

const destroy = async (req = request, res = response) => {
    const id = req.params.id;
    const { user, ...pearl } = await Pearl.findOne({ _id: id });
    pearl.active = false;

    const { _id } = req.auth;

    if(user.toString() != _id) {
        return res.status(403).json({
            msg: "El recurso no es de tu autoría"
        });
    }

    const pearlDelete = await Pearl.findByIdAndUpdate(id, pearl);
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
