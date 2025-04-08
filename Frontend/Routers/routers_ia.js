import { Router } from 'express';
import {Mejorar_Texto} from "../Controlador/ia.js";
const router_ia = Router();


// Integración de IA
router_ia.post('/mejorar_texto',Mejorar_Texto);



export default router_ia;
