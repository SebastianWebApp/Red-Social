import {Crear_Publicacion, Actualizar_Publicacion, Actualizar_Likes, Leer_Id, Leer_General, Leer_Id_General, Leer_Usuario, Leer_Id_Usuario, Eliminar_Id} from "../Servicios/crud.js"

export const Crear = async (req, res) => {

    const Crear_Nueva_Publicacion = await Crear_Publicacion(req,res);


    if(Crear_Nueva_Publicacion.Estado){
        res.status(200).json({
    
            Estado: Crear_Nueva_Publicacion.Estado,
            Respuesta: Crear_Nueva_Publicacion.Respuesta,
            Contenido: Crear_Nueva_Publicacion.Contenido
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Crear_Nueva_Publicacion.Estado,
            Respuesta: Crear_Nueva_Publicacion.Respuesta
           
        });
    }



}

export const Actualizar_Post = async (req, res) => {

    const Actualizar = await Actualizar_Publicacion(req,res);


    if(Actualizar.Estado){
        res.status(200).json({
    
            Estado: Actualizar.Estado,
            Respuesta: Actualizar.Respuesta,
            Contenido: Actualizar.Contenido

           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Actualizar.Estado,
            Respuesta: Actualizar.Respuesta
           
        });
    }



}

export const Actualizar_Interaccion = async (req, res) => {

    const Actualizar = await Actualizar_Likes(req,res);


    if(Actualizar.Estado){
        res.status(200).json({
    
            Estado: Actualizar.Estado,
            Respuesta: Actualizar.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Actualizar.Estado,
            Respuesta: Actualizar.Respuesta
           
        });
    }



}


export const Leer_Publicacion = async (req, res) => {

    const Leer = await Leer_Id(req,res);


    if(Leer.Estado){
        res.status(200).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }



}

export const Leer_Publicaciones_General = async (req, res) => {

    const Leer = await Leer_General(req,res);


    if(Leer.Estado){
        res.status(200).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }



}

export const Leer_Paginacion_General = async (req, res) => {

    const Leer = await Leer_Id_General(req,res);


    if(Leer.Estado){
        res.status(200).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }



}

export const Leer_Publicaciones_Usuario = async (req, res) => {

    const Leer = await Leer_Usuario(req,res);


    if(Leer.Estado){
        res.status(200).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }



}

export const Leer_Paginacion_Usuario = async (req, res) => {

    const Leer = await Leer_Id_Usuario(req,res);


    if(Leer.Estado){
        res.status(200).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Leer.Estado,
            Respuesta: Leer.Respuesta
           
        });
    }



}


export const Eliminar_Publicacion = async (req, res) => {

    const Eliminar = await Eliminar_Id(req,res);


    if(Eliminar.Estado){
        res.status(200).json({
    
            Estado: Eliminar.Estado,
            Respuesta: Eliminar.Respuesta
           
        });
    }
    else{
        res.status(400).json({
    
            Estado: Eliminar.Estado,
            Respuesta: Eliminar.Respuesta
           
        });
    }



}
