import {Router} from "express";
import {Leer_ID,Crear_Actualizar_Perfil,Eliminar_Perfil} from "../Controladores/operaciones.js";

const router = Router();

// Rutas
router.get("/Habilidades/:Id",Leer_ID);

router.post("/Habilidades/:Id",Crear_Actualizar_Perfil);

router.delete("/Habilidades/:Id",Eliminar_Perfil);

export default router;

