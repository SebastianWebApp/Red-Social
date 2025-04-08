import  connectToDB  from "../Database/conectar.js";
import dotenv from "dotenv";
dotenv.config();



export const Leer = async (req, res) => {
    const Id = req.params.Id;


    try {

        const [rows] = await connectToDB.query("CALL Configuracion_Perfil_Leer(?)", [Id]);

        if (rows[0].length > 0) {
            const Usuario = rows[0][0];
            
            // Construir la respuesta
            return {
                Estado: true,
                Respuesta: "Perfil Obtenido",
                Contenido: {
                    Id: Usuario.Id,
                    Nombre: Usuario.Nombre,
                    Descripcion: Usuario.Descripcion,
                    Imagen: Usuario.Imagen,
                    Direccion: Usuario.Direccion

                }
            };
           

            
        } else {
            return {
                Estado: false,
                Respuesta: "El Perfil no existe"
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
        const [result] = await connectToDB.query( "CALL Configuracion_Perfil_Crear(?, ?, ?, ?, ?)", [
            Parametros.Id, 
            Parametros.Nombre,
            Parametros.Descripcion,
            Parametros.Imagen,
            Parametros.Direccion
        ]);


        // Respuesta en caso de éxito
        const Respuesta = {
            Estado: true,
            Respuesta: "Se creo correctamente el perfil"
        };

        return Respuesta;

        
    
    } catch (error) {

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al crear el perfil"
        }

        return Respuesta;
    }
}

export const Actualizar = async (req, res) =>{

    const Parametros = req.body;
    try {       

        const [result] = await connectToDB.query("CALL Configuracion_Perfil_Actualizar(?, ?, ?, ?)", [Parametros.Id, Parametros.Nombre, Parametros.Descripcion, Parametros.Imagen]);
        
        if (result.affectedRows > 0) {

            const Respuesta = {
                Estado: true,
                Respuesta: "Perfil Actualizado correctamente"
            }
    
            return Respuesta;



        } else {

            const Respuesta = {
                Estado: false,
                Respuesta: "Perfil no encontrado"
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
        const [result] = await connectToDB.query("CALL Configuracion_Perfil_Eliminar(?)", [Id]);
        if (result.affectedRows > 0) {
            
            const Respuesta = {
                Estado: true,
                Respuesta: "Perfil Eliminado"
            }
    
            return Respuesta;
        
        } else { 
            
            const Respuesta = {
                Estado: false,
                Respuesta: "Perfil no encontrado"
            }
    
            return Respuesta;
        }
    } catch (error) {   

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al eliminar el perfil"
        }

        return Respuesta;

    }

}
