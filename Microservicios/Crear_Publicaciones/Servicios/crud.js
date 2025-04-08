import {Mongo_CRUD} from "../Modelos/estructura.js";

import dotenv from "dotenv";
dotenv.config();


export const Crear_Publicacion = async (req, res) =>{

    const { Usuario, Descripcion, Imagen, Direccion, Likes } = req.body;
    try {
        const resultado = await Mongo_CRUD.create(
            {
                Usuario: Usuario,
                Descripcion: Descripcion,
                Imagen: Imagen,
                Direccion: Direccion,
                Likes: Likes
            }
        );

        const Respuesta = {
            Estado: true,
            Respuesta: "Publicación creada correctamente",
            Contenido: {
                Id: resultado._id,
                Imagen: resultado.Imagen                

            }
        }

        return Respuesta;

       
    } catch (error) {

        const Respuesta = {
            Estado: false,
            Respuesta: "Error al crear la publicación"
        }

        return Respuesta;
    }
}


export const Actualizar_Publicacion = async (req, res) =>{

    const { Id , Usuario, Descripcion, Imagen, Direccion } = req.body;

    try {
        
        const resultado = await Mongo_CRUD.findByIdAndUpdate(
            Id , // Condición de búsqueda
            {   
                Usuario: Usuario,
                Descripcion: Descripcion,
                Imagen: Imagen,
                Direccion: Direccion
            },{
            new: true
        });

        const Respuesta = {
            Estado: true,
            Respuesta: "Publicación actualizada correctamente",
            Contenido: resultado
        }

        return Respuesta;


    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al actualizar la publicación"
        }

        return Respuesta;
    }



}


export const Actualizar_Likes = async (req, res) =>{

    const { Id , Likes } = req.body;

    try {
        
        const resultado = await Mongo_CRUD.findByIdAndUpdate(
            Id , // Condición de búsqueda
            {   
                Likes: Likes
            },{
            new: true
        });

        const Respuesta = {
            Estado: true,
            Respuesta: "Like Correcto",
            Contenido: resultado
        }

        return Respuesta;


    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al dar like"
        }

        return Respuesta;
    }



}


export const Leer_Id = async (req, res) =>{

    try {
        const resultado = await Mongo_CRUD.findById(req.body.Id);


        const Respuesta = {
            Estado: true,
            Respuesta: {
                Usuario: resultado.Usuario,
                Descripcion: resultado.Descripcion,
                Imagen: resultado.Imagen,
                Direccion: resultado.Direccion,
                Likes: resultado.Likes
            }
        }

        return Respuesta;

       
    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer la publicación"
        }

        return Respuesta;
    }
}

export const Leer_General = async (req, res) =>{

    try {
        const result = await Mongo_CRUD.find({})
        .sort({ createdAt: -1 }) // Orden descendente por fecha (los más recientes primero).
        .limit(5); // Limitar a 5 resultados.

        const Respuesta = {
            Estado: true,
            Respuesta: {result}
        }

        return Respuesta;

       
    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer las publicaciones"
        }

        return Respuesta;
    }
}


export const Leer_Usuario = async (req, res) =>{
    const { Usuario } = req.params;


    try {
        const result = await Mongo_CRUD.find({Usuario})
        .sort({ createdAt: -1 }) // Orden descendente por fecha (los más recientes primero).
        .limit(5); // Limitar a 5 resultados.

        const Respuesta = {
            Estado: true,
            Respuesta: result
        }

        return Respuesta;

       
    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer las publicaciones"
        }

        return Respuesta;
    }
}



export const Leer_Id_General = async (req, res) =>{
    const { Id } = req.params;

    try {


        const result = await Mongo_CRUD.find({
            _id: { $lt: Id } // Busca documentos con IDs menores.
        })
        .sort({ createdAt: -1 }) // Orden descendente por fecha (los más recientes primero).
        .limit(5); // Limitar a 5 resultados.

        const Respuesta = {
            Estado: true,
            Respuesta: result
        }

        return Respuesta;

       
    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer las publicaciones"
        }

        return Respuesta;
    }
}


export const Leer_Id_Usuario = async (req, res) =>{
    const { Id, Usuario } = req.params;

    try {


        const result = await Mongo_CRUD.find({
            _id: { $lt: Id }, // Busca documentos con IDs menores.
            Usuario: Usuario
        })
        .sort({ createdAt: -1 }) // Orden descendente por fecha (los más recientes primero).
        .limit(5); // Limitar a 5 resultados.

        const Respuesta = {
            Estado: true,
            Respuesta: result
        }

        return Respuesta;

       
    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer las publicaciones"
        }

        return Respuesta;
    }
}




export const Eliminar_Id = async (req, res) =>{

    try {
        const resultado = await Mongo_CRUD.findByIdAndDelete(req.body.Id);

        if (!resultado) {
            // Si no se encuentra el documento para eliminar
            return Respuesta = {
                Estado: false,
                Respuesta: "No se encontró la publicación"
            }
        }

        const Respuesta = {
            Estado: true,
            Respuesta: "Se elimino correctamente"
        }

        return Respuesta;

       
    } catch (error) {
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al eliminar la publicación"
        }

        return Respuesta;
    }
}
