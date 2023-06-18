import { request, response } from "express";
import { Category } from "../models/index.js";

const index = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query; 

    const [total, categories] = await Promise.all([
        Category.countDocuments({ active: true }),
        Category.find({ active: true })
            .skip(Number(skip))
            .limit(Number(limit))
            .populate("user")
            .exec()
    ]);

    res.json({
        categories,
        total
    });
}

const store = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if(categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${categoryDB.name}, ya existe`
        });
    }

    const data = {
        name,
        user: req.auth._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json({
        category   
    });
}

const show = async (req = request, res = response) => {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id })
                            .populate("user")
                            .exec();

    res.json({
        category
    });
}

const update = async (req = request, res = response) => {
    const id = req.params.id;
    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.auth._id
    }

    const categoryUpdate = await Category.findByIdAndUpdate(id, data);
    res.json({
        categoryUpdate
    });
}

const destroy = async (req = request, res = response) => {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    category.active = false;

    const categoryDelete = await Category.findByIdAndUpdate(id, category);
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


