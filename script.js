let arreglo_notas = [{titulo: "Primera nota", contenido: "Contenido de la primera nota"},];

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
  }

  /* -Me queda pendiente este método- 
  eliminarNota() {
  } */

  buscarNota() {
    let indice_titulo = document.getElementById("buscador").value;

    if (indice_titulo != "") {
      let resultado_busqueda = arreglo_notas.find(nota => nota.titulo == indice_titulo);
      this.mostrarNotificaciones(resultado_busqueda);
    }
    
    document.getElementById("buscador").value = "";
  }

  mostrarNotificaciones(nota) {
    notificaciones.style.display = "flex";
    let contenedor_notificaciones = document.getElementById("notificaciones");

    if (nota){ 
      contenedor_notificaciones.innerHTML = `<button type="button" class="Nota_contenedor"><h2>${nota.titulo}</h2><p>${nota.contenido}</p></button>`;
    } else {
      contenedor_notificaciones.innerHTML = `<h2>Lo siento, pero "${document.getElementById("buscador").value}" no aparece en la lista</h2>`;
    }
  }
 
  mostrarNota() {
    cargarNotas();
    let contenedor_css = document.querySelector(".contenedor");
    contenedor_css.style.display = "flex";
  
    let contenedor_historial = document.getElementById("historial");
  
    if (arreglo_notas.length > 0) {
        contenedor_historial.innerHTML = arreglo_notas.map(nota => `<button type="button" class="Nota_contenedor"><h2>${nota.titulo}</h2><p>${nota.contenido}</p></button>`).join('');
    } else {
        contenedor_historial.innerHTML = "<p>No hay notas en el historial</p>";
    } 
  }

}

// Eventos
  
function init() {
  let nueva_nota = new Nota();

  // Cargar notas guardadas al iniciar
  cargarNotas();

  // Eventos de los botones
  document.getElementById("agregar_nota").addEventListener("click", function() {nueva_nota.agregarNota(); guardarNotas();});
  document.getElementById("eliminar_nota").addEventListener("click", function() {nueva_nota.eliminarNota(); guardarNotas();});
  document.getElementById("buscar_nota").addEventListener("click", function() {nueva_nota.buscarNota(); guardarNotas();});
  document.getElementById("mostrar_nota").addEventListener("click", function() {nueva_nota.mostrarNota(); guardarNotas()});

}
  
init();

// Storage - JSON
    
function guardarNotas() {
  localStorage.setItem('notas', JSON.stringify(arreglo_notas));
  cargarNotas() 
}

function cargarNotas() {
  let notasGuardadas = localStorage.getItem('notas');
  if (notasGuardadas) {
    arreglo_notas = JSON.parse(notasGuardadas);
  }
}