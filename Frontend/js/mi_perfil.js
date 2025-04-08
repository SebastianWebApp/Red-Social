// const socket = io('http://localhost:4010');  // Aquí debes poner la URL del servidor
const socket = io('http://192.168.1.40:4010'); // Utiliza la IP de tu máquina en la red local

// Obtener la URL completa
const url = window.location.href;

// Dividir la URL por '/' y obtener el último segmento
const Usuario_Visita = url.split('/').pop();

const Usuario = localStorage.getItem('Usuario');

let Nombre_Extraido;
let Imagen_Extraido;
let Cargar_Publicacion = true;
let Ultima_Publicacion;

if(Usuario == Usuario_Visita){
    document.getElementById("Btn_Crear_Publicacion").style.display = "inline";
    document.getElementById("Mi_Perfil").style.borderRadius = "20px";
    document.getElementById("Mi_Perfil").style.border = "2px solid #083D77";
}

document.getElementById("Btn_Crear_Publicacion").addEventListener("click", async() =>{

    window.location.href = "/perfil/publicacion";

});

document.querySelectorAll("#Mi_Perfil, #Mi_Perfil1").forEach(el => {
    el.addEventListener("click", () => {
        window.location.href = "/perfil/" + Usuario;
    });
});




Leer_Informacion();
Leer_Publicacion_U();


// Escuchar respuestas del servidor
socket.emit('unirseSala', Usuario_Visita);

socket.on('Respuesta_Perfil', (data) => {


    if (document.getElementById(data.Id)) {

        convertirLinksEnTexto_Actualizar("p_"+data.Id, data.Descripcion)

        if(data.Imagen != ""){
            document.getElementById("img_"+data.Id).src = data.Imagen;
            document.getElementById("div2_"+data.Id).style.display = "block";
        }
        else{
            document.getElementById("img_"+data.Id).src = "";
            document.getElementById("div2_"+data.Id).style.display = "none";
        }



    } else {
        Crear_Post(data.Id, Imagen_Extraido, Nombre_Extraido, data.Descripcion, data.Imagen, true);
    }
    


});

socket.on('Respuesta_Eliminar', (data) => {

    const elemento = document.getElementById(data.Id); // Obtener el elemento por el id
    if (elemento) {
        elemento.remove(); // Eliminar el elemento del DOM
    }

});

// Métodos de lectura
async function Leer_Informacion() {

    const Solicitud = await fetch(`/api/configuraciones/Leer_Perfil`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario_Visita           
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        Nombre_Extraido = Respuesta_Servidor.Contenido.Nombre;
        Imagen_Extraido = Respuesta_Servidor.Contenido.Imagen;


        document.getElementById("Lab_Nombre").innerHTML = Nombre_Extraido;
        document.getElementById("Img_Perfil").src = Imagen_Extraido;
        convertirLinksEnTexto_Actualizar("Lab_Descripcion", Respuesta_Servidor.Contenido.Descripcion)

    }
    else{

        alert(Respuesta_Servidor.Respuesta);

        if(Respuesta_Servidor.Respuesta == "El Perfil no existe"){
            //  Modificar
        }
        
    }
   

}
async function Leer_Publicacion_U() {

    const Solicitud = await fetch(`/api/publicaciones/Leer_Publicacion_U`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario_Visita           
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        for (let index = Respuesta_Servidor.Respuesta.length - 1; index >= 0; index--) {
            Crear_Post(
                Respuesta_Servidor.Respuesta[index]._id,
                Imagen_Extraido,
                Nombre_Extraido,
                Respuesta_Servidor.Respuesta[index].Descripcion,
                Respuesta_Servidor.Respuesta[index].Imagen,
                true
            );
        }
        

        if(Respuesta_Servidor.Respuesta.length > 0){
            Ultima_Publicacion = Respuesta_Servidor.Respuesta[Respuesta_Servidor.Respuesta.length - 1]._id;
        }

    }
    else{

        alert(Respuesta_Servidor.Respuesta);
        
    }
   

}
async function Leer_Publicacion_U_Paginacion() {

    const Solicitud = await fetch(`/api/publicaciones/Leer_Publicacion_U_Paginacion`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario_Visita,
            Id: Ultima_Publicacion           
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){


        for (let index = 0; index < Respuesta_Servidor.Respuesta.length; index++) {

            Crear_Post(
                Respuesta_Servidor.Respuesta[index]._id,
                Imagen_Extraido,
                Nombre_Extraido,
                Respuesta_Servidor.Respuesta[index].Descripcion,
                Respuesta_Servidor.Respuesta[index].Imagen,
                false
            );
        }
        

        if(Respuesta_Servidor.Respuesta.length > 0){
            Ultima_Publicacion = Respuesta_Servidor.Respuesta[Respuesta_Servidor.Respuesta.length - 1]._id;
        }
        

        
        if(Respuesta_Servidor.Respuesta.length == 5){
            Cargar_Publicacion = true;
        }

        
    }
    else{

        alert(Respuesta_Servidor.Respuesta);
        Cargar_Publicacion = true;

    }
   

}



