const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path'); // Usamos path para gestionar rutas


require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "public", "views", "video_llamada.html"));
});

// Registro de usuarios y códigos de salas
let rooms = {}; // { "codigoSala1": [user1, user2], "codigoSala2": [user3] }
let users = {}; // { "socketId": "codigoSala" }


io.on('connection', (socket) => {
    console.log('Un usuario conectado:', socket.id);


    socket.on('unirse_sala', ({ code }) => {
        if (!code) {
            socket.emit('error', 'Código inválido');
            return;
        }

        // Si el código no existe, se crea una nueva sala
        if (!rooms[code]) {
            socket.emit('error', 'No existe sale con ese código');
            return;
        }

        // Agregar usuario a la sala
        rooms[code].push(socket.id);
        users[socket.id] = code;

        // Unir usuario a la sala en Socket.io
        socket.join(code);

        console.log(`Usuario ${socket.id} se unió a la sala: ${code}`);

        // Notificar a los demás usuarios de la sala
        socket.emit('iniciando_llamada', socket.id);

        socket.to(code).emit('usuario_conectado', socket.id);


    });

    socket.on('crear_sala', ({ code }) => {
        
        // Si el código no existe, se crea una nueva sala
        if (!rooms[code]) {
            rooms[code] = [];
        }
        else{
            socket.emit('error', 'Intente de nuevo ya existe una sala con ese código');
            return;
        }

        // Agregar usuario a la sala
        rooms[code].push(socket.id);
        users[socket.id] = code;

        // Unir usuario a la sala en Socket.io
        socket.join(code);

        console.log(`Usuario ${socket.id} se unió a la sala: ${code}`);

        // Envio solo la notificacion solo al que envio
        socket.emit('iniciando_llamada', socket.id);


    });


    // Enviar la oferta a los demás usuarios cuando un cliente crea una oferta
    socket.on('envio_llamada', (offer, userId) => {
        // Reenvía la oferta al usuario especificado
        socket.broadcast.to(users[userId]).emit('envio_llamada', offer, socket.id);
    });

    // Enviar la respuesta (answer) a los demás usuarios cuando un cliente la crea
    socket.on('respuesta_llamada', (answer, userId) => {
        // Reenvía la respuesta al usuario que la solicitó
        socket.broadcast.to(users[userId]).emit('respuesta_llamada', answer, socket.id);
    });

    // Enviar candidatos ICE a los demás usuarios
    socket.on('ice-candidate', (candidate, userId) => {
        // Reenvía el candidato ICE al usuario correspondiente
        socket.broadcast.to(users[userId]).emit('ice-candidate', candidate, socket.id);
    });

    // Cuando un usuario se desconecta, emite el evento a los demás
    socket.on('user-disconnected', (userId) => {
        console.log('User disconnected: ' + userId);
        io.emit('user-disconnected', socket.id);  // Notifica a los demás
    });

    // Cuando un usuario se desconecta, se notifica a los demás
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Elimina el usuario desconectado del registro
        for (let userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
        io.emit('user-disconnected', socket.id);  // Notifica a los demás
    });
});

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});
