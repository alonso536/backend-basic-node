import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import { User, Category, Pearl } from "../models/index.js";

const allowCollections = [
    'users',
    'categories',
    'pearls'
];

const searchUsers = async (document = "", res = response) => {
    const isMongoId = isValidObjectId(document);

    if(isMongoId) {
        const user = await User.findById(document);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regexp = new RegExp(document, "i");

    const users = await User.find({ 
        $or: [{ name: regexp }, { email: regexp }],
        $and: [{ active: true }]
    });
    return res.json({
        results: users
    });
}

const searchCategories = async (document = "", res = response) => {
    const isMongoId = isValidObjectId(document);

    if(isMongoId) {
        const category = await Category.findById(document);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regexp = new RegExp(document, "i");

    const categories = await Category.find({ name: regexp });
    return res.json({
        results: categories
    });
}

const searchPearls = async (document = "", res = response) => {
    const isMongoId = isValidObjectId(document);

    if(isMongoId) {
        const pearl = await Pearl.findById(document);
        return res.json({
            results: (pearl) ? [pearl] : []
        });
    }

    const regexp = new RegExp(document, "i");

    const pearls = await Pearl.find({
        $or: [{ title: regexp }, { body: regexp }],
        $and: [{ active: true }] 
    });
    return res.json({
        results: pearls
    });
}

export const search = (req = request, res = response) => {
    const { collection, document } = req.params;

    if(!allowCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son : ${allowCollections}`
        });
    }

    switch(collection) {
        case 'users':
            searchUsers(document, res);
            break;
        case 'categories':
            searchCategories(document, res);
            break;
        case 'pearls':
            searchPearls(document, res)
            break;
        default:
            return res.status(500).json({
                msg: "Busqueda fallida"
            });
    }
}