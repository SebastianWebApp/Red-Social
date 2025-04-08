import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routers/routers.js";
import Test_Conexion from "./Controladores/test_conexion.js";

dotenv.config();

Test_Conexion();

const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;

const app = express();

// Middlewares
app.use(cors({
    origin: CORS_ORIGEN,
    methods: ["GET","POST","PUT","DELETE"]
}))

app.use(json());

// Rutas
app.use("/api/Inicio_Sesion",router);



app.use((req,res) =>{
    res.status(404).json({
        Estado: false,
        Respuesta: "Recurso no encontrado"
    })
});


app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
})