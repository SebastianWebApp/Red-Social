import dotenv from "dotenv"

dotenv.config();

const API_VERIFICACION_WHATSAPP  = process.env.API_VERIFICACION_WHATSAPP;

export const Enviar_Mensaje = async (req,res) => {

    try {

        const Solicitud = await fetch(API_VERIFICACION_WHATSAPP+`/generar-codigo`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Usuario: req.body.Usuario,
                Telefono: req.body.Telefono
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

export const Verificar_Mensaje = async (req,res) => {

    try {

        const Solicitud = await fetch(API_VERIFICACION_WHATSAPP+`/validar-codigo`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Usuario: req.body.Usuario,
                Codigo: req.body.Codigo
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