

document.getElementById("Btn_Enviar_Codigo").addEventListener('click',async () => {

    const Usuario = document.getElementById("Inp_Usuario").value;

    if(Usuario == ""){
        alert("Ingrese un nombre de usuario");
        return;
    }
   
   

    alert("Espere un momento....");

    // Hacemos una solicitud al servidor cuando se haga clic

    const Solicitud = await fetch(`api/crear_cuenta/Olvide_Password`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
        })
    });
    
    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        alert(Respuesta_Servidor.Respuesta);
        document.getElementById("Bloque_Verificacion").style.display = "inline";
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }

   
});


document.getElementById("Btn_Iniciar_Sesion").addEventListener("click", async() =>{

    try {
        
        window.location.href = "/";

    } catch (error) {
        alert("Intente de nuevo");
    }


});


document.getElementById("Bnt_Verificar_Codigo").addEventListener('click',async () => {

    const Usuario = document.getElementById("Inp_Usuario").value;
    const Codigo = document.getElementById("Inp_Codigo").value;

    if(Usuario == ""){
        alert("Ingrese un nombre de usuario");
        return;
    }

    if(Codigo == ""){
        alert("Ingrese el código de validación");
        return;
    }
   
   

    alert("Espere un momento....");

    // Hacemos una solicitud al servidor cuando se haga clic

    const Solicitud = await fetch(`api/crear_cuenta/Olvide_Password_Verificar`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
            Codigo: Codigo 
        })
    });
    
    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        localStorage.setItem('Usuario', Usuario);
        window.location.href = "/configuracion/credenciales";
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }

   
});
