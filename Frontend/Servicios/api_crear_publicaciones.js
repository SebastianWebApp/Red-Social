import dotenv from "dotenv"

dotenv.config();

const API_CREAR_PUBLICACIONES  = process.env.API_CREAR_PUBLICACIONES;



export const Crear_Publicacion = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_PUBLICACIONES+`/Crear`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Usuario: req.body.Usuario,
                Descripcion: req.body.Descripcion,
                Direccion: req.body.Direccion,
                Imagen: req.body.Imagen,
                Likes: req.body.Likes
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta,
                Contenido: Respuesta_Servidor.Contenido
    
            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}

export const Actualizar_Publicacion = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_PUBLICACIONES+`/Actualizar_Post`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Usuario: req.body.Usuario,
                Descripcion: req.body.Descripcion,
                Direccion: req.body.Direccion,
                Imagen: req.body.Imagen,
                Id: req.body.Id
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta,
                Contenido: Respuesta_Servidor.Contenido
    
            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}


export const Leer_Publicacion = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_PUBLICACIONES+`/Leer_Id`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Id: req.body.Id
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta

            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}

export const Leer_Publicacion_Usuario = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_PUBLICACIONES+`/Leer_Publicaciones/${req.body.Usuario}`, {
            method: "GET",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){

    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta

            };
        }
    
        else{

            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}

export const Leer_Paginacion_Usuario = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_PUBLICACIONES+`/Leer_Paginacion_Usuario/${req.body.Id}/${req.body.Usuario}`, {
            method: "GET",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){

    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta

            };
        }
    
        else{

            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}


export const Eliminar_Publicacion = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_PUBLICACIONES+`/Eliminar`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Id: req.body.Id
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta

            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}