import { response } from "express";

const usersGet = (req, res = response) => {
    res.json({
        msg: "GET desde el controlador"
    })
}

const usersPost = (req, res = response) => {
    const {title} = req.body;
    res.json({
        msg: "POST desde el controlador",
        title
    })
}

const usersPut = (req, res = response) => {
    res.json({
        msg: "PUT desde el controlador"
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: "DELETE desde el controlador"
    })
}

export {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}
