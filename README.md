<h1 align="center">
  <b>🚀 Red Social</b>
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="35">
</h1>

<p align="center">
  👋 ¡Hola! Soy <b>Mateo Espinosa</b> y este repositorio contiene un sistema distribuido en pleno desarrollo, diseñado para ofrecer una plataforma robusta con autenticación segura, mensajería en tiempo real, almacenamiento optimizado y videollamadas grupales.
</p>

---

## 🔧 Estado Actual del Proyecto

Este sistema está construido utilizando múltiples tecnologías modernas y se encuentra en una fase activa de desarrollo. Algunas de las funcionalidades ya implementadas incluyen:

- 🔐 **Login seguro** con encriptación de datos.
- 📲 **Verificación de acceso vía WhatsApp** usando códigos temporales enviados por Twilio (agregar credenciales).
- 🧠 **Gestión del código de verificación con Redis**, donde se almacena por un tiempo determinado antes de eliminarse automáticamente.
- 🧩 **Backends desarrollados en Go, Ruby y Node.js (con Express)**.
- ☁️ **Despliegue en la nube mediante Docker, DockerHub y AWS**.
- 🗄️ **Almacenamiento híbrido**:
  - **MySQL** para datos estructurados (usuarios, configuraciones).
  - **MongoDB** para contenido dinámico como publicaciones.
  - **Firebase Storage** para almacenar imágenes y archivos multimedia, optimizando recursos.
- 🔐 **JWT (JSON Web Tokens)** para la autenticación y gestión de sesiones.
- 🔄 **WebSockets** para la actualización de publicaciones en tiempo real.
- 🤖 **Integración de ChatGPT** para la mejora automática de texto en las publicaciones (agregar credenciales).
- 📹 **Sistema de videollamadas grupales**, actualmente funcionando con hasta 3 personas simultáneamente (escalable a más usuarios según recursos).

---

## 📌 Funcionalidades Próximas

🔧 El sistema sigue en construcción. Próximas implementaciones:

- [ ] Crear más componentes del perfil del usuario.
- [ ] Optimizar escalabilidad de videollamadas para grupos grandes.
- [ ] Mejorar la experiencia de usuario con interfaces más intuitivas.
- [ ] Agregar control de permisos y privacidad.

---

## 🛠️ Tecnologías Utilizadas

<span>
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white">
  <img src="https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white">
  <img src="https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white">
  <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">
</span>
