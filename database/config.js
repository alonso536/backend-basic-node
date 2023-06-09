import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Conexion a la base de datos llevada a cabo con exito.");

    } catch(error) {
        console.log(error);
        throw new Error("Error en la conexión a la base de datos.");
    }
}