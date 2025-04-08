// Importamos el módulo mongoose, que se utiliza para interactuar con bases de datos MongoDB.
import mongoose from "mongoose";

// Extraemos los objetos necesarios desde mongoose:
// - model: para definir nuevos modelos de datos.
// - models: para acceder a modelos previamente definidos.
// - Schema: para definir la estructura de los documentos en una colección.
const {model, models, Schema} = mongoose;

const Schema_mongo = new Schema({

    // Campo `_id`: Identificador único para cada documento.
    // - Tipo: String.
    // - required: Indica que este campo es obligatorio.
    // - unique: Garantiza que no se repitan los valores.

    Usuario: {type: String, required: true},
    Descripcion: {type: String, default: ""},
    Imagen: {type: String, default: ""},
    Direccion: {type: String, default: ""},
    Likes: {type: Number, required: true, default: 0}


},{
    // Opciones del esquema:
    // - collection: Especifica el nombre de la colección en MongoDB donde se almacenarán los documentos.
    collection: "Publicaciones",
    versionKey: false,
    timestamps: true // Agrega automaticamente el crear y actualizar
});

// Exportamos el modelo `Mongo_CRUD`:
// - Si ya existe un modelo llamado "Mongo_CRUD" en `models`, lo reutilizamos.
// - Si no existe, creamos un nuevo modelo con el esquema `Schema_mongo`.
export const Mongo_CRUD = models.Mongo_CRUD || new model("Mongo_CRUD", Schema_mongo);


