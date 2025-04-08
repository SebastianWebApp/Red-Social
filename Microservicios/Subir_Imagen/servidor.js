import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { storage, database } from "./Servicios/conexion.js";

import { ref, uploadBytes, deleteObject , listAll } from "firebase/storage";
import { push, ref as dbRef } from "firebase/database"; // Importar funciones de Firebase Database para generar un ID único

// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;


// Iniciamos express
const app = express();

//Middlewares
app.use(cors({
    origin: CORS_ORIGEN,
    methods: ["POST","DELETE"]
})); // Permite la conexión entre el Front y el Backend

// Aumentar el límite de carga a 10 MB
app.use(json({ limit: '10mb' })); // Parear JSON en las solicitudes


// Ruta para subir una imagen en base64
app.post('', async (req, res) => {
    const { Imagen_64, Usuario, Path_Imagen } = req.body;

    if (!Imagen_64) {
        return res.status(400).json({
            Estado: false,
            Respuesta: "Intente de nuevo, error al recibir la imagen"
          });
    }

    // Validar que la imagen sea de tipo correcto (jpg, jpeg, png)
    const Tipo_Imagen = Imagen_64.split(';')[0].split('/')[1]; // Extrae el tipo de imagen
    const Tipos_Permitidos = ['jpeg', 'jpg', 'png'];

    if (!Tipos_Permitidos.includes(Tipo_Imagen)) {
        return res.status(400).json({
            Estado: false,
            Respuesta: "Intente de nuevo, error solo se permite imágenes (jpg, jpeg, png)"
        });
    }

    try {
        // Convertir base64 a buffer
        const base64Data = Imagen_64.replace(/^data:image\/\w+;base64,/, ''); // Elimina el encabezado
        const buffer = Buffer.from(base64Data, 'base64');


        var  Direccion_Imagen = Path_Imagen;

        if(Path_Imagen == ""){
            // Generar un ID único para el archivo usando push() de Firebase Realtime Database
            const Id_Unico = push(dbRef(database, 'uploads')).key;  // Usar Realtime Database para generar un ID único
            Direccion_Imagen = `${Usuario}/${Id_Unico}.${Tipo_Imagen}`; // Usar el ID único como nombre del archivo

        }
      

        try {

            // Subir el archivo a Firebase Storage
            const fileRef = ref(storage, Direccion_Imagen);

            // Subir el buffer con el tipo MIME especificado
            await uploadBytes(fileRef, buffer, {
                contentType: `image/${Tipo_Imagen}`  // Establece el tipo MIME correcto
            });


            return res.status(200).json({
                Estado: true,
                Respuesta: "Imagen guardada correctamente",
                Contenido:{
                    Link:`https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(Direccion_Imagen)}?alt=media`,
                    Path:Direccion_Imagen
                }
            });
            
        } catch (error) {
            return res.status(500).json({
                Estado: false,
                Respuesta: "Intente de nuevo, error al guardar la imagen"
            });
        }

      

    } catch (error) {
        return res.status(500).json({
            Estado: false,
            Respuesta: "Intente de nuevo, error al guardar la imagen"
        });
    }
});


// Ruta para subir una imagen en base64
app.delete('/Id', async (req, res) => {
    // Referencia al archivo en Firebase Storage usando el path proporcionado
  const fileRef = ref(storage, req.body.Path_Imagen);

  try {
    // Eliminar el archivo
    await deleteObject(fileRef);

    return res.status(200).json({
        Estado: true,
        Respuesta: "Imagen Eliminada Correctamente"
      });

  } catch (error) {

    return res.status(400).json({
        Estado: false,
        Respuesta: "Intente de nuevo, error al eliminar la imagen"
    });

  }
});

// Ruta para subir una imagen en base64
app.delete('/Usuario', async (req, res) => {
    // Referencia al archivo en Firebase Storage usando el path proporcionado
  const fileRef = ref(storage, req.body.Usuario);

  try {
    // Obtener referencia al directorio
    const folderRef = ref(storage, fileRef);

    // Listar todos los archivos en la carpeta
    const Lista = await listAll(folderRef);
    var files = Lista.items;

    if (files.length === 0) {

        return res.status(200).json({
            Estado: true,
            Respuesta: "La carpeta no existe"
        });

    }

    // Eliminar todos los archivos listados
    const deletePromises = files.map((fileRef) => deleteObject(fileRef));
    await Promise.all(deletePromises);


    return res.status(200).json({
        Estado: true,
        Respuesta: `Se han borrado todos los archivos de la carpeta "${fileRef}".`
    });

  } catch (error) {
    console.log(error)

    return res.status(400).json({
        Estado: false,
        Respuesta: `Error al borrar archivos`
    });
  }

});


app.use((req,res) =>{
    res.status(404).json({
        Estado: false,
        Respuesta: "Recurso no encontrado"
    })
});



// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});
