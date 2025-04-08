
import {Texto_IA} from "../Servicios/api_ia.js";


export const Mejorar_Texto = async (req,res) => {

    const Texto_Mejorado = await Texto_IA(req,res);

    if(Texto_Mejorado.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Texto_Mejorado.Respuesta

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Texto_Mejorado.Respuesta

        });
        
        return; 
    }

    
}

