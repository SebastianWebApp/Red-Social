import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./Database/conectar.js";
import router from "./Routers/routers.js";


dotenv.config();

const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;

const app = express();

//Middlewares
app.use(cors({
    origin: CORS_ORIGEN,
    methods: ["GET","POST","DELETE"]
  })); // Permitir acceso del frontend al backend


app.use((err, req, res, next) => {
    res.status(500).json({ 
        Estado: false, 
        Respuesta: "Error interno del servidor" 
    });
});


app.use(json());

//Conectamos a la base de datos de MongoDB
connectToDB();


app.use("/api/publicaciones",router);


app.use((req, res) => {
    res.status(404).json({ 
        Estado: false,
        Respuesta: "Recurso no encontrado"

     });
});

app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});