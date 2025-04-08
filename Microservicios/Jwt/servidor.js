import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


dotenv.config();


const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;
const CLAVE_SECRETA_JWT = process.env.CLAVE_SECRETA_JWT;
const app = express();

// Middlewares
app.use(cors({
    origin: CORS_ORIGEN,
    methods: ["GET","POST"],
    credentials: true,  // Asegura que las cookies se envíen
}))

app.use(json());
app.use(cookieParser());  // Middleware para leer cookies


app.post('/Crear_Jwt', (req, res) => {

    try {

        const Informacion_Usuario = {
            id: req.body.Usuario,  // Asumimos que el id del usuario viene del body de la solicitud
        };
    
        // Crear el token JWT con la información del usuario
        const token = jwt.sign(Informacion_Usuario, CLAVE_SECRETA_JWT, { expiresIn: '1h' });

        // Respuesta de éxito
        res.status(200).json({
            Estado: true,
            Respuesta: "Seguridad creada correctamente",
            Contenido: token
        });
        
    } catch (error) {
        res.status(400).json({
            Estado: false,
            Respuesta: "Intente de nuevo, error al crear la seguridad"
        })
    }

   
});

app.post('/Verificar_Jwt', (req, res) => {

    try {

        const token = req.body.Token;

        // Validar si la cookie con el token existe
        if (!token) {
            return res.status(401).json({
                Estado: false,
                Respuesta: "Sesión expirada. Por favor, inicie sesión nuevamente."
            });
        }

        // Verificar el token con la clave secreta
        jwt.verify(token, CLAVE_SECRETA_JWT, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    Estado: false,
                    Respuesta: "Token inválido o sesión expirada. Inicie sesión nuevamente."
                });
            }

            // Si el token es válido, devolver información del usuario
            return res.status(200).json({
                Estado: true,
                Respuesta: "Token válido.",
                Usuario: decoded // Información decodificada del token
            });
        });
    } catch (error) {
        return res.status(500).json({
            Estado: false,
            Respuesta: "Error interno. Intente de nuevo."
        });
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