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
      let nota = new Nota (titulo, contenido);
      arreglo_notas.push(nota);
    }
  }

  mostrarNotas() {
    let contenedor = document.getElementById("notas");
    contenedor.innerHTML = "";

    arreglo_notas.forEach(nota => {console.log(arreglo_notas)});
  }

}

let nota_nueva = new Nota (prompt("Ingrese un título"), prompt("Ingrese el contenido"));
arreglo_notas.push(nota_nueva);
        
nota_nueva.mostrarNotas();


