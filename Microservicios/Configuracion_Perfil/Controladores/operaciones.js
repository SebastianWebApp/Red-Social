import {Leer,Crear,Actualizar,Eliminar} from "../Servicios/crud.js";

export const Leer_ID = async (req,res) => {

    const Leer_Usuario = await Leer(req,res);

    if(Leer_Usuario.Estado){

        res.status(200).json({

            Estado: Leer_Usuario.Estado,
            Respuesta: Leer_Usuario.Respuesta,
            Contenido: {
                Nombre: Leer_Usuario.Contenido.Nombre,
                Descripcion: Leer_Usuario.Contenido.Descripcion,
                Imagen: Leer_Usuario.Contenido.Imagen,
                Direccion: Leer_Usuario.Contenido.Direccion
            }

        });
    }
    else{
        res.status(400).json({

            Estado: Leer_Usuario.Estado,
            Respuesta: Leer_Usuario.Respuesta
        
        });
    }


}

export const Crear_Actualizar_Perfil = async (req,res) =>{


    const Leer_Usuario = await Leer(req,res);


    if(!Leer_Usuario.Estado){

     
        const Crear_Usuario = await Crear(req,res);


        if(Crear_Usuario.Estado){
            res.status(200).json({
    
                Estado: Crear_Usuario.Estado,
                Respuesta: Crear_Usuario.Respuesta
               
            });
        }
        else{
            res.status(400).json({
    
                Estado: Crear_Usuario.Estado,
                Respuesta: Crear_Usuario.Respuesta
               
            });
        }
    


    }
    else{

        const Actualizar_Informacion = await Actualizar(req,res);

        if(Actualizar_Informacion.Estado){
            res.status(200).json({
    
                Estado: Actualizar_Informacion.Estado,
                Respuesta: Actualizar_Informacion.Respuesta
               
            });
        }
        else{
            res.status(400).json({
    
                Estado: Actualizar_Informacion.Estado,
                Respuesta: Actualizar_Informacion.Respuesta
               
            });
        }

    }
  
}



export const Eliminar_Perfil = async (req,res) =>{

    const Eliminar_Informacion = await Eliminar(req,res);

    if(Eliminar_Informacion.Estado){
        res.status(200).json({

            Estado: Eliminar_Informacion.Estado,
            Respuesta: Eliminar_Informacion.Respuesta
           
        });
    }
    else{
        res.status(400).json({

            Estado: Eliminar_Informacion.Estado,
            Respuesta: Eliminar_Informacion.Respuesta
           
        });
    }


}