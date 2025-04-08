import connectToDB from "../Database/conectar.js";

async function Test_Conexion() {

    try {

        const connection = await connectToDB.getConnection();

        console.log("Conexión exitosa a la base de datos ");
        connection.release(); // Liberar la conexión después de usarla
        
    } catch (error) {
        
        console.log("Reintentando conectar a la base de datos...");

        // Agregar un retraso de 10 segundos antes de intentar una acción adicional
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Aquí podrías intentar llamar a `Test_Conexion` nuevamente o manejar la lógica de reintento
        await Test_Conexion();
    }
    
}

export default Test_Conexion;
