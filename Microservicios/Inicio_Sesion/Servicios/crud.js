import  connectToDB  from "../Database/conectar.js";
import dotenv from "dotenv";
dotenv.config();



export const Leer = async (req, res) => {
    const Id = req.params.Id;


    try {
        const [rows] = await connectToDB.query("CALL Iniciar_Sesion_Leer(?)", [Id]);
        
        if (rows[0].length > 0) {
            const Usuario = rows[0][0];


            // Ejecutar ambas solicitudes en paralelo y esperar a que ambas terminen
            const [Clave, Telefono] = await Promise.all([
                Desencriptar(Usuario.Clave, Usuario.IV), // Primera llamada
                Desencriptar(Usuario.Teléfono, Usuario.IV), // Segunda llamada
            ]);


            if(Clave.Estado && Telefono.Estado){

                // Construir la respuesta
                return {
                    Estado: true,
                    Respuesta: "El Usuario se encuentra en uso",
                    Contenido: {
                        Id: Usuario.Id,
                        Telefono: Telefono.Respuesta,
                        Clave: Clave.Respuesta,
                        IV: Usuario.IV
                    },
                    Status: 200,
                };


            }
            else{
                // Construir la respuesta
                return {
                    Estado: false,
                    Respuesta: "Intente de nuevo, error al desencriptar la información",                        
                    Status: 400,
                };
            }

            
        } else {
            return {
                Estado: false,
                Respuesta: "Usuario no existe",
                Status: 404,
            };
        }
    } catch (error) {
        return {
            Estado: false,
            Respuesta: "Error al leer la base de datos, intente de nuevo",
            Status: 400,
        };
    }
};



export const Crear = async (req, res) =>{

    const Parametros = req.body;

    try {
        
        // Ejecutar ambas solicitudes en paralelo y esperar a que ambas terminen
        const [Clave, Telefono] = await Promise.all([
            Encriptar(Parametros.Clave), // Primera llamada
            Encriptar(Parametros.Telefono), // Segunda llamada
        ]);

        if(Clave.Estado && Telefono.Estado){

            // Realizar la inserción en la base de datos después de encriptar
            const [result] = await connectToDB.query("CALL Iniciar_Sesion_Crear(?, ?, ?, ?)", [
                Parametros.Id, 
                Telefono.Contenido.encriptado,
                Clave.Contenido.encriptado,
                Clave.Contenido.iv
            ]);

            // Respuesta en caso de éxito
            const Respuesta = {
                Estado: true,
                Respuesta: "Se creo correctamente el usuario",
                Status: 200
            };

            return Respuesta;

        }
        else{

            // Respuesta en caso de éxito
            const Respuesta = {
                Estado: false,
                Respuesta: "Intente de nuevo, error al encriptar la información",
                Status: 400
            };

            return Respuesta;
        }

        
    
    } catch (error) {

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al crear al usuario",
            Status: 400
        }

        return Respuesta;
    }
}

export const Actualizar = async (req, res) =>{

    const Parametros = req.body;
    try {

       // Ejecutar ambas solicitudes en paralelo y esperar a que ambas terminen
        const [Clave, Telefono] = await Promise.all([
            Encriptar(Parametros.Clave), // Primera llamada
            Encriptar(Parametros.Telefono), // Segunda llamada
        ]);


        if(Clave.Estado && Telefono.Estado){

            const [result] = await connectToDB.query("CALL Iniciar_Sesion_Actualizar(?, ?, ?, ?)", [Parametros.Id, Telefono.Contenido.encriptado, Clave.Contenido.encriptado, Clave.Contenido.iv]);
            if (result.affectedRows > 0) {
    
                const Respuesta = {
                    Estado: true,
                    Respuesta: "Usuario Actualizado correctamente",
                    Status: 200
                }
        
                return Respuesta;
    
    
    
            } else {
    
                const Respuesta = {
                    Estado: false,
                    Respuesta: "Usuario no encontrado",
                    Status: 404
                }
        
                return Respuesta;
            }


        }
        else{
             // Respuesta en caso de éxito
             const Respuesta = {
                Estado: false,
                Respuesta: "Intente de nuevo, error al encriptar la información",
                Status: 400
            };

            return Respuesta;
        }
        
    } catch (error) {

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al actualizar la información",
            Status: 400
        }

        return Respuesta;
    }
}


export const Eliminar = async (req, res) =>{

    const Id = req.params.Id;

    try {
        const [result] = await connectToDB.query("CALL Iniciar_Sesion_Eliminar(?)", [Id]);
        if (result.affectedRows > 0) {
            
            const Respuesta = {
                Estado: true,
                Respuesta: "Usuario Eliminado",
                Status: 200
            }
    
            return Respuesta;
        
        } else { 
            
            const Respuesta = {
                Estado: false,
                Respuesta: "Usuario no encontrado",
                Status: 404
            }
    
            return Respuesta;
        }
    } catch (error) {   

        const Respuesta = {
            Estado: false,
            Respuesta: "Intente de nuevo, error al eliminar el usuario",
            Status: 400
        }

        return Respuesta;

    }

}


async function Desencriptar(Texto, IV){

    try {

        const Solicitud = await fetch(process.env.PORT_ENCRIPTACION+'/Desencriptar', {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Texto: Texto,
                IV: IV
            })
        });
    
        const Respuesta_Servidor = await Solicitud.json();

        if(Respuesta_Servidor.Estado){
    
            return {
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
            }
    
        }
        else{
            return {
                Estado: false
            }
        }



        
    } catch (error) {
        return {
            Estado: false
        }
    }

    

}

async function Encriptar(Texto){

    try {

        const Solicitud = await fetch(process.env.PORT_ENCRIPTACION+'/Encriptar', {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Texto: Texto
            })
        });
    
        const Respuesta_Servidor = await Solicitud.json();

        if(Respuesta_Servidor.Estado){
    
            return {
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta,
                Contenido: Respuesta_Servidor.Contenido
            }
    
        }
        else{
            return {
                Estado: false
            }
        }



        
    } catch (error) {
        return {
            Estado: false
        }
    }

    

}