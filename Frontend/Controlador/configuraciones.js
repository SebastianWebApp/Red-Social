import {Subir_Imagen,Eliminar_ID} from "../Servicios/api_subir_imagen.js"
import {Leer_Perfil,Crear_Actualizar_Perfil} from "../Servicios/api_configuracion_perfil.js"
import {Leer_Habilidades,Crear_Nuevo_Habilidad} from "../Servicios/api_habilidades.js"
import {Leer_Mis_Habilidades,Crear_Actualizar_Mis_Habilidades} from "../Servicios/api_mis_habilidades.js"


export const Configuracion_Leer = async (req, res) =>{

    const Leer = await Leer_Perfil(req,res);

    if(Leer.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Leer.Respuesta,
            Contenido: Leer.Contenido

        });
        
        return; 

    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Leer.Respuesta

        });
        
        return; 
    }

}

export const Configuracion_Perfil = async (req,res) =>{


    var Imagen = req.body.Imagen;
    var Direccion = req.body.Direccion;

    if (Imagen.startsWith("data:image/")) {

        const Crear_Imagen = await Subir_Imagen(req,res);

        if(!Crear_Imagen.Estado){

            res.status(400).json({

                Estado: false,
                Respuesta: Crear_Imagen.Respuesta

            });
            
            return; 

        }

        req.body.Imagen = Crear_Imagen.Contenido.Link;
        req.body.Direccion = Crear_Imagen.Contenido.Path;
    }
    
 

    const Subir_Perfil = await Crear_Actualizar_Perfil(req,res);
    

    if(Subir_Perfil.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Subir_Perfil.Respuesta

        });
        
        return; 

    }
    else{

        if (Direccion == "") {
            const Eliminar = await Eliminar_ID(req,res);

            res.status(400).json({

                Estado: false,
                Respuesta: Subir_Perfil.Respuesta

            });
            
            return; 

        }
        else{
            res.status(400).json({

                Estado: false,
                Respuesta: Subir_Perfil.Respuesta

            });
            
            return; 
        }

    }

}

export const Crear_Habilidades = async (req,res) =>{

    req.body.Usuario = "Habilidades";
    req.body.Direccion = "";

    const Crear_Imagen = await Subir_Imagen(req,res);

    if(!Crear_Imagen.Estado){

        res.status(400).json({

            Estado: false,
            Respuesta: Crear_Imagen.Respuesta

        });
            
        return; 

    }

    req.body.Imagen = Crear_Imagen.Contenido.Link;
    req.body.Direccion = Crear_Imagen.Contenido.Path;


    const Crear_Habilidad = await Crear_Nuevo_Habilidad(req, res);

    
    if(Crear_Habilidad.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Crear_Habilidad.Respuesta

        });
        
        return; 

    }
    else{

        const Eliminar = await Eliminar_ID(req,res);

        res.status(400).json({

            Estado: false,
            Respuesta: Crear_Habilidad.Respuesta

        });
        
        return; 

    }
}

export const Leer_Lista_Habilidades = async (req,res) =>{

    const Leer = await Leer_Habilidades(req,res);
    
    if(Leer.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Leer.Respuesta

        });
            
        return;
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Leer.Respuesta

        });
            
        return;
    }


}

export const Leer_Lista_Mis_Habilidades = async (req,res) =>{

    const Leer = await Leer_Mis_Habilidades(req,res);

    if(Leer.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Leer.Respuesta,
            Contenido: Leer.Contenido

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Leer.Respuesta

        });
        
        return; 
    }



}


export const Crear_Mis_Habilidades = async (req,res) =>{

    const Crear = await Crear_Actualizar_Mis_Habilidades(req,res);

    if(Crear.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Crear.Respuesta

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Crear.Respuesta

        });
        
        return; 
    }
    
}
