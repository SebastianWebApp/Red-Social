import {Router} from "express";
import {Leer_ID,Leer_Credenciales,Crear_Nuevo_Usuario,Actualizar_Usuario,Eliminar_Usuario} from "../Controladores/operaciones.js";

const router = Router();

// Rutas
router.get("/Usuario/:Id",Leer_ID);

router.post("/Usuario/Credenciales/:Id",Leer_Credenciales);

router.post("/Usuario/:Id",Crear_Nuevo_Usuario);

router.put("/Usuario",Actualizar_Usuario);

router.delete("/Usuario/:Id",Eliminar_Usuario);

export default router;

