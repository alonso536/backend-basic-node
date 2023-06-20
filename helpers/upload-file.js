import { __dirname, __filename } from "../app.js";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = (files, validExtentions = ["png", "jpg", "jpeg"], folder = "") => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const extention = file.name.split(".").at(-1);

        if(!validExtentions.includes(extention)) {
            return reject(`La extensión ${extention} no es permitida`);
        }

        const fileName = uuidv4() + "." + extention;
        const uploadPath = `${__dirname}/uploads/${folder}${fileName}`; 

        file.mv(uploadPath, error => {
            if(error) {
                return reject(error);
            }
            resolve(fileName);
        })
    });

    
}