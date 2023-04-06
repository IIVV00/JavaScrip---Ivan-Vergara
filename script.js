let arreglo_notas = [{titulo: "Primera nota", contenido: "Contenido de la primera nota"}];

class Nota {
  constructor(titulo, contenido) {
    this.titulo = titulo;
    this.contenido = contenido;
  }

  agregarNota() {  
    let titulo = document.getElementById("titulo").value;
    let contenido = document.getElementById("contenido").value;

    if (titulo !== "" && contenido !== "") {
      
      let nuevaNota = new Nota(titulo, contenido);
      arreglo_notas.push(nuevaNota);

      this.mostrarNotificaciones(nuevaNota);

      document.getElementById("titulo").value = "";
      document.getElementById("contenido").value = "";
    }

    let contenedor_notificaciones = document.getElementById("notificaciones");
    document.querySelector(".contenedor_notificaciones").style.display = "flex";
    contenedor_notificaciones.classList.add("animate__animated", "animate__fadeInDown");
  }

  eliminarNota(nota) {
    let eliminar_item = arreglo_notas.findIndex(function(elemento) {
      return elemento.titulo === nota.titulo;
    });  
  
    arreglo_notas.splice(eliminar_item, 1);
    console.log(arreglo_notas);

    let contenedor_notificaciones = document.getElementById("notificaciones");
    contenedor_notificaciones.classList.add("animate__fadeOutUp");
  
    setTimeout(() => {
      contenedor_notificaciones.style.display = "none";
      contenedor_notificaciones.classList.remove("animate__fadeOutUp");
    }, 200);
  }
  

  modificarNota(nota) {
    document.getElementById("titulo").value = nota.titulo;
    document.getElementById("contenido").value = nota.contenido;

    let eliminar_item = arreglo_notas.findIndex(function(elemento) {
      return elemento.titulo === nota.titulo;
    });  
    arreglo_notas.splice(eliminar_item, 1);

    let contenedor_notificaciones = document.getElementById("notificaciones");
    contenedor_notificaciones.classList.add("animate__fadeOutUp");
  
    setTimeout(() => {
      contenedor_notificaciones.style.display = "none";
      contenedor_notificaciones.classList.remove("animate__fadeOutUp");
    }, 200);
  }

  buscarNota() {
    let indice_titulo = document.getElementById("buscador").value;

    if (indice_titulo != "") {
      let resultado_busqueda = arreglo_notas.find(nota => nota.titulo == indice_titulo);
      this.mostrarNotificaciones(resultado_busqueda);
    }
  }

  mostrarNotificaciones(nota) {
    let contenedor_notificaciones = document.getElementById("notificaciones");
    document.querySelector(".contenedor_notificaciones").style.display = "flex";
    let contenedor_notificaciones_hijo = document.createElement("div")

    setTimeout(() => {

      contenedor_notificaciones.appendChild(contenedor_notificaciones_hijo);
      contenedor_notificaciones.classList.add("animate__animated", "animate__fadeInDown");
    
      if (nota) { 
        contenedor_notificaciones.innerHTML = `<div class="Nota_agregada">
                                                  <h2 id="Nota_agregada_notificaciones">${nota.titulo}</h2>
                                                  <p>${nota.contenido}</p>
                                                </div>
                                                <div class="botonera">
                                                  <button type="button" id="modificarNota" class="boton">Modificar nota</button>
                                                  <button type="button" id="eliminar_nota" class="boton">Eliminar nota</button>
                                                </div>`;
                
                                                document.getElementById("modificarNota").addEventListener("click", () => {this.modificarNota(nota);});
                                                document.getElementById("eliminar_nota").addEventListener("click", () => {this.eliminarNota(nota);});
      } else {
        contenedor_notificaciones.innerHTML = `<h2>Lo siento, pero "${document.getElementById("buscador").value}" no aparece en la lista</h2>`;
      }

      document.getElementById("buscador").value = "";
      clearTimeout()
    }, 200);
  }
 
  mostrarNota() {
    document.querySelector(".contenedor_historial").style.display = "flex";
  
    let contenedor_historial = document.getElementById("historial");
  
    if (arreglo_notas.length > 0) {
        contenedor_historial.innerHTML = arreglo_notas.map(nota => `<button type="button" class="Nota_agregada"><h2>${nota.titulo}</h2><p>${nota.contenido}</p></button>`).join('');
    } else {
        contenedor_historial.innerHTML = `<h2>No hay notas en el historial<h2>`;
    } 
  }

}

// Eventos
  
function init() {
  let nueva_nota = new Nota();

  // Cargar notas guardadas al iniciar
  arreglo_notas = JSON.parse(localStorage.getItem('notas')) || [];

  // Eventos de los botones
  document.getElementById("agregar_nota").addEventListener("click", function() {nueva_nota.agregarNota(); actualizarNotas()});
  document.getElementById("buscar_nota").addEventListener("click", function() {nueva_nota.buscarNota(); actualizarNotas()});
  document.getElementById("mostrar_nota").addEventListener("click", function() {nueva_nota.mostrarNota(); actualizarNotas()});
}

init();

// Storage - JSON

function actualizarNotas() {
  localStorage.setItem('notas', JSON.stringify(arreglo_notas));
  return arreglo_notas;
}

// weather api
function fetchWeather(){
  let url = "https://api.openweathermap.org/data/2.5/weather?q=Buenos+Aires&units=celsius&appid=3797445e0ba7a94f5393200403074218";

  fetch(url)
    .then ((respuesta) => respuesta.json())
    .then ((data) => mostrarPronostico(data));
}

function mostrarPronostico(data){
  let contenedor_resultados = document.getElementById("pronostico");

  let ciudad = document.createElement("p");
  ciudad.textContent = data.name;
  contenedor_resultados.append(ciudad);

  let nubes = document.createElement("p"); 
  nubes.textContent = "Nubosidad: " + data.clouds.all + "%"; 
  contenedor_resultados.append(nubes);

  let humedad = document.createElement("p"); 
  humedad.textContent = "Humedad: " + data.main.humidity + "%"; 
  contenedor_resultados.append(humedad);
}

fetchWeather();
