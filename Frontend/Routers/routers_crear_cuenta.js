import { Router } from 'express';
import {Leer_Usuario, Nueva_Cuenta, Verificar_Credenciales, Olvide_Password, Olvide_Password_Verificar, Extraer_Credenciales, Actualizar_Cuenta} from "../Controlador/login.js";
const router_crear_cuenta = Router();


// Iniciar Sesion
router_crear_cuenta.post('/Leer_Cuenta',Leer_Usuario);
router_crear_cuenta.post('/Nueva_Cuenta', Nueva_Cuenta);
router_crear_cuenta.post('/Verificar_Credenciales',Verificar_Credenciales);
router_crear_cuenta.post('/Olvide_Password',Olvide_Password);
router_crear_cuenta.post('/Olvide_Password_Verificar',Olvide_Password_Verificar);
router_crear_cuenta.post('/Extraer_Credenciales',Extraer_Credenciales);
router_crear_cuenta.post('/Actualizar_Credenciales',Actualizar_Cuenta);


export default router_crear_cuenta;
