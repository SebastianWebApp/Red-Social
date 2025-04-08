import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from "dotenv";

// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;

// Crea la aplicación de Express
const app = express();

// Crea un servidor HTTP
const server = createServer(app);

// Crea el servidor de socket.io
const io = new Server(server, {
  cors: {
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});


io.on('connection', (socket) => {

  // Escuchar evento para unirse a una sala
  socket.on('unirseSala', (sala) => {
      socket.join(sala); // Asocia el socket a la sala especificada
  });

  // Escucha y envia mensaje a todos los que esten en la misma sala
  socket.on('Perfil', (data) => {

    const sala = data.Usuario; // Usuario = Nombre de la sala
      socket.broadcast.to(sala).emit('Respuesta_Perfil', { 
          Imagen: data.Imagen,
          Usuario: data.Usuario,
          Descripcion: data.Descripcion,
          Id: data.Id
      });
  });

  // Escucha y envia mensaje a todos
  socket.on('General', (data) => {
      socket.broadcast.emit('Respuesta_General', { 
          Imagen: data.Imagen,
          Usuario: data.Usuario,
          Descripcion: data.Descripcion,
          Id: data.Id,
          Imagen_Perfil: data.Imagen_Perfil,
          Nombre_Perfil: data.Nombre_Perfil
      });
  });




  // Escucha y envia mensaje a todos
  socket.on('Eliminar', (data) => {
      socket.broadcast.emit('Respuesta_Eliminar', { 
          Id: data.Id
      });
  });



  // Manejar desconexión
  socket.on('disconnect', () => {
      console.log(`Cliente con ID ${socket.id} desconectado`);
  });
});



// Iniciar el servidor en el puerto 3000
server.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:'+PORT);
});
