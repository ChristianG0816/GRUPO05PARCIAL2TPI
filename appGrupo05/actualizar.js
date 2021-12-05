/*  Grupo 05 Integrantes:
    Miguel Angel Amaya Rodriguez
    Christian Javier Ayala Guerra
    Diego José Ayala Guerra
    Luis Alonso Cornejo Jiménez
    Carolina Isabel Pineda Delgado
    José Gustavo Pineda Delgado
    William Enrique Vásquez Mancia
*/
//obtener los parametros del producto a actualizar
let valores = window.location.search;
const urlParams = new URLSearchParams(valores);
//obtener el parametro deseado
let id = urlParams.get("id");
//generar la url para hacer las peticiones
var url = `http://localhost:3000/productos/${id}`;

// obtener los datos de la computadora a modificar
let obtenerComputadora = async (url) => {
  var nombre = document.querySelector("#nombre");
  var descripcion = document.querySelector("#descripcion");
  var precio = document.querySelector("#precio");
  var imagen = document.querySelector("#lImagen");
  var video = document.querySelector("#lVideo");
  var categoria = document.querySelector("#categoria");

  const actualProducto = await fetch(url).then((response) => response.json());

  nombre.value = actualProducto.Nombre;
  descripcion.value = actualProducto.Descripcion;
  precio.value = actualProducto.Precio;
  imagen.value = actualProducto.imagen;
  video.value = actualProducto.Video;
  categoria.value = actualProducto.Categoria;
  console.log(actualProducto.Categoria);
};

//cargar primero la ventana para obtener los datos de la computadora a actualizar
window.addEventListener("load", () => {
  obtenerComputadora(url);
});

// accion de hacer una actualizacion a la computadora actual
let actualizar = async () => {
  var nombre = document.querySelector("#nombre");
  var descripcion = document.querySelector("#descripcion");
  var precio = document.querySelector("#precio");
  var imagen = document.querySelector("#lImagen");
  var video = document.querySelector("#lVideo");
  var categoria = document.querySelector("#categoria");

  if (nombre.value == "") {
    alert("No se permiten campos vacíos");
  } else if (descripcion.value == "") {
    alert("No se permiten campos vacíos");
  } else if (imagen.value == "") {
    alert("No se permiten campos vacíos");
  } else if (video.value == "") {
    alert("No se permiten campos vacíos");
  } else if (video.value == "") {
    alert("No se permiten campos vacíos");
  } else if (categoria.value == "") {
    alert("No se permiten campos vacíos");
  } else if (precio.value == "") {
    alert("No se permiten campos vacíos");
  } else {
    if (precio.value >= 0) {
      let computadora = {
        Nombre: nombre.value,
        Descripcion: descripcion.value,
        Precio: precio.value,
        imagen: imagen.value,
        Video: video.value,
        Categoria: categoria.value,
      };
      console.log(url);
      await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(computadora),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
      location.href = "index.html";
    } else {
      alert("El precio debe ser un número positivo");
    }
  }
};
