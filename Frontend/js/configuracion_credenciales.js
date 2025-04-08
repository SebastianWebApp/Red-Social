const Usuario = localStorage.getItem('Usuario');


if(Usuario == null || Usuario == ""){
    localStorage.removeItem("Usuario");
    window.location.href = "/";
}

Extraer_Credenciales();

async function Extraer_Credenciales(){

    document.getElementById("Inp_Nombre").value = Usuario;

    const Solicitud = await fetch(`/api/crear_cuenta/Extraer_Credenciales`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        document.getElementById("Inp_Telefono").value = Respuesta_Servidor.Contenido.Telefono;
        document.getElementById("Inp_Password").value = Respuesta_Servidor.Contenido.Clave;
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }
    

}



// Guardar Cambios
document.getElementById("Btn_Guardar_Cambios").addEventListener("click", async() =>{

    var Nombre = document.getElementById("Inp_Nombre").value;
    var Telefono = document.getElementById("Inp_Telefono").value;
    var Clave = document.getElementById("Inp_Password").value;

    if(Nombre == ""){
        alert("Ingrese un nombre de usuario");
        return;
    }

    if(Telefono == ""){
        alert("Ingrese su número de teléfono");
        return;
    }

    if(Telefono.length != 10){
        alert("El número de teléfono no dispone de 10 dígitos");
        return;
    }

    if(Clave == ""){
        alert("Ingrese una contraseña");
        return;
    }

    if(Clave.length < 6){
        alert("Su clave debe poseer al menos 6 dígitos");
        return;
    }

    alert("Espere un momento....");



    const Solicitud = await fetch(`/api/crear_cuenta/Actualizar_Credenciales`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Nombre,
            Telefono: Telefono,
            Clave: Clave
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        alert(Respuesta_Servidor.Respuesta);

    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }


});


// Ir a mi perfil
document.getElementById("mi_perfil").addEventListener("click", () =>{


    location.href = "/perfil/"+Usuario;

});
document.getElementById("mi_perfil1").addEventListener("click", () =>{


    location.href = "/perfil/"+Usuario;

});