function Crear_Post(Id_Post, Imagen_Perfil, Nombre_Perfil, Descripcion, Imagen, Tipo){


    // Obtener el contenedor por su ID
    const contenedor = document.getElementById('Contenedor_Publicaciones');

    // Crear el elemento <article>
    const article = document.createElement('article');
    article.id = Id_Post;
    article.className = "publicacion";
    // Evento de clic para ejecutar la función de callback

    if(Usuario == Usuario_Visita){
        article.style.cursor = "pointer";
        article.addEventListener("click", function() {
            location.href = "/perfil/publicacion?post="+Id_Post;
        });
    }

    
    // Crear el primer <div>
    const div1 = document.createElement('div');

    // Crear el <section> con la clase "Informacion_Post"
    const section = document.createElement('section');
    section.className = 'Informacion_Post';

    // Crear la imagen dentro del <section>
    const imgPerfil = document.createElement('img');
    imgPerfil.className = 'Post_Perfil';
    imgPerfil.src = Imagen_Perfil;

    // Crear el título <h3>
    const h3 = document.createElement('h3');
    h3.textContent = Nombre_Perfil;

    // Añadir la imagen y el título al <section>
    section.appendChild(imgPerfil);
    section.appendChild(h3);

    // Añadir el <section> al primer <div>
    div1.appendChild(section);

    // Crear el párrafo <p> con links convertidos en <a>
    const paragraph = convertirLinksEnTexto(Id_Post,Descripcion);


    // Crear el segundo <div> con estilo inline
    const div2 = document.createElement('div');
    div2.id = "div2_"+Id_Post;
    div2.style.position = 'relative';
    div2.style.width = '100%';
    div2.style.maxWidth = 'max-content';

    // Crear la imagen dentro del segundo <div>
    const imgPublicacion = document.createElement('img');
    imgPublicacion.className = 'Img_F2_Publicacion';
    imgPublicacion.src = Imagen;
    imgPublicacion.alt = 'Imagen publicación';
    imgPublicacion.id = "img_"+Id_Post;

    // Añadir la imagen al segundo <div>
    div2.appendChild(imgPublicacion);

    if(Imagen == ""){
        div2.style.display = "none";
    }


    // Añadir los elementos al <article>
    article.appendChild(div1);
    article.appendChild(paragraph);
    article.appendChild(div2);

    

    if(Tipo){
        // Añadir el <article> al contenedor
        contenedor.insertBefore(article, contenedor.firstChild);
    }
    else{
        contenedor.appendChild(article);
    }
    
}

function convertirLinksEnTexto(Id_Post,texto) {
    // Reemplazar saltos de línea con <br> para que se mantengan en el HTML
    const textoConSaltos = texto.replace(/\n/g, '<br>');

    // Detectar enlaces con el regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const partes = textoConSaltos.split(urlRegex);
    
    const parrafo = document.createElement('p');
    parrafo.id = "p_"+Id_Post;

    partes.forEach(parte => {
        if (urlRegex.test(parte)) {
            // Si es un enlace, crear un <a>
            const enlace = document.createElement('a');
            enlace.href = parte;
            enlace.textContent = parte;  // El texto del enlace
            enlace.target = '_blank';    // Abrir en nueva pestaña
            enlace.rel = 'noopener noreferrer'; // Seguridad adicional
            parrafo.appendChild(enlace);
        } else {
            // Si no es un enlace, agregar el texto normal
            // Usamos innerHTML para poder renderizar el <br> correctamente
            parrafo.innerHTML += parte;
        }
    });

    return parrafo;
}

function convertirLinksEnTexto_Actualizar(Id_Post, texto) {
    // Reemplazar saltos de línea con <br> para que se mantengan en el HTML
    const textoConSaltos = texto.replace(/\n/g, '<br>');

    // Detectar enlaces con el regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const partes = textoConSaltos.split(urlRegex);

    // Buscar el párrafo por el id
    const parrafoExistente = document.getElementById(Id_Post);

    if (parrafoExistente) {
        // Limpiar el contenido actual del párrafo
        parrafoExistente.innerHTML = '';

        // Recorrer las partes y agregarlas al párrafo
        partes.forEach(parte => {
            if (urlRegex.test(parte)) {
                // Si es un enlace, crear un <a>
                const enlace = document.createElement('a');
                enlace.href = parte;
                enlace.textContent = parte;  // El texto del enlace
                enlace.target = '_blank';    // Abrir en nueva pestaña
                enlace.rel = 'noopener noreferrer'; // Seguridad adicional
                parrafoExistente.appendChild(enlace);
            } else {
                // Si no es un enlace, agregar el texto normal
                parrafoExistente.innerHTML += parte;
            }
        });
    } else {
        console.log('No se encontró el párrafo con el ID proporcionado');
    }
}

document.addEventListener("DOMContentLoaded", () => {
        const contenedor = document.getElementById("ContenedorMaterias_Bloque_F2"); // Selecciona el div específico

        contenedor.addEventListener("scroll", () => {
            const scrollTop = contenedor.scrollTop; // Cuánto ha scrolleado el usuario dentro del div
            const scrollHeight = contenedor.scrollHeight; // Altura total del contenido del div
            const clientHeight = contenedor.clientHeight; // Altura visible del div
    
    
            if (scrollTop + clientHeight >= scrollHeight - 10) { // 10px antes del final
                if(Cargar_Publicacion){
                    Cargar_Publicacion = false;

                    Leer_Publicacion_U_Paginacion();
                }

            }
        });

});


