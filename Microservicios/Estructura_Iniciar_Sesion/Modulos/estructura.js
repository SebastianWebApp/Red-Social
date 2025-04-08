import  connectToDB  from "../Database/conectar.js";

// Crear base de datos

const crearDatabase = async () => {

  try {

      // Creamos la tabla con nombre PrograRed
      await connectToDB.query("CREATE DATABASE IF NOT EXISTS PrograRed;");
      console.log("Base de datos PrograRed creada (si no existía)");

      
  } catch (error) {
      console.error("Error al crear la base de datos:", error.message);
  }


}


const crearTabla = async () => {

  try {
      
      // Cambiar a la base de datos 'node_sql' después de crearla
      await connectToDB.query("USE PrograRed;")

      // Crear Tabla 
      await connectToDB.query(`CREATE TABLE IF NOT EXISTS Lista_Usuarios (
          Id VARCHAR(100) PRIMARY KEY,
          Teléfono VARCHAR(100) NOT NULL,
          Clave VARCHAR(100) NOT NULL,
          IV VARCHAR(100) NOT NULL
          );`
      );
      console.log("Tabla 'Lista_Usuarios' creada (si no existía).");


  } catch (error) {
      console.error("Error al crear la tabla:", error.message);
  }

}


const procedimiento = async () => {
    try { 
        const Leer = `

CREATE PROCEDURE Iniciar_Sesion_Leer(IN inputId VARCHAR(100))
BEGIN
  SELECT 
    Id, 
    Teléfono, 
    Clave, 
    IV
  FROM 
    Lista_Usuarios 
  WHERE 
    Id = inputId;
END;
`; 

        const Crear = `
CREATE PROCEDURE Iniciar_Sesion_Crear(IN inputId VARCHAR(100), IN inputTelefono VARCHAR(100), IN inputClave VARCHAR(100), IN inputIV VARCHAR(100))
BEGIN
  INSERT INTO Lista_Usuarios (Id, Teléfono, Clave, IV)
  VALUES (inputId, inputTelefono, inputClave, inputIV);
END;
`; 

        const Actualizar = `
CREATE PROCEDURE Iniciar_Sesion_Actualizar(
  IN inputId VARCHAR(100),
  IN inputTelefono VARCHAR(100),
  IN inputClave VARCHAR(100),
  IN inputIV VARCHAR(100)
)
BEGIN
  UPDATE Lista_Usuarios
  SET 
    Teléfono = inputTelefono,
    Clave = inputClave,
    IV = inputIV
  WHERE 
    Id = inputId;
END;
`;


        const Eliminar = `
 CREATE PROCEDURE Iniciar_Sesion_Eliminar(IN inputId VARCHAR(100))
 BEGIN
   DELETE FROM Lista_Usuarios WHERE Id = inputId;
 END;
 `;

        // Primero eliminamos el procedimiento si ya existe
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Leer");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Crear");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Actualizar");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Eliminar");

        await connectToDB.query(Leer);
        await connectToDB.query(Crear);
        await connectToDB.query(Actualizar);
        await connectToDB.query(Eliminar);


        console.log("Procedimientos almacenados creados correctamente.");
    } catch (error) {
        console.error("Error al crear el procedimiento almacenado:", error.message);
    }
};


export const InicializarDatabase = async () => {

    await crearDatabase();
    await crearTabla();
    await procedimiento();
    process.exit();  // Esto detendrá el proceso de Node.js y, por ende, el contenedor

}