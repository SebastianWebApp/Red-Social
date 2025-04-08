import  connectToDB  from "../Database/conectar.js";
import dotenv from "dotenv";
dotenv.config();



export const Leer = async (req, res) => {
    const Id = req.params.Id;


    try {
        const [rows] = await connectToDB.query("CALL Mis_Habilidades_Leer(?)", [Id]);

        if (rows[0].length > 0) {
            const Usuario = rows[0][0];
            
            // Construir la respuesta
            return {
                Estado: true,
                Respuesta: "Habilidades obtenidas",
                Contenido: {
                    Id: Usuario.Id,
                    Habilidades: Usuario.Habilidades                    
                }
            };
           

            
        } else {
            return {
                Estado: false,
                Respuesta: "Habilidades no seleccionadas"
            };
        }
    } catch (error) {
        return {
            Estado: false,
            Respuesta: "Error al leer la base de datos, intente de nuevo"
        };
    }
};


export const Crear = async (req, res) =>{

    const Parametros = req.body;

    try {
                
        // Realizar la inserción en la base de datos después de encriptar
        const [result] = await connectToDB.query("CALL Mis_Habilidades_Crear(?, ?)", [
            Parametros.Id, 
            Parametros.Habilidades
        ]);

        // Respuesta en caso de éxito
        const Respuesta = {
            Estado: true,
            Respuesta: "Se agrego correctamente la habilidad"
        };

        return Respuesta;

        
    
    } catch (error) {

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al agregar la habilidad"
        }

        return Respuesta;
    }
}

export const Actualizar = async (req, res) =>{

    const Parametros = req.body;
    try {

        const [result] = await connectToDB.query("CALL Mis_Habilidades_Actualizar(?, ?)", [Parametros.Id, Parametros.Habilidades]);
        if (result.affectedRows > 0) {

            const Respuesta = {
                Estado: true,
                Respuesta: "Habilidades Actualizadas correctamente"
            }
    
            return Respuesta;



        } else {

            const Respuesta = {
                Estado: false,
                Respuesta: "Habilidades no encontradas"
            }
    
            return Respuesta;
        }
        
    } catch (error) {

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al actualizar la información"
        }

        return Respuesta;
    }
}


export const Eliminar = async (req, res) =>{

    const Id = req.params.Id;

    try {
        const [result] = await connectToDB.query("CALL Mis_Habilidades_Eliminar(?)", [Id]);
        if (result.affectedRows > 0) {
            
            const Respuesta = {
                Estado: true,
                Respuesta: "Habilidades Eliminadas"
            }
    
            return Respuesta;
        
        } else { 
            
            const Respuesta = {
                Estado: false,
                Respuesta: "Habilidades no encontradas"
            }
    
            return Respuesta;
        }
    } catch (error) {   

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al eliminar las habilidades"
        }

        return Respuesta;

    }

}
