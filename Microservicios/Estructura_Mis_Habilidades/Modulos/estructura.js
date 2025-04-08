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
      await connectToDB.query(`CREATE TABLE IF NOT EXISTS Mis_Habilidades (
          Id VARCHAR(100) PRIMARY KEY,
          Habilidades VARCHAR(100) NOT NULL
          );`
      );
      console.log("Tabla 'Mis_Habilidades' creada (si no existía).");


  } catch (error) {
      console.error("Error al crear la tabla:", error.message);
  }

}


const procedimiento = async () => {
    try { 
        const Leer = `

CREATE PROCEDURE Mis_Habilidades_Leer(IN inputId VARCHAR(100))
BEGIN
  SELECT 
    Id, 
    Habilidades
  FROM 
    Mis_Habilidades 
  WHERE 
    Id = inputId;
END;
`; 

        const Crear = `
CREATE PROCEDURE Mis_Habilidades_Crear(IN inputId VARCHAR(100), IN inputHabilidades VARCHAR(100))
BEGIN
  INSERT INTO Mis_Habilidades (Id, Habilidades)
  VALUES (inputId, inputHabilidades);
END;
`; 

        const Actualizar = `
CREATE PROCEDURE Mis_Habilidades_Actualizar(
  IN inputId VARCHAR(100),
  IN inputHabilidades VARCHAR(100)
)
BEGIN
  UPDATE Mis_Habilidades
  SET 
    Habilidades = inputHabilidades
  WHERE 
    Id = inputId;
END;
`;


        const Eliminar = `
 CREATE PROCEDURE Mis_Habilidades_Eliminar(IN inputId VARCHAR(100))
 BEGIN
   DELETE FROM Mis_Habilidades WHERE Id = inputId;
 END;
 `;

        // Primero eliminamos el procedimiento si ya existe
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mis_Habilidades_Leer");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mis_Habilidades_Crear");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mis_Habilidades_Actualizar");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mis_Habilidades_Eliminar");

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