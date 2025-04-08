import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";
import { createClient } from 'redis';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;
const app = express();

app.use(cors({
  origin: CORS_ORIGEN,
  methods: ["POST"]
}));

app.use(json());

// Configurar cliente Redis
const redisClient = createClient({ url: process.env.REDIS_DB });

redisClient.on('error', (err) => {
  console.error('Error en Redis:', err);
});

// Conectar a Redis solo si no está conectado
async function connectToRedis() {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log("Conectado a Redis");
    } catch (error) {
      console.log("Reintentando conectar a la base de datos...");

      // Agregar un retraso de 10 segundos antes de intentar una acción adicional
      await new Promise(resolve => setTimeout(resolve, 10000));
      await connectToRedis();

    }
  } else {
    console.log("Redis ya está conectado");
  }
}

// Llamar a la función para conectar a Redis
connectToRedis();

// Ruta para enviar un mensaje
app.post('/api/generar-codigo', async (req, res) => {
  try {

    const { Usuario, Telefono } = req.body; // ID y código proporcionados por el usuario



    if (!Usuario) {

      res.status(400).json({
        Estado: false,
        Respuesta: "ID es requerido"
      });

      return;
    }

    const codigo = Math.floor(100000 + Math.random() * 900000); // Generar un código de 6 dígitos

    // Convertir el código a string antes de almacenarlo en Redis
    await redisClient.setEx(`Usuario:${Usuario}`, 300, codigo.toString()); // Guardar en Redis con 5 minutos de expiración


    try {
  
      const message = await client.messages.create({
        from: "whatsapp:+14155238886",
        body: codigo.toString(),
        to: `whatsapp:+593${Telefono.slice(1)}`,
      });
  
      res.status(200).json({
        Estado: true,
        Respuesta: "Código de verificación enviado a su WhatsApp"
      });
    } catch (error) {
      res.status(500).json({
        Estado: false,
        Respuesta: "Error al enviar el mensaje"
      });
    }


  } catch (error) {
    res.status(500).json({
      Estado: false,
      Respuesta: "Error al generar o almacenar el código"
    });
  }

});


// Ruta para validar el código
app.post('/api/validar-codigo', async (req, res) => {
  try {



    const { Usuario, Codigo } = req.body; // ID y código proporcionados por el usuario
    if (!Usuario || !Codigo) {

      res.status(400).json({
        Estado: false,
        Respuesta: "Intente de nuevo, ID y código son requeridos"
      });

      return;

    }

    const codigoGuardado = await redisClient.get(`Usuario:${Usuario}`);
    if (!codigoGuardado) {

      res.status(404).json({
        Estado: false,
        Respuesta: "Código expirado o no encontrado"
      });

      return;
    }

    if (codigoGuardado === Codigo) {
      await redisClient.del(`Usuario:${Usuario}`);

      res.status(200).json({
        Estado: true,
        Respuesta: "Código correcto"
      });

      return;

    } else {

      res.status(400).json({
        Estado: false,
        Respuesta: "Código incorrecto"
      });

      return;
    }
  } catch (error) {

    res.status(500).json({
      Estado: false,
      Respuesta: "Intente de nuevo, error interno del servidor"
    });

    return;
  }
});

// Middleware de manejo de errores (siempre al final)
app.use((err, req, res, next) => {
  res.status(500).json({
    Estado: false,
    Respuesta: "Error interno del servidor",
  });
});


app.use((req, res) => {
    res.status(404).json({ 
        Estado: false,
        Respuesta: "Recurso no encontrado"

     });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Mensajería Activa en http://localhost:${PORT}`);
});
