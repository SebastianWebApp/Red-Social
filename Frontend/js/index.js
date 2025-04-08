

document.getElementById("Btn_Iniciar_Sesion").addEventListener('click',async () => {

    const Usuario = document.getElementById("Inp_Usuario").value;
    const Clave = document.getElementById("Inp_Clave").value;

    if(Usuario == ""){
        alert("Ingrese un nombre de usuario");
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

    const Solicitud = await fetch(`api/crear_cuenta/Verificar_Credenciales`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
            Clave: Clave
        })
    });
    
    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        localStorage.setItem('Usuario', Usuario);
        window.location.href = "/perfil/"+Usuario;

    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }

   
});


document.getElementById("Btn_Crear_Cuenta").addEventListener("click", async() =>{

    try {
        
        window.location.href = "/crear_cuenta";

    } catch (error) {
        alert("Intente de nuevo");
    }


});