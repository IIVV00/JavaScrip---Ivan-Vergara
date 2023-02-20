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
      let nueva_nota = new Nota (titulo, contenido);
      arreglo_notas.push(nueva_nota);
      this.mostrarNota(nueva_nota);
      document.getElementById("titulo").value = "";
      document.getElementById("contenido").value = "";
    }
  }

  buscarNota() {
    let indice_titulo = document.getElementById("buscador").value;
    if (indice_titulo != ""){
      let resultado_busqueda = arreglo_notas.find(nota => nota.titulo === indice_titulo);
      this.mostrarNota(resultado_busqueda);
    }
    document.getElementById("buscador").value = "";
  }

  mostrarNota(nota) {
    let contenedor = document.getElementById("notas");
    if (nota){ 
      contenedor.innerHTML = `<h2>${nota.titulo}</h2><p>${nota.contenido}</p>`;
    } else {
      contenedor.innerHTML = `<h2>Lo siento, pero "${document.getElementById("buscador").value}" no aparece en la lista</h2>`;
    }
  }

}

// Eventos
function init() {
  let nueva_nota = new Nota();
  document.getElementById("agregar_nota").addEventListener("click", function() {nueva_nota.agregarNota();});
  document.getElementById("buscar_nota").addEventListener("click", function() {nueva_nota.buscarNota();});
}

init();

