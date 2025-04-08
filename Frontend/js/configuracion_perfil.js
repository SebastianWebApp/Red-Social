const inputImagen = document.getElementById('Inp_Imagen_Seleccionada');
const imagenSeleccionada = document.getElementById('Img_F2_Perfil');
let archivo;
let Base64Imagen;
let Direccion = "";

const Usuario = localStorage.getItem('Usuario');

if(Usuario == null || Usuario == ""){
    localStorage.removeItem("Usuario");
    window.location.href = "/";
}

Leer_Informacion();

async function Leer_Informacion() {

    const Solicitud = await fetch(`/api/configuraciones/Leer_Perfil`, {
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

        Base64Imagen = Respuesta_Servidor.Contenido.Imagen;
        Direccion = Respuesta_Servidor.Contenido.Direccion;


        document.getElementById("Inp_Nombre").value = Respuesta_Servidor.Contenido.Nombre;
        document.getElementById("Txt_Descripcion").value = Respuesta_Servidor.Contenido.Descripcion;
        document.getElementById("Img_F2_Perfil").src = Respuesta_Servidor.Contenido.Imagen;

    }
   

}


// Función para activar el diálogo de selección de archivos al hacer clic en la imagen
imagenSeleccionada.addEventListener('click', function () {
    inputImagen.click();
});

// Manejo del cambio de archivo
inputImagen.addEventListener('change', () => {
    const archivo = inputImagen.files[0];

    if (archivo) {
        // Verificar que el tamaño del archivo no exceda 1 MB (1 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (archivo.size > maxSize) {
            alert("El archivo seleccionado supera el tamaño máximo permitido de 5 MB.");
            inputImagen.value = ''; // Opcional: limpiar el input para evitar problemas futuros
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(archivo);

        // Leer la imagen como Data URL
        reader.onload = () => {
            imagenSeleccionada.src = reader.result; // Mostrar la imagen seleccionada
            Base64Imagen = reader.result; // Base64 de la imagen seleccionada
        };
    }
});

// Guardar Cambios
document.getElementById("Btn_Guardar_Cambios").addEventListener("click", async() =>{

    var Nombre = document.getElementById("Inp_Nombre").value;
    var Descripcion = document.getElementById("Txt_Descripcion").value;

    if(Base64Imagen == null){
        alert("Seleccione una imagen");
        return;
    }

    else if(Nombre == ""){
        alert("Ingrese un nombre de usuario");
        return;
    }

    else if(Descripcion == ""){
        alert("Ingrese una descripción");
        return;
    }

    alert("Espere un momento....");

    const Solicitud = await fetch(`/api/configuraciones/Editar_Perfil`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
            Imagen: Base64Imagen,
            Nombre: Nombre,
            Descripcion: Descripcion,
            Direccion:Direccion 
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        alert(Respuesta_Servidor.Respuesta);

        location.reload();

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

// Mejorar con IA
document.getElementById("Btn_Mejorar_IA").addEventListener("click", async() =>{

    var Descripcion = document.getElementById("Txt_Descripcion").value;

    if(Descripcion == ""){
        alert("Ingrese una descripción");       
        return;
    }

    alert("Espere un momento....");

    const Solicitud = await fetch(`/api/ia/mejorar_texto`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Texto: Descripcion 
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        const alertText = document.getElementById('alertText');
        alertText.textContent = Respuesta_Servidor.Respuesta; // Cambiar el contenido de la alerta
        document.getElementById('alertContainer').style.display = 'flex';


    }
    else{
        alert(Respuesta_Servidor.Respuesta);          
    }


});

// Cerrar la alerta
function closeAlert() {
    document.getElementById('alertContainer').style.display = 'none';
}

