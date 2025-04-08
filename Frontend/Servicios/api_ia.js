import dotenv from "dotenv"

dotenv.config();

const API_TEXTO_IA  = process.env.API_TEXTO_IA;

export const Texto_IA = async (req,res) => {

    try {

        const Solicitud = await fetch(API_TEXTO_IA, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Texto: req.body.Texto
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

        console.log(error)

          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}
