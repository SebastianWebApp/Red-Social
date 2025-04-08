import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'; // Importamos el módulo 'crypto' para cifrado y descifrado


dotenv.config();


const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;
// Generamos una clave secreta de 32 bytes para AES-256 (cifrado de 256 bits)
const claveSecreta = Buffer.from(process.env.CLAVE_SECRETA_CRYPTO, 'hex');
// Generamos un vector de inicialización (IV) de 16 bytes. Esto añade aleatoriedad al cifrado
const iv = randomBytes(16); 

const app = express();

// Middlewares
app.use(cors({
    origin: CORS_ORIGEN,
    methods: ["POST"]
}))

app.use(json());


app.post('/Encriptar', (req, res) => {

    try {

         // Creamos un cifrador con el algoritmo AES-256-CBC, clave secreta y vector de inicialización
        const cifrador = createCipheriv('aes-256-cbc', claveSecreta, iv);
            
        // Ciframos el texto. 'utf8' indica el formato del texto original, y 'hex' el formato del resultado
        let encriptado = cifrador.update(req.body.Texto, 'utf8', 'hex');

        // Finalizamos el cifrado y añadimos cualquier dato restante al resultado
        encriptado += cifrador.final('hex');

        // Retornamos el texto cifrado junto con el IV necesario para descifrarlo después
        res.status(200).json({
            Estado: true,
            Respuesta: "Encriptacion correcta",
            Contenido:{
                iv: iv.toString('hex'), // Convertimos el IV a una cadena hexadecimal para almacenarlo fácilmente
                encriptado: encriptado, // Texto cifrado en formato hexadecimal
            }
        })
        
    } catch (error) {
        res.status(400).json({
            Estado: false,
            Respuesta: "Error al encriptar los datos"
        })
    }

   
});

app.post('/Desencriptar', (req, res) => {

    try {

        // Creamos un descifrador con el mismo algoritmo, clave secreta y el IV usado en el cifrado
        const descifrador = createDecipheriv(
            'aes-256-cbc',                      // Algoritmo usado (AES-256-CBC)
            claveSecreta,                       // Clave secreta para descifrar
            Buffer.from(req.body.IV, 'hex') // Convertimos el IV desde formato hexadecimal a un buffer
        );
        
        // Desciframos el texto. 'hex' indica el formato del texto cifrado, y 'utf8' el formato del texto original
        let desencriptado = descifrador.update(req.body.Texto, 'hex', 'utf8');
        
        // Finalizamos el descifrado y añadimos cualquier dato restante al resultado
        desencriptado += descifrador.final('utf8');
        
        // Retornamos el texto original descifrado
         res.status(200).json({
            Estado: true,
            Respuesta: desencriptado            
        })
        
    } catch (error) {
        res.status(400).json({
            Estado: false,
            Respuesta: "Error al desencriptar los datos"
        })
    }

   
});





app.use((req,res) =>{
    res.status(404).json({
        Estado: false,
        Respuesta: "Recurso no encontrado"
    })
});


app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
})