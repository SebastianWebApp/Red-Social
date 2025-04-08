import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Importar almacenamiento
import { getDatabase } from "firebase/database"; // Importar Realtime Database
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();
// Configuración de Firebase para tu aplicación
// Configuración de Firebase utilizando las variables de entorno
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa el almacenamiento y la base de datos
const storage = getStorage(app);
const database = getDatabase(app);

// Exportar el almacenamiento y la base de datos
export { storage, database };

