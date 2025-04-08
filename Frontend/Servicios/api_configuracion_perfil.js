import dotenv from "dotenv"

dotenv.config();

const API_CONFIGURACION_PERFIL  = process.env.API_CONFIGURACION_PERFIL;

export const Leer_Perfil = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CONFIGURACION_PERFIL+`/`+req.body.Usuario, {
            method: "GET",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }
            
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


export const Crear_Actualizar_Perfil = async (req,res) => {

    try {   

        const Solicitud = await fetch(API_CONFIGURACION_PERFIL+`/`+req.body.Usuario, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Id: req.body.Usuario,
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Imagen: req.body.Imagen,
                Direccion: req.body.Direccion
            
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
