import { request, response } from "express";

const usersGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: "GET desde el controlador",
        query
    })
}

const usersPost = (req = request, res = response) => {
    const {title} = req.body;
    res.json({
        msg: "POST desde el controlador",
        title
    })
}

const usersPut = (req = request, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "PUT desde el controlador",
        id
    })
}

const usersDelete = (req = request, res = response) => {
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
