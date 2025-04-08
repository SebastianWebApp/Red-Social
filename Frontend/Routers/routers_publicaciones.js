import { Router } from 'express';
import {Crear, Actualizar, Leer_Id, Leer_Publicacion_U, Leer_Publicacion_U_Paginacion, Eliminar_Post} from "../Controlador/publicaciones.js";
const router_publicaciones = Router();


router_publicaciones.post('/Crear',Crear);
router_publicaciones.post('/Actualizar',Actualizar);
router_publicaciones.post('/Eliminar',Eliminar_Post);
router_publicaciones.post('/Leer_Id',Leer_Id);
router_publicaciones.post('/Leer_Publicacion_U',Leer_Publicacion_U);
router_publicaciones.post('/Leer_Publicacion_U_Paginacion',Leer_Publicacion_U_Paginacion);


export default router_publicaciones;
