import {Subir_Imagen,Eliminar_ID} from "../Servicios/api_subir_imagen.js"
import {Crear_Publicacion, Actualizar_Publicacion, Leer_Publicacion, Leer_Publicacion_Usuario, Leer_Paginacion_Usuario, Eliminar_Publicacion} from "../Servicios/api_crear_publicaciones.js"



export const Leer_Id = async (req,res) =>{

    const Leer = await Leer_Publicacion(req,res);

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

export const Leer_Publicacion_U = async (req,res) =>{

    const Leer = await Leer_Publicacion_Usuario(req,res);

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

export const Leer_Publicacion_U_Paginacion = async (req,res) =>{

    const Leer = await Leer_Paginacion_Usuario(req,res);

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


export const Crear = async (req,res) =>{


    var Imagen = req.body.Imagen;
    var Nuevo = false;

  
    if (Imagen != "" && Imagen.startsWith("data:image/")) {

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
        Nuevo = true;
    }

  

    const Subir_Post = await Crear_Publicacion(req,res);

    if(Subir_Post.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Subir_Post.Respuesta,
            Contenido: Subir_Post.Contenido
        });
        
        return; 

    }
    else{
        if (Nuevo) {
            const Eliminar = await Eliminar_ID(req,res);

            res.status(400).json({

                Estado: false,
                Respuesta: Subir_Post.Respuesta

            });
            
            return; 

        }
        else{
            res.status(400).json({

                Estado: false,
                Respuesta: Subir_Post.Respuesta

            });
            
            return; 

        }

    }

}

export const Actualizar = async (req,res) =>{


    var Imagen = req.body.Imagen;
    var Direccion = req.body.Direccion;


    if(Direccion != "" && Imagen == "" || Direccion != "" && Imagen != "" && Imagen.startsWith("data:image/")){

        const Eliminar = await Eliminar_ID(req,res);

        if(!Eliminar.Estado){
            res.status(400).json({

                Estado: false,
                Respuesta: Eliminar.Respuesta

            });
            
            return; 
        }

        Direccion = "";

    }

    if (Imagen != "" && Imagen.startsWith("data:image/")) {

        req.body.Direccion = Direccion;

        const Crear_Imagen = await Subir_Imagen(req,res);

        if(!Crear_Imagen.Estado){

            res.status(400).json({

                Estado: false,
                Respuesta: Crear_Imagen.Respuesta

            });
            
            return; 

        }

        Imagen = Crear_Imagen.Contenido.Link;
        Direccion = Crear_Imagen.Contenido.Path;
    }

    
    req.body.Imagen = Imagen;
    req.body.Direccion = Direccion;

    const Subir_Post = await Actualizar_Publicacion(req,res);
    
    if(Subir_Post.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Subir_Post.Respuesta,
            Contenido: Subir_Post.Contenido
        });
        
        return; 

    }
    else{

        res.status(400).json({

            Estado: false,
            Respuesta: Subir_Post.Respuesta

        });
        
        return;
    }

}


export const Eliminar_Post = async (req,res) =>{

    var Direccion = req.body.Direccion;

    if(Direccion != ""){
        const Eliminar = await Eliminar_ID(req,res);

        if(!Eliminar.Estado){
            res.status(400).json({
    
                Estado: false,
                Respuesta: Eliminar.Respuesta
    
            });
            
            return; 
        }
    }


    const Borrar = await Eliminar_Publicacion(req,res);

    if(Borrar.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Borrar.Respuesta

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Borrar.Respuesta

        });
        
        return; 
    }

}

