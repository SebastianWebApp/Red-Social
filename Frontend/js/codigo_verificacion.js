const url = new URL(window.location.href);
const parametros = url.searchParams;
const Usuario = parametros.get("usuario");
const Clave = parametros.get("clave");
const Telefono = parametros.get("telefono");



document.getElementById("Bnt_Verificar_Codigo").addEventListener("click", async () =>{

    const Codigo = document.getElementById("Inp_Codigo").value;
    
    if(Codigo == ""){
        alert("Ingrese el código de validación");
        return;
    }

    alert("Espere un momento....");

    // Hacemos una solicitud al servidor cuando se haga clic

    const Solicitud = await fetch(`/api/crear_cuenta/Nueva_Cuenta`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
            Clave: Clave,
            Telefono: Telefono,
            Codigo: Codigo 
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        localStorage.setItem('Usuario', Usuario);
        window.location.href = "/configuracion/perfil";
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }


});


document.getElementById("Bnt_Reenviar_Codigo").addEventListener("click", async () => {
    
    alert("Espere un momento....");

    // Hacemos una solicitud al servidor cuando se haga clic

    const Solicitud = await fetch(`api/crear_cuenta/Leer_Cuenta`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
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