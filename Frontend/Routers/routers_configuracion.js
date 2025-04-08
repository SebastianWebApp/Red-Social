import { Router } from 'express';
import {Configuracion_Perfil, Configuracion_Leer, Crear_Habilidades,
     Leer_Lista_Habilidades,Leer_Lista_Mis_Habilidades,Crear_Mis_Habilidades} from "../Controlador/configuraciones.js";
const router_configuracion = Router();


// Integración de IA
router_configuracion.post('/Editar_Perfil',Configuracion_Perfil);
router_configuracion.post('/Leer_Perfil',Configuracion_Leer);
router_configuracion.post('/Crear_Habilidad',Crear_Habilidades);
router_configuracion.post('/Leer_Habilidades',Leer_Lista_Habilidades);
router_configuracion.post('/Leer_Mis_Habilidades',Leer_Lista_Mis_Habilidades);
router_configuracion.post('/Crear_Mis_Habilidad',Crear_Mis_Habilidades);



export default router_configuracion;
