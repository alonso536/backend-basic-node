import { request, response } from "express";
import { uploadFile } from "../helpers/upload-file.js";
import { Pearl, User } from "../models/index.js";
import { __dirname } from "../app.js";
import fs from "fs";

const upload = async (req = request, res = response) => {
    try {
        const msg = await uploadFile(req.files, ["sql", "txt"]);

        return res.json({
            msg
        });
    } catch(error) {
        return res.status(400).json({
            error
        });
    }
}

const showImg = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch(collection) {
        case "users":
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Error en la validación`
            });
    }

    if(model.img) {
        const pathImg = `${__dirname}/uploads/${collection}/${model.img}`;
        if(fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    const defaultImg = `${__dirname}/assets/no-image.jpg`;

    return res.sendFile(defaultImg);
}

const updateImg = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch(collection) {
        case "users":
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Error en la validación`
            });
    }

    if(model.img) {
        const pathImg = `${__dirname}/uploads/${collection}/${model.img}`;
        if(fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const msg = await uploadFile(req.files, undefined, collection + "/");
    model.img = msg;

    await model.save();

    return res.json(model);
}

export {
    upload,
    showImg,
    updateImg
}