import { request, response } from "express";
import { uploadFile } from "../helpers/upload-file.js";

export const upload = async (req = request, res = response) => {
    if(!req.files) {
        return res.status(400).json({
            msg: "No se ha subido ningún archivo"
        });
    }

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