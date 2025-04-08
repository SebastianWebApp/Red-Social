import {Leer,Crear,Actualizar,Eliminar} from "../Servicios/crud.js";

export const Leer_ID = async (req,res) => {

    const Leer_Usuario = await Leer(req,res);

    if(Leer_Usuario.Estado){

        res.status(Leer_Usuario.Status).json({

            Estado: Leer_Usuario.Estado,
            Respuesta: Leer_Usuario.Respuesta,
            Contenido: {
                Id: Leer_Usuario.Contenido.Id,
                Telefono: Leer_Usuario.Contenido.Telefono,
                Clave: Leer_Usuario.Contenido.Clave,
                IV: Leer_Usuario.Contenido.IV
            }

        });
    }
    else{
        res.status(Leer_Usuario.Status).json({

            Estado: Leer_Usuario.Estado,
            Respuesta: Leer_Usuario.Respuesta,
        
        });
    }


}

export const Leer_Credenciales = async (req,res) => {

    const Leer_Usuario = await Leer(req,res);
    const { Clave } = req.body;

    if(Leer_Usuario.Estado){

        if(Leer_Usuario.Contenido.Clave == Clave){
            res.status(200).json({

                Estado: true,
                Respuesta: "Credenciales correctas"
            
            });
        }
        else{
            res.status(400).json({

                Estado: false,
                Respuesta: "Credenciales incorrectas"
            
            });
        }

        
    }
    else{
        res.status(Leer_Usuario.Status).json({

            Estado: Leer_Usuario.Estado,
            Respuesta: Leer_Usuario.Respuesta,
        
        });
    }


}


export const Crear_Nuevo_Usuario = async (req,res) =>{

    const Leer_Usuario = await Leer(req,res);

    if(Leer_Usuario.Estado){

        res.status(400).json({

            Estado: false,
            Respuesta: "El usuario ya se encuentra registrado"          

        });

        return;
    }
  

    const Crear_Usuario = await Crear(req,res);

    if(Crear_Usuario.Estado){
        res.status(Crear_Usuario.Status).json({

            Estado: Crear_Usuario.Estado,
            Respuesta: Crear_Usuario.Respuesta
           
        });
    }
    else{
        res.status(Crear_Usuario.Status).json({

            Estado: Crear_Usuario.Estado,
            Respuesta: Crear_Usuario.Respuesta
           
        });
    }





}

export const Actualizar_Usuario = async (req,res) =>{

    const Actualizar_Informacion = await Actualizar(req,res);

    if(Actualizar_Informacion.Estado){
        res.status(Actualizar_Informacion.Status).json({

            Estado: Actualizar_Informacion.Estado,
            Respuesta: Actualizar_Informacion.Respuesta
           
        });
    }
    else{
        res.status(Actualizar_Informacion.Status).json({

            Estado: Actualizar_Informacion.Estado,
            Respuesta: Actualizar_Informacion.Respuesta
           
        });
    }


}

export const Eliminar_Usuario = async (req,res) =>{

    const Eliminar_Informacion = await Eliminar(req,res);

    if(Eliminar_Informacion.Estado){
        res.status(Eliminar_Informacion.Status).json({

            Estado: Eliminar_Informacion.Estado,
            Respuesta: Eliminar_Informacion.Respuesta
           
        });
    }
    else{
        res.status(Eliminar_Informacion.Status).json({

            Estado: Eliminar_Informacion.Estado,
            Respuesta: Eliminar_Informacion.Respuesta
           
        });
    }


}