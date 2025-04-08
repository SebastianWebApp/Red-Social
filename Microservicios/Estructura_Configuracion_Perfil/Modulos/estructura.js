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
        await connectToDB.query(`CREATE TABLE IF NOT EXISTS Configuracion_Perfil (
            Id VARCHAR(100) PRIMARY KEY,
            Nombre VARCHAR(100) NOT NULL,
            Descripcion VARCHAR(1000) NOT NULL,
            Imagen VARCHAR(500) NOT NULL,
            Direccion VARCHAR(500) NOT NULL
            );`
        );
        console.log("Tabla 'Configuracion_Perfil' creada (si no existía).");


    } catch (error) {
        console.error("Error al crear la tabla:", error.message);
    }

}

const procedimiento = async () => {
    try { 
        const Leer = `

CREATE PROCEDURE Configuracion_Perfil_Leer(IN inputId VARCHAR(100))
BEGIN
  SELECT 
    Id, 
    Nombre, 
    Descripcion, 
    Imagen, 
    Direccion 
  FROM 
    Configuracion_Perfil 
  WHERE 
    Id = inputId;
END;
`; 

        const Crear = `
CREATE PROCEDURE Configuracion_Perfil_Crear(IN inputId VARCHAR(100), IN inputNombre VARCHAR(100), IN inputDescripcion VARCHAR(1000), IN inputImagen VARCHAR(500), IN inputDireccion VARCHAR(500))
BEGIN
  INSERT INTO Configuracion_Perfil (Id, Nombre, Descripcion, Imagen, Direccion)
  VALUES (inputId, inputNombre, inputDescripcion, inputImagen, inputDireccion);
END;
`; 

        const Actualizar = `
CREATE PROCEDURE Configuracion_Perfil_Actualizar(
  IN inputId VARCHAR(100),
  IN inputNombre VARCHAR(100),
  IN inputDescripcion VARCHAR(1000),
  IN inputImagen VARCHAR(500)
)
BEGIN
  UPDATE Configuracion_Perfil
  SET 
    Nombre = inputNombre,
    Descripcion = inputDescripcion,
    Imagen = inputImagen
  WHERE 
    Id = inputId;
END;
`;


        const Eliminar = `
 CREATE PROCEDURE Configuracion_Perfil_Eliminar(IN inputId VARCHAR(100))
 BEGIN
   DELETE FROM Configuracion_Perfil WHERE Id = inputId;
 END;
 `;

        // Primero eliminamos el procedimiento si ya existe
        await connectToDB.query("DROP PROCEDURE IF EXISTS Configuracion_Perfil_Leer");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Configuracion_Perfil_Crear");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Configuracion_Perfil_Actualizar");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Configuracion_Perfil_Eliminar");

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