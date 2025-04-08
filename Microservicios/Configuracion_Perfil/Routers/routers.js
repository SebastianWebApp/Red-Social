import {Router} from "express";
import {Leer_ID,Crear_Actualizar_Perfil,Eliminar_Perfil} from "../Controladores/operaciones.js";

const router = Router();

// Rutas
router.get("/Perfil/:Id",Leer_ID);

router.post("/Perfil/:Id",Crear_Actualizar_Perfil);

router.delete("/Perfil/:Id",Eliminar_Perfil);

export default router;

