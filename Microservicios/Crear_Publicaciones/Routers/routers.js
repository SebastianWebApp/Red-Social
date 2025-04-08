import { Router } from 'express';
import {Crear, Actualizar_Post, Actualizar_Interaccion, Leer_Publicacion, Leer_Publicaciones_General, Leer_Paginacion_General,
     Leer_Publicaciones_Usuario, Leer_Paginacion_Usuario, Eliminar_Publicacion} from "../Controlador/operaciones.js"
const router = Router();


router.post('/Crear', Crear);
router.post('/Actualizar_Post',Actualizar_Post);
router.post('/Actualizar_Interraccion',Actualizar_Interaccion);
router.post('/Leer_Id', Leer_Publicacion);
router.get('/Leer_Publicaciones', Leer_Publicaciones_General);
router.get('/Leer_Paginacion_General/:Id', Leer_Paginacion_General);
router.get('/Leer_Paginacion_Usuario/:Id/:Usuario', Leer_Paginacion_Usuario);
router.get('/Leer_Publicaciones/:Usuario', Leer_Publicaciones_Usuario);
router.post('/Eliminar', Eliminar_Publicacion);



export default router;

