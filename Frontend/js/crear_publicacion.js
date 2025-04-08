// Conectar al servidor de Socket.io

// const socket = io('http://localhost:4010');  // Aquí debes poner la URL del servidor
const socket = io('http://192.168.1.40:4010'); // Utiliza la IP de tu máquina en la red local


const inputImagen = document.getElementById('Inp_Imagen_Seleccionada');
const imagenSeleccionada = document.getElementById('Img_F2_Publicacion');
let archivo;
let Base64Imagen = "";
let Direccion = "";

const Usuario = localStorage.getItem('Usuario');
let Id;

const urlActual = window.location.href;
const url = new URL(urlActual);
const Post = url.searchParams.get("post");


if(Usuario == null || Usuario == ""){
    localStorage.removeItem("Usuario");
    window.location.href = "/";
}

if(Post != "" && Post !=null){
    Leer_Post();
}


async function Leer_Post() {

    const Solicitud = await fetch(`/api/publicaciones/Leer_Id`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Id: Post           
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){


        if(Respuesta_Servidor.Respuesta.Usuario == Usuario){
            alert("Espere un momento.....");

            Base64Imagen = Respuesta_Servidor.Respuesta.Imagen;
            Direccion = Respuesta_Servidor.Respuesta.Direccion;
            Id = Post;
            document.getElementById("Txt_Descripcion").value = Respuesta_Servidor.Respuesta.Descripcion;
            document.getElementById("Btn_Eliminar_Cambios").style.display = "inline";
    
            if(Base64Imagen != ""){
                document.getElementById("Btn_Eliminar_Imagen").style.display = "inline";
                document.getElementById("Img_F2_Publicacion").src = Respuesta_Servidor.Respuesta.Imagen;
            }
        }
        else{
            alert("No tienes permitido modificar el post");
        }
        

    }
    else{
        alert(Respuesta_Servidor.Respuesta);
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
            document.getElementById("Btn_Eliminar_Imagen").style.display = "inline";
        };
    }
});

// Eliminar Imagen
document.getElementById("Btn_Eliminar_Imagen").addEventListener("click", async() =>{
    imagenSeleccionada.src = "../src/img_post.png"; // Mostrar la imagen seleccionada
    Base64Imagen = ""; 
    document.getElementById("Btn_Eliminar_Imagen").style.display = "none";
});


// Guardar Cambios
document.getElementById("Btn_Guardar_Cambios").addEventListener("click", async() =>{

    var Descripcion = document.getElementById("Txt_Descripcion").value;

    if(Base64Imagen == "" && Descripcion == ""){
        alert("Ingrese ¿Qué estas pensando? o  una Imagen para continuar");
        return;
    }
   

    alert("Espere un momento....");


    const Solicitud_Perfil = await fetch(`/api/configuraciones/Leer_Perfil`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario           
        })
    });

    const Respuesta_Perfil = await Solicitud_Perfil.json();

    if(!Respuesta_Perfil.Estado){
        
        alert("Error al cargar los elementos, intente de nuevo");
        return;
      
    }


    if(Id == null){
        const Solicitud = await fetch(`/api/publicaciones/Crear`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Usuario: Usuario,
                Imagen: Base64Imagen,
                Descripcion: Descripcion,
                Direccion:Direccion,
                Likes:0
            })
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){


            await socket.emit('unirseSala', Usuario);


            await socket.emit('Perfil', { 
                Usuario: Usuario,
                Imagen: Respuesta_Servidor.Contenido.Imagen,
                Descripcion: Descripcion,
                Likes: 0,
                Id: Respuesta_Servidor.Contenido.Id
            });

            await socket.emit('General', { 
                Usuario: Usuario,
                Imagen: Respuesta_Servidor.Contenido.Imagen,
                Descripcion: Descripcion,
                Likes: 0,
                Id: Respuesta_Servidor.Contenido.Id,
                Imagen_Perfil: Respuesta_Perfil.Contenido.Imagen,
                Nombre_Perfil: Respuesta_Perfil.Contenido.Nombre
            });

    
            alert(Respuesta_Servidor.Respuesta);
            window.location.href = "/perfil/publicacion?post="+Respuesta_Servidor.Contenido.Id;
    
        }
        else{
            alert(Respuesta_Servidor.Respuesta);
        }
    }
 
    else{
        const Solicitud = await fetch(`/api/publicaciones/Actualizar`, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Usuario: Usuario,
                Imagen: Base64Imagen,
                Descripcion: Descripcion,
                Direccion:Direccion,
                Id:Id
            })
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){

            await socket.emit('unirseSala', Usuario);


            await socket.emit('Perfil', { 
                Usuario: Usuario,
                Imagen: Respuesta_Servidor.Contenido.Imagen,
                Descripcion: Descripcion,                
                Id: Id
            });

            await socket.emit('General', { 
                Usuario: Usuario,
                Imagen: Respuesta_Servidor.Contenido.Imagen,
                Descripcion: Descripcion,
                Id: Id,
                Imagen_Perfil: Respuesta_Perfil.Contenido.Imagen,
                Nombre_Perfil: Respuesta_Perfil.Contenido.Nombre
            });



    
            alert(Respuesta_Servidor.Respuesta);
            location.reload();
    
        }
        else{
            alert(Respuesta_Servidor.Respuesta);
        }
    }

 


});

// Eliminar Publicacion
document.getElementById("Btn_Eliminar_Cambios").addEventListener("click", async() =>{

    alert("Espero un momento...")

    const Solicitud = await fetch(`/api/publicaciones/Eliminar`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({    
            Id:Id,
            Direccion:Direccion
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){


        await socket.emit('Eliminar', { 
         
            Id: Id
        
        });


        alert(Respuesta_Servidor.Respuesta);

        window.location.href = "/perfil/publicacion";

    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }

 


});




document.getElementById("Btn_Regresar").addEventListener("click", async() =>{

 
    window.location.href = "/perfil/"+Usuario;


});
document.getElementById("Btn_Regresar1").addEventListener("click", async() =>{

 
    window.location.href = "/perfil/"+Usuario;


});


// Mejorar con IA
document.getElementById("Btn_Mejorar_IA").addEventListener("click", async() =>{

    var Descripcion = document.getElementById("Txt_Descripcion").value;

    if(Descripcion == ""){
        alert("Ingrese ¿Qué estas pensando?");       
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
