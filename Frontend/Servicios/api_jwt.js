import dotenv from "dotenv"
import {Crear_Cookie} from "./crear_cookie.js";

dotenv.config();

const API_JWT  = process.env.API_JWT;

export const Crear_Jwt = async (req,res) => {

    try {

        const Solicitud = await fetch(API_JWT+`/Crear_Jwt`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            credentials: "include", // Incluimos las cookies en la solicitud

            body: JSON.stringify({
                Usuario: req.body.Usuario
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){

            Crear_Cookie(res,Respuesta_Servidor.Contenido);
    
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

export const Leer_Jwt = async (req, res, next) => {

    try {

        const Solicitud = await fetch(API_JWT + `/Verificar_Jwt`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json",  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Token: req.cookies.Usuario
            })
        });

        const Respuesta_Servidor = await Solicitud.json();

        if (Respuesta_Servidor.Estado) {
            // Si el token es válido, pasar al siguiente middleware o ruta
            return next();
        } else {
            // Si el token no es válido, redirigir al usuario
            return res.redirect('/sesion_expirada');
        }
    } catch (error) {
        // En caso de error, redirigir al usuario
        return res.redirect('/sesion_expirada');
    }
};
