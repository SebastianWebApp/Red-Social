const inputImagen = document.getElementById('Inp_Imagen_Seleccionada');
const imagenSeleccionada = document.getElementById('Img_F2_Habilidad');
let archivo;
let Base64Imagen;

const Usuario = localStorage.getItem('Usuario');
let Habilidades_Seleccionadas = [];
let Nombre_Habilidades = [];


if(Usuario == null || Usuario == ""){
    localStorage.removeItem("Usuario");
    window.location.href = "/";
}

alert("Espere un momento, estamos cargando las habilidades")

ejecutarFunciones();


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
document.getElementById("Btn_Crear_Habilidad").addEventListener("click", async() =>{

    var Nombre = document.getElementById("Inp_Nombre").value;

    if(Base64Imagen == null){
        alert("Seleccione una imagen");
        return;
    }

    else if(Nombre == ""){
        alert("Ingrese el nombre de la habilidad");
        return;
    }

   

    alert("Espere un momento....");

    const Solicitud = await fetch(`/api/configuraciones/Crear_Habilidad`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Imagen: Base64Imagen,
            Nombre: Nombre
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        alert("La habilidad se ha creado correctamente");
        location.reload();
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }


});


// Buscar Habilidad
document.getElementById("Btn_Buscar_Habilidad").addEventListener("click", () => {
    var Busqueda = document.getElementById("Inp_Buscar_Habilidad").value;
    Filtrar_Habilidades(Busqueda);  // Filtra las habilidades
});

// Guardar Mis Habilidades
document.getElementById("Btn_Guardar_Habilidad").addEventListener("click", async() =>{


    if(Habilidades_Seleccionadas.length == 0){
        alert("Seleccione una habilidad o créela si no existe");
        return;
    }

   
    var Conversion_String = String(Habilidades_Seleccionadas);

    alert("Espere un momento....");

    const Solicitud = await fetch(`/api/configuraciones/Crear_Mis_Habilidad`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Usuario: Usuario,
            Habilidades: Conversion_String
        })
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        alert("La habilidad se ha guardado correctamente");
    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }


});


async function Leer_Mis_Habilidades() {

    const Solicitud = await fetch(`/api/configuraciones/Leer_Mis_Habilidades`, {
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


        Habilidades_Seleccionadas = Respuesta_Servidor.Contenido.Habilidades.split(",").map(Number);
        
    }
    
    else{
        alert(Respuesta_Servidor.Respuesta);
    }
   

}


async function Leer_Habilidades() {

    const Solicitud = await fetch(`/api/configuraciones/Leer_Habilidades`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },       
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        if(Respuesta_Servidor.Respuesta == null){
            alert("Cree una habilidad");
        }
        else{

            const container = document.getElementById("ContenedorMaterias_Bloque_F2");

          
            section = document.createElement("section");
            section.className = "F2_Division";

            for (let index = 0; index < Respuesta_Servidor.Respuesta.length; index++) {

                const article = createArticle(index + 1,Respuesta_Servidor.Respuesta[index].Imagen, Respuesta_Servidor.Respuesta[index].Nombre);
                section.appendChild(article);
                
            }
        
            
          
            container.appendChild(section);


        }



    }
    
    else{
        alert(Respuesta_Servidor.Respuesta);
    }
   

}

async function ejecutarFunciones() {
    await Leer_Mis_Habilidades(); // Espera a que esta función termine
    await Leer_Habilidades();    // Luego ejecuta esta
}


// Función para crear un artículo con la estructura deseada
function createArticle(index, Imagen, Nombre) {
    const article = document.createElement("article");
    article.className = "F2_Division";
    article.id = index;

    // Div con la imagen
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = Imagen;
    img.alt = Nombre;
    img.className = "F2_Division_Imagen";
    imgDiv.appendChild(img);

    // Div con el input y botón
    const inputDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.innerHTML = Nombre;
    const p = document.createElement("p");

    if(Habilidades_Seleccionadas.includes(index)){
        p.innerText = "Seleccionado";

    }
    else{
        p.innerText = "";
    }
    p.id = "P_" + index;

    inputDiv.appendChild(h2);
    inputDiv.appendChild(p);

    // Agregar ambos divs al artículo
    article.appendChild(imgDiv);
    article.appendChild(inputDiv);

    Nombre_Habilidades.push(Nombre);

    // Evento de clic para ejecutar la función de callback
    article.addEventListener("click", function() {
        Seleccion_Habilidad(index);  // Llama a la función proporcionada con el index
    });

    return article;
}


function Seleccion_Habilidad(Id){

    if(Habilidades_Seleccionadas.includes(Id)){
        document.getElementById("P_"+Id).innerText = "";
        Habilidades_Seleccionadas.splice(Habilidades_Seleccionadas.indexOf(Id), 1); 
    }
    else{
        document.getElementById("P_"+Id).innerText = "Seleccionado";
        Habilidades_Seleccionadas.push(Id);
    }

}


// Función para filtrar los elementos que comienzan con las letras dadas
function Filtrar_Habilidades(busqueda) {
    const resultados = Nombre_Habilidades.filter(habilidad => 
        habilidad.toLowerCase().startsWith(busqueda.toLowerCase())
    );
    mostrarHabilidades(resultados);

}


// Función para mostrar los elementos visibles (puedes personalizarla según tu HTML)
function mostrarHabilidades(Habilidad) {

    for (let index = 0; index < Nombre_Habilidades.length; index++) {

        if(Habilidad.includes(Nombre_Habilidades[index])){
            document.getElementById(index + 1).style.display = "flex";
        }
        else{
            document.getElementById(index + 1).style.display = "none";
        }
        
    }


}


// Ir a mi perfil
document.getElementById("mi_perfil").addEventListener("click", () =>{


    location.href = "/perfil/"+Usuario;

});
document.getElementById("mi_perfil1").addEventListener("click", () =>{


    location.href = "/perfil/"+Usuario;

});