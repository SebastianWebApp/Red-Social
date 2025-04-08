
document.getElementById("Btn_Iniciar_Sesion").addEventListener("click", async() =>{
    try {        
        window.location.href = "/";
    } catch (error) {
        alert("Intente de nuevo");
    }
});


document.getElementById("Btn_Crear_Cuenta").addEventListener('click',async () => {

    const Usuario = document.getElementById("Inp_Usuario").value;
    const Telefono = document.getElementById("Inp_Telefono").value;
    const Clave = document.getElementById("Inp_Clave").value;

    if(Usuario == ""){
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
        window.location.href = `codigo_verificacion?usuario=${encodeURIComponent(Usuario)}&clave=${encodeURIComponent(Clave)}&telefono=${encodeURIComponent(Telefono)}`;
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }

   
});