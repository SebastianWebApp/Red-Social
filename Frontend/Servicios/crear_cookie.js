export function Crear_Cookie(res, Token){

    // Enviar el token como una cookie HTTP-only
     res.cookie("Usuario", Token, {
        httpOnly: true,  // Hace que la cookie no sea accesible desde el JavaScript del navegador
        secure: false,    // Con true se envia solo en https y con false en http
        maxAge: 3600000  // La cookie será válida por 1 hora
    });

}