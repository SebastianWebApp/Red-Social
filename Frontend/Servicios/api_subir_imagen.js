import dotenv from "dotenv"

dotenv.config();

const API_SUBIR_IMAGEN  = process.env.API_SUBIR_IMAGEN;

export const Subir_Imagen = async (req,res) =>{

    const { Imagen, Usuario, Direccion } = req.body;

    try {

        const Solicitud = await fetch(API_SUBIR_IMAGEN, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Imagen_64: Imagen,
                Usuario: Usuario,
                Path_Imagen: Direccion
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

export const Eliminar_ID = async (req,res) =>{

    try {

        const Solicitud = await fetch(API_SUBIR_IMAGEN + "/Id", {
            method: "DELETE",  
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({             
                Path_Imagen: req.body.Direccion
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

export const Eliminar_Carpeta = async (req,res) =>{

    try {

        const Solicitud = await fetch(API_SUBIR_IMAGEN + "/Usuario", {
            method: "DELETE",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({             
                Path_Imagen: req.body.Usuario
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