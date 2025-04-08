import express, { json } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { fileURLToPath, pathToFileURL } from "url";
import {Leer_Jwt} from "./Servicios/api_jwt.js";
import router_crear_cuenta from "./Routers/routers_crear_cuenta.js";
import router_ia from "./Routers/routers_ia.js";
import router_configuracion from "./Routers/routers_configuracion.js";
import router_publicaciones from "./Routers/routers_publicaciones.js";

// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;

// Obtenemos la dirección de los elementos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Iniciamos express
const app = express();

//Middlewares
app.use(cors()); // Permite la conexión entre el Front y el Backend

// Aumentar el límite de carga a 10 MB
app.use(json({ limit: '10mb' })); // Parear JSON en las solicitudes
app.use(cookieParser()); // Para analizar las cookies


// Permite mostrar la página web segun la ruta
app.use(express.static(path.join(__dirname)));


// ---------------------- Login ------------------------------

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","index.html"));
});

app.get("/crear_cuenta", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","crear_cuenta.html"));
});

app.get("/codigo_verificacion", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","codigo_verificacion.html"));
});

app.get("/olvide_password", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","olvide_password.html"));
});

// ---------------------- Sesión Expirada ------------------------------

app.get("/sesion_expirada", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","sesion_expirada.html"));
});


// ---------------------- Configuración del perfil ------------------------------

app.get("/configuracion/perfil",Leer_Jwt, (req,res) =>{
    res.sendFile(path.join(__dirname,"views","configuracion_perfil.html"));
});

app.get("/configuracion/credenciales",Leer_Jwt, (req,res) =>{
    res.sendFile(path.join(__dirname,"views","configuracion_credenciales.html"));
});

app.get("/configuracion/habilidades",Leer_Jwt, (req,res) =>{
    res.sendFile(path.join(__dirname,"views","configuracion_habilidades.html"));
});
app.get("/perfil/publicacion",Leer_Jwt, (req,res) =>{
    res.sendFile(path.join(__dirname,"views","crear_publicacion.html"));
});


app.get("/perfil/:Usuario",Leer_Jwt, (req,res) =>{
    res.sendFile(path.join(__dirname,"views","mi_perfil.html"));
});

app.get("/video_llamada",Leer_Jwt, (req, res) => {
    res.redirect("https://d2cf-2800-370-126-2e50-8084-7a69-c808-6af7.ngrok-free.app");  // Se cambia cada vez que se inicialice el ngrok
});


// ---------------------- Gateway ------------------------------
app.use("/api/crear_cuenta",router_crear_cuenta);
app.use("/api/configuraciones",router_configuracion);
app.use("/api/ia",router_ia);
app.use("/api/publicaciones",router_publicaciones);







// Middleware para manejar rutas no existentes
app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
        res.status(400).json({

            Estado: false,
            Respuesta: "Dirección de api errónea"

        });
    } else {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html")); // Ruta al archivo 404.html
    }
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});
